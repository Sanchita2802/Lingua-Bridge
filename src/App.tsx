/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeftRight,
  Sparkles,
  Zap,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { Language, TranslationResponse, TranslationTone, HistoryItem } from './types';
import {
  LANGUAGES,
  AUTO_DETECT_LANGUAGE,
  getLanguageByCode,
  SAMPLE_TEXTS,
} from './data/languages';
import { speakText, stopSpeaking, isSpeechSupported } from './utils/speech';
import { Header } from './components/Header';
import { SourceCard } from './components/SourceCard';
import { TargetCard } from './components/TargetCard';
import { ToneSelector } from './components/ToneSelector';
import { HistoryDrawer } from './components/HistoryDrawer';
import { ShortcutsModal } from './components/ShortcutsModal';
import { CulturalCornerCluster } from './components/CulturalCornerCluster';
import { Footer } from './components/Footer';

const STORAGE_KEYS = {
  HISTORY: 'linguabridge_history_v1',
  FAVORITES: 'linguabridge_favorites_v1',
  THEME: 'theme',
  LIVE_TRANSLATE: 'linguabridge_live_translate',
  LAST_SOURCE_LANG: 'linguabridge_last_source_lang',
  LAST_TARGET_LANG: 'linguabridge_last_target_lang',
};

