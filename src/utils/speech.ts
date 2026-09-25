/**
 * Web Speech API text-to-speech engine with resilient voice resolution,
 * garbage-collection prevention, Chrome queue unstucking, and voice availability feedback.
 */

export interface SpeechState {
  isSpeaking: boolean;
  activeId: string | null;
}

export interface SpeakOptions {
  langName?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
  onVoiceWarning?: (warning: string) => void;
}

// Module-level reference to prevent V8 / WebKit garbage collection of the utterance
let activeUtterance: SpeechSynthesisUtterance | null = null;
let keepAliveTimer: NodeJS.Timeout | null = null;

export function isSpeechSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    'SpeechSynthesisUtterance' in window
  );
}

// Preload and cache browser voices
let cachedVoices: SpeechSynthesisVoice[] = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  try {
    cachedVoices = window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      cachedVoices = window.speechSynthesis.getVoices();
    };
  } catch (e) {
    console.warn('SpeechSynthesis voice initialization error:', e);
  }
}

/**
 * Stop active speech and clean up keep-alive timers
 */
export function stopSpeaking(): void {
  if (keepAliveTimer) {
    clearInterval(keepAliveTimer);
    keepAliveTimer = null;
  }
  if (isSpeechSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      console.warn('Error cancelling speech synthesis:', e);
    }
  }
  activeUtterance = null;
}

/**
 * Finds the most suitable voice available for a given BCP-47 tag or language name.
 */
export function getBestVoiceForLanguage(
  ttsCode: string,
  langName?: string
): { voice: SpeechSynthesisVoice | null; isExact: boolean } {
  if (!isSpeechSupported()) return { voice: null, isExact: false };

  let voices = cachedVoices;
  if (!voices || voices.length === 0) {
    voices = window.speechSynthesis.getVoices();
    cachedVoices = voices;
  }

  if (!voices || voices.length === 0) {
    return { voice: null, isExact: false };
  }

  const codeLower = ttsCode.toLowerCase();
  const prefix = codeLower.split('-')[0];

  // 1. Exact BCP-47 match (e.g. 'ml-IN', 'fr-FR', 'ja-JP', 'hi-IN')
  const exact = voices.find((v) => v.lang.toLowerCase() === codeLower);
  if (exact) return { voice: exact, isExact: true };

  // 2. Prefix match (e.g. 'ml', 'fr', 'ja', 'hi')
  const prefixMatch = voices.find((v) => {
    const vPrefix = v.lang.toLowerCase().split('-')[0];
    return vPrefix === prefix || v.lang.toLowerCase().startsWith(prefix);
  });
  if (prefixMatch) return { voice: prefixMatch, isExact: true };

  // 3. Name-based match (voice name contains "Malayalam", "French", etc.)
  if (langName) {
    const nameLower = langName.toLowerCase();
    const nameMatch = voices.find((v) => v.name.toLowerCase().includes(nameLower));
    if (nameMatch) return { voice: nameMatch, isExact: true };
  }

  // 4. Fallback: Default voice or first installed voice
  const defaultVoice = voices.find((v) => v.default) || voices[0] || null;
  return { voice: defaultVoice, isExact: false };
}

/**
 * Robust speakText function addressing:
 * - Garbage collection in Chromium / Safari
 * - Immediate cancel() sweep collision
 * - speechSynthesis.paused stuck state
 * - Chrome 15s utterance cutoff
 * - Auto-detect language resolution
 * - Missing language voice fallback notifications
 */
export function speakText(
  text: string,
  ttsCode: string,
  options?: SpeakOptions | (() => void),
  legacyOnEnd?: () => void,
  legacyOnError?: (err: unknown) => void,
  legacyOnVoiceWarning?: (warning: string) => void
): void {
  // Support both modern options object and legacy positional parameters
  const opts: SpeakOptions =
    typeof options === 'function'
      ? {
          onStart: options,
          onEnd: legacyOnEnd,
          onError: legacyOnError,
          onVoiceWarning: legacyOnVoiceWarning,
        }
      : options || {};

  const { onStart, onEnd, onError, onVoiceWarning, langName } = opts;

  if (!isSpeechSupported()) {
    onError?.(new Error('Text-to-speech is not supported in this browser.'));
    return;
  }

  const trimmed = text.trim();
  if (!trimmed) {
    onEnd?.();
    return;
  }

  // 1. Stop any currently active speech
  stopSpeaking();

  // 2. Unpause synthesis if stuck in paused state
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  // 3. Construct utterance
  const utterance = new SpeechSynthesisUtterance(trimmed);
  utterance.lang = ttsCode;
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  // CRITICAL: Hold module-level reference immediately so V8 does not GC the utterance
  activeUtterance = utterance;

  // 4. Resolve voice and warn if falling back
  const { voice, isExact } = getBestVoiceForLanguage(ttsCode, langName);
  if (voice) {
    utterance.voice = voice;
  }

  if (!isExact && onVoiceWarning) {
    const displayName = langName || ttsCode;
    onVoiceWarning(
      `No specific "${displayName}" voice found in browser. Playing with available system voice.`
    );
  }

  // 5. Lifecycle event handlers
  utterance.onstart = () => {
    onStart?.();

    // Keep-alive timer for Chrome (speech stops after ~15s if long text is spoken)
    if (keepAliveTimer) clearInterval(keepAliveTimer);
    keepAliveTimer = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        if (keepAliveTimer) clearInterval(keepAliveTimer);
        keepAliveTimer = null;
      } else {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 10000);
  };

  utterance.onend = () => {
    if (keepAliveTimer) {
      clearInterval(keepAliveTimer);
      keepAliveTimer = null;
    }
    activeUtterance = null;
    onEnd?.();
  };

  utterance.onerror = (event: SpeechSynthesisErrorEvent) => {
    if (keepAliveTimer) {
      clearInterval(keepAliveTimer);
      keepAliveTimer = null;
    }
    activeUtterance = null;

    // 'canceled' and 'interrupted' are expected when user stops or switches speech
    if (event.error !== 'canceled' && event.error !== 'interrupted') {
      console.warn('SpeechSynthesis error:', event.error, event);
      onError?.(new Error(`Speech error: ${event.error}`));
    }
    onEnd?.();
  };

  // 6. Schedule speak call with 50ms tick to ensure prior cancel() execution is complete
  setTimeout(() => {
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('Failed calling speechSynthesis.speak:', err);
      onError?.(err);
      onEnd?.();
    }
  }, 50);
}