export default function App() {
  // Theme state: single source of truth ('light' | 'dark', defaulting strictly to 'light')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    } catch (e) {
      console.error('Failed reading theme from localStorage', e);
    }
    return 'light';
  });

  // Languages state
  const [sourceLang, setSourceLang] = useState<Language>(() => {
    if (typeof window === 'undefined') return AUTO_DETECT_LANGUAGE;
    const saved = localStorage.getItem(STORAGE_KEYS.LAST_SOURCE_LANG);
    return saved ? getLanguageByCode(saved) : AUTO_DETECT_LANGUAGE;
  });

  const [targetLang, setTargetLang] = useState<Language>(() => {
    if (typeof window === 'undefined') return getLanguageByCode('es');
    const saved = localStorage.getItem(STORAGE_KEYS.LAST_TARGET_LANG);
    return saved ? getLanguageByCode(saved) : getLanguageByCode('es');
  });

  const [currentTone, setCurrentTone] = useState<TranslationTone>('natural');

  // Input & Translation state
  const [sourceText, setSourceText] = useState<string>('');
  const [translation, setTranslation] = useState<TranslationResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Live translate toggle
  const [liveTranslate, setLiveTranslate] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem(STORAGE_KEYS.LIVE_TRANSLATE);
    return saved ? JSON.parse(saved) : false;
  });

  // History & Favorites state
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<HistoryItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Panels
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyInitialTab, setHistoryInitialTab] = useState<'history' | 'favorites'>('history');
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // Audio speech playback state & notifications
  const [speakingTarget, setSpeakingTarget] = useState<'source' | 'target' | null>(null);
  const [speechNotification, setSpeechNotification] = useState<string | null>(null);

  // Auto-dismiss speech notification after 4.5 seconds
  useEffect(() => {
    if (!speechNotification) return;
    const timer = setTimeout(() => {
      setSpeechNotification(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [speechNotification]);

  // Textarea Ref for keyboard shortcut focus
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Apply data-theme attribute on <html> element and persist to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.error('Failed saving theme to localStorage', e);
    }
  }, [theme]);

  // Toggle between light and dark themes
  const handleToggleTheme = () => {
    setTheme((prevTheme) => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      try {
        localStorage.setItem(STORAGE_KEYS.THEME, nextTheme);
      } catch (e) {
        console.error('Failed saving theme to localStorage', e);
      }
      return nextTheme;
    });
  };

  // Persist Live Translate
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LIVE_TRANSLATE, JSON.stringify(liveTranslate));
  }, [liveTranslate]);

  // Persist Languages
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LAST_SOURCE_LANG, sourceLang.code);
    localStorage.setItem(STORAGE_KEYS.LAST_TARGET_LANG, targetLang.code);
  }, [sourceLang, targetLang]);

  // Persist History (up to 15 items)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.slice(0, 15)));
  }, [history]);

  // Persist Favorites
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Main Translation API Call via Server Endpoint
   */
  const handleTranslate = useCallback(
    async (overrideText?: string) => {
      const textToTranslate = (overrideText !== undefined ? overrideText : sourceText).trim();

      if (!textToTranslate) {
        setError('Please enter some text to translate.');
        return;
      }

      setIsLoading(true);
      setError(null);
      stopSpeaking();
      setSpeakingTarget(null);

      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: textToTranslate,
            sourceLang: sourceLang.code,
            targetLang: targetLang.code,
            tone: currentTone,
          }),
        });

        const contentType = response.headers.get('content-type') || '';

        // Safe check 1: First check response.ok HTTP status before attempting JSON parse
        if (!response.ok) {
          let errorMessage = `API request failed (${response.status})`;
          if (contentType.includes('application/json')) {
            try {
              const errData = await response.json();
              errorMessage = errData.error || errorMessage;
            } catch {
              // fallback to text if JSON parsing fails
            }
          } else {
            const rawText = await response.text();
            const cleanText = rawText.replace(/<[^>]*>?/gm, '').trim();
            errorMessage = cleanText
              ? `Server returned (${response.status}): ${cleanText.slice(0, 160)}`
              : `API request failed (${response.status})`;
          }
          throw new Error(errorMessage);
        }

        // Safe check 2: Verify content-type includes application/json before parsing
        if (!contentType.includes('application/json')) {
          const rawText = await response.text();
          const cleanText = rawText.replace(/<[^>]*>?/gm, '').trim();
          throw new Error(
            `Expected JSON response but received: ${cleanText.slice(0, 150)}`
          );
        }

        // Safe step 3: Parse confirmed valid JSON response
        const data: TranslationResponse = await response.json();

        setTranslation(data);

        // Add to translation history
        const newHistoryItem: HistoryItem = {
          id: `hist_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
          sourceText: textToTranslate,
          translatedText: data.translatedText,
          sourceLang: sourceLang.code,
          sourceLangName:
            sourceLang.code === 'auto'
              ? data.detectedLanguage || 'Auto-Detect'
              : sourceLang.name,
          targetLang: targetLang.code,
          targetLangName: targetLang.name,
          detectedLanguage: data.detectedLanguage,
          confidence: data.confidence,
          transliteration: data.transliteration,
          tone: currentTone,
          timestamp: Date.now(),
          isFavorite: false,
        };

        setHistory((prev) => [newHistoryItem, ...prev.filter((i) => i.sourceText !== textToTranslate)].slice(0, 15));
      } catch (err: any) {
        console.error('Translation error:', err);
        setError(err.message || 'An unexpected error occurred during translation.');
      } finally {
        setIsLoading(false);
      }
    },
    [sourceText, sourceLang, targetLang, currentTone]
  );

  /**
   * Debounced Live Translate implementation (~800ms)
   */
  useEffect(() => {
    if (!liveTranslate) return;

    const trimmed = sourceText.trim();
    if (!trimmed) {
      setTranslation(null);
      setError(null);
      return;
    }

    const timer = setTimeout(() => {
      handleTranslate();
    }, 800);

    return () => clearTimeout(timer);
  }, [sourceText, sourceLang.code, targetLang.code, currentTone, liveTranslate, handleTranslate]);

  /**
   * Swap source and target languages
   */
  const handleSwapLanguages = () => {
    // Determine new source language
    let newSource: Language = targetLang;
    let newTarget: Language = sourceLang;

    if (sourceLang.code === 'auto') {
      if (translation?.detectedLanguageCode) {
        newTarget = getLanguageByCode(translation.detectedLanguageCode);
      } else {
        newTarget = getLanguageByCode('en');
      }
    }

    setSourceLang(newSource);
    setTargetLang(newTarget);

    // If there is translated text available, swap text as well for effortless reply/context verification!
    if (translation?.translatedText) {
      const prevTargetText = translation.translatedText;
      setSourceText(prevTargetText);
      setTranslation({
        translatedText: sourceText,
        detectedLanguage: newSource.name,
        confidence: 100,
      });
    }
  };

  /**
   * Text-to-Speech handler with proper language resolution and feedback
   */
  const handleSpeak = (type: 'source' | 'target') => {
    if (!isSpeechSupported()) {
      setSpeechNotification('Text-to-speech is not supported by your current browser.');
      return;
    }

    // Toggle behavior: if already speaking this target, stop speech immediately
    if (speakingTarget === type) {
      handleStopSpeak();
      return;
    }

    const text = type === 'source' ? sourceText : translation?.translatedText || '';
    if (!text.trim()) {
      setSpeechNotification(
        type === 'source'
          ? 'Please enter some text in the source box to listen.'
          : 'Translate text first to listen to the translation.'
      );
      return;
    }

    // Determine correct language & TTS code
    let lang = type === 'source' ? sourceLang : targetLang;
    let ttsCode = lang.ttsCode || 'en-US';
    let langName = lang.name;

    // Handle Auto-Detect source language: use detected language if available!
    if (type === 'source' && sourceLang.code === 'auto') {
      if (translation?.detectedLanguageCode) {
        const detected = getLanguageByCode(translation.detectedLanguageCode);
        if (detected) {
          ttsCode = detected.ttsCode || 'en-US';
          langName = detected.name;
        }
      }
    }

    setSpeakingTarget(type);
    speakText(text, ttsCode, {
      langName,
      onStart: () => setSpeakingTarget(type),
      onEnd: () => setSpeakingTarget(null),
      onError: (err: any) => {
        console.warn('Speech playback issue:', err);
        setSpeakingTarget(null);
        setSpeechNotification('Audio playback was interrupted or unavailable in your browser.');
      },
      onVoiceWarning: (warning: string) => {
        setSpeechNotification(warning);
      },
    });
  };

  const handleStopSpeak = () => {
    stopSpeaking();
    setSpeakingTarget(null);
  };

  /**
   * Favorite toggling
   */
  const isCurrentTranslationFavorite = Boolean(
    translation &&
      favorites.some(
        (f) =>
          f.sourceText === sourceText &&
          f.translatedText === translation.translatedText &&
          f.targetLang === targetLang.code
      )
  );

  const handleToggleCurrentFavorite = () => {
    if (!translation || !sourceText.trim()) return;

    if (isCurrentTranslationFavorite) {
      setFavorites((prev) =>
        prev.filter(
          (f) =>
            !(
              f.sourceText === sourceText &&
              f.translatedText === translation.translatedText &&
              f.targetLang === targetLang.code
            )
        )
      );
    } else {
      const newFav: HistoryItem = {
        id: `fav_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        sourceText,
        translatedText: translation.translatedText,
        sourceLang: sourceLang.code,
        sourceLangName:
          sourceLang.code === 'auto'
            ? translation.detectedLanguage || 'Auto-Detect'
            : sourceLang.name,
        targetLang: targetLang.code,
        targetLangName: targetLang.name,
        detectedLanguage: translation.detectedLanguage,
        confidence: translation.confidence,
        transliteration: translation.transliteration,
        tone: currentTone,
        timestamp: Date.now(),
        isFavorite: true,
      };
      setFavorites((prev) => [newFav, ...prev]);
    }
  };

  const handleToggleFavoriteById = (id: string) => {
    const existingFav = favorites.find((f) => f.id === id);
    if (existingFav) {
      setFavorites((prev) => prev.filter((f) => f.id !== id));
    } else {
      const fromHistory = history.find((h) => h.id === id);
      if (fromHistory) {
        setFavorites((prev) => [{ ...fromHistory, isFavorite: true }, ...prev]);
      }
    }
  };

  /**
   * Reuse translation from history
   */
  const handleReuseHistory = (item: HistoryItem) => {
    setSourceText(item.sourceText);
    setSourceLang(getLanguageByCode(item.sourceLang));
    setTargetLang(getLanguageByCode(item.targetLang));
    setCurrentTone(item.tone || 'natural');
    setTranslation({
      translatedText: item.translatedText,
      detectedLanguage: item.detectedLanguage,
      confidence: item.confidence,
      transliteration: item.transliteration,
    });
    setIsHistoryOpen(false);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  /**
   * Sample phrase selector
   */
  const handleSampleSelect = (sample: (typeof SAMPLE_TEXTS)[0]) => {
    setSourceText(sample.text);
    setSourceLang(getLanguageByCode(sample.sourceLang));
    setTargetLang(getLanguageByCode(sample.targetLang));
    handleTranslate(sample.text);
  };

  /**
   * Global Keyboard Shortcuts (Ctrl+Enter, Ctrl+K, Ctrl+S)
   */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;

      // Ctrl + Enter -> Translate
      if (isCmdOrCtrl && e.key === 'Enter') {
        e.preventDefault();
        handleTranslate();
      }

      // Ctrl + K -> Focus text area
      if (isCmdOrCtrl && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        textareaRef.current?.focus();
      }

      // Ctrl + S -> Swap languages (prevent browser save)
      if (isCmdOrCtrl && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSwapLanguages();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleTranslate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50/50 via-slate-50 to-purple-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navbar */}
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        liveTranslate={liveTranslate}
        onToggleLiveTranslate={() => setLiveTranslate(!liveTranslate)}
        onOpenHistory={() => {
          setHistoryInitialTab('history');
          setIsHistoryOpen(true);
        }}
        onOpenFavorites={() => {
          setHistoryInitialTab('favorites');
          setIsHistoryOpen(true);
        }}
        onOpenShortcuts={() => setIsShortcutsOpen(true)}
        historyCount={history.length}
        favoritesCount={favorites.length}
      />

      {/* Main Translation Workbench Container (relative container for corner cluster anchor) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6 relative">
        {/*
          ========================================================================
          CULTURAL VISUAL CONTEXT: CORNER-ANCHORED DECK (Top-Right Area)
          CSS: position absolute relative to main container, anchored top-right.
          Small compact badge by default (~50px), smoothly expands on hover/tap.
          Never shrinks, overlaps, or pushes around input, output, or action buttons.
          ========================================================================
        */}
        <CulturalCornerCluster
          sourceLanguage={sourceLang}
          targetLanguage={targetLang}
          detectedLanguageCode={translation?.detectedLanguageCode}
          detectedLanguageName={translation?.detectedLanguage}
        />

        {/* Controls Ribbon: Tone Selector & Central Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xs p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xs pr-3 sm:pr-28 md:pr-40 transition-all">
          <ToneSelector
            currentTone={currentTone}
            onChangeTone={setCurrentTone}
            disabled={isLoading}
          />

          <div className="flex items-center justify-end gap-2 shrink-0">
            {/* Quick Swap button on small devices */}
            <button
              type="button"
              onClick={handleSwapLanguages}
              className="sm:hidden px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center gap-1.5"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-600" />
              <span>Swap</span>
            </button>

            {/* Translate Button */}
            <button
              type="button"
              onClick={() => handleTranslate()}
              disabled={isLoading || !sourceText.trim()}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/35 active:scale-98 transition-all flex items-center gap-2 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Translating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Translate</span>
                  <span className="hidden md:inline-block text-[10px] bg-indigo-700/70 px-1.5 py-0.5 rounded font-mono ml-1">
                    Ctrl+Enter
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Translation Cards Grid (Source Left, Swap in Center on Desktop, Target Right) */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">
          {/* Left: Source Textarea Card (Clean, Full-Width, Unobstructed) */}
          <SourceCard
            sourceText={sourceText}
            setSourceText={setSourceText}
            selectedLanguage={sourceLang}
            onSelectLanguage={setSourceLang}
            detectedLanguage={translation?.detectedLanguage}
            detectedConfidence={translation?.confidence}
            isSpeaking={speakingTarget === 'source'}
            onSpeak={() => handleSpeak('source')}
            onStopSpeak={handleStopSpeak}
            onSampleSelect={handleSampleSelect}
            textareaRef={textareaRef}
            disabled={isLoading}
          />

          {/* Center Floating Desktop Swap Button */}
          <div className="hidden lg:flex absolute left-1/2 top-12 -translate-x-1/2 z-20">
            <button
              type="button"
              onClick={handleSwapLanguages}
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 flex items-center justify-center hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              title="Swap languages (Ctrl+S)"
              aria-label="Swap languages"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Target Translation Card (Clean, Full-Width, Expand Button Unobstructed) */}
          <TargetCard
            translation={translation}
            isLoading={isLoading}
            error={error}
            selectedLanguage={targetLang}
            onSelectLanguage={setTargetLang}
            sourceText={sourceText}
            isSpeaking={speakingTarget === 'target'}
            onSpeak={() => handleSpeak('target')}
            onStopSpeak={handleStopSpeak}
            onRetry={() => handleTranslate()}
            isFavorite={isCurrentTranslationFavorite}
            onToggleFavorite={handleToggleCurrentFavorite}
            disabled={isLoading}
          />
        </div>

        {/* Informational Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Gemini 3.8 Intelligence
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Preserves context, idioms, and natural fluency across 70+ languages.
              </p>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Live & Auto-Detect
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Instant speech recognition & automatic language detection confidence.
              </p>
            </div>
          </div>

          <div className="bg-white/50 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Local History & Privacy
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Translations and starred bookmarks stored securely in your browser.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* History and Bookmarks Slide-over Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        favorites={favorites}
        onReuse={handleReuseHistory}
        onToggleFavorite={handleToggleFavoriteById}
        onDeleteHistoryItem={(id) => setHistory((prev) => prev.filter((h) => h.id !== id))}
        onClearHistory={() => setHistory([])}
        initialTab={historyInitialTab}
      />

      {/* Keyboard Shortcuts Cheat Sheet Modal */}
      <ShortcutsModal isOpen={isShortcutsOpen} onClose={() => setIsShortcutsOpen(false)} />

      {/* Modern Clean Footer */}
      <Footer />

      {/* Text-to-Speech Status Toast / Notification */}
      {speechNotification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 dark:bg-slate-800/95 text-white text-xs font-medium shadow-2xl backdrop-blur-md border border-slate-700/80 animate-in fade-in slide-in-from-bottom-3 duration-200 max-w-sm sm:max-w-md text-center">
          <Volume2 className="w-4 h-4 text-indigo-400 shrink-0 animate-pulse" />
          <span className="flex-1 text-left">{speechNotification}</span>
          <button
            type="button"
            onClick={() => setSpeechNotification(null)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
            aria-label="Dismiss speech notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
