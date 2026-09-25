import React, { useRef } from 'react';
import {
  Volume2,
  VolumeX,
  X,
  ClipboardPaste,
  Sparkles,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { Language } from '../types';
import { LanguageSelector } from './LanguageSelector';
import { POPULAR_SOURCE_LANGUAGES, SAMPLE_TEXTS } from '../data/languages';

interface SourceCardProps {
  sourceText: string;
  setSourceText: (text: string) => void;
  selectedLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  detectedLanguage?: string;
  detectedLanguageCode?: string;
  detectedConfidence?: number;
  isSpeaking: boolean;
  onSpeak: () => void;
  onStopSpeak: () => void;
  onSampleSelect: (sample: (typeof SAMPLE_TEXTS)[0]) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  disabled?: boolean;
}

const MAX_CHARS = 5000;
const WARNING_THRESHOLD = 4500;

export const SourceCard: React.FC<SourceCardProps> = ({
  sourceText,
  setSourceText,
  selectedLanguage,
  onSelectLanguage,
  detectedLanguage,
  detectedConfidence,
  isSpeaking,
  onSpeak,
  onStopSpeak,
  onSampleSelect,
  textareaRef,
  disabled,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const charCount = sourceText.length;
  const wordCount = sourceText.trim() ? sourceText.trim().split(/\s+/).length : 0;
  const isNearLimit = charCount >= WARNING_THRESHOLD;
  const isOverLimit = charCount > MAX_CHARS;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setSourceText(text.slice(0, MAX_CHARS));
        textareaRef.current?.focus();
      }
    } catch {
      // Fallback
      textareaRef.current?.focus();
    }
  };

  const handleClear = () => {
    setSourceText('');
    textareaRef.current?.focus();
  };

  const isRtl = selectedLanguage.direction === 'rtl';

  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden min-h-[380px] lg:min-h-[460px]">
      {/* Top Header / Language Selection */}
      <div className="p-3.5 sm:p-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <LanguageSelector
            label="Source Language"
            selectedLanguage={selectedLanguage}
            onSelectLanguage={onSelectLanguage}
            allowAutoDetect={true}
            popularCodes={POPULAR_SOURCE_LANGUAGES}
            disabled={disabled}
          />
        </div>

        {/* Detected Language Pill */}
        {selectedLanguage.code === 'auto' && detectedLanguage && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/70 animate-in fade-in duration-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Detected: {detectedLanguage}</span>
            {detectedConfidence && (
              <span className="text-[10px] opacity-80">({Math.round(detectedConfidence)}%)</span>
            )}
          </div>
        )}
      </div>

      {/* Main Textarea Area */}
      <div className="relative flex-1 flex flex-col p-4">
        <textarea
          ref={textareaRef}
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value.slice(0, MAX_CHARS))}
          placeholder="Type, paste, or select sample text to translate (Ctrl+Enter to translate, Ctrl+K to focus)..."
          dir={isRtl ? 'rtl' : 'ltr'}
          className={`w-full flex-1 min-h-[220px] lg:min-h-[280px] resize-none bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-base sm:text-lg leading-relaxed focus:outline-none focus:ring-0 border-0 p-0 font-normal ${
            isRtl ? 'text-right' : 'text-left'
          }`}
          maxLength={MAX_CHARS}
          aria-label="Text to translate"
        />

        {/* Clear Button Float */}
        {sourceText && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            title="Clear text"
            aria-label="Clear text"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Quick Sample Prompts when empty */}
        {!sourceText && (
          <div className="mt-auto pt-3 border-t border-dashed border-slate-100 dark:border-slate-800/60">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-2 font-medium">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Need inspiration? Try a sample:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SAMPLE_TEXTS.map((sample) => (
                <button
                  key={sample.title}
                  type="button"
                  onClick={() => onSampleSelect(sample)}
                  className="text-xs px-2.5 py-1 rounded-md bg-slate-100/80 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 border border-slate-200/60 hover:border-indigo-200 dark:bg-slate-800/80 dark:hover:bg-indigo-950/60 dark:text-slate-300 dark:hover:text-indigo-300 dark:border-slate-700 transition-colors text-left"
                >
                  <span className="font-semibold">{sample.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Warning banner if approaching character limit */}
      {isNearLimit && (
        <div
          className={`px-4 py-1.5 text-xs flex items-center justify-between font-medium ${
            isOverLimit
              ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
              : 'bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
            {isOverLimit
              ? 'Character limit exceeded (maximum 5,000)'
              : 'Approaching maximum character limit'}
          </span>
          <span>{MAX_CHARS - charCount} chars remaining</span>
        </div>
      )}

      {/* Card Footer Toolbar */}
      <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/40 flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Text to Speech Button */}
          <button
            type="button"
            onClick={isSpeaking ? onStopSpeak : onSpeak}
            disabled={!sourceText.trim()}
            className={`p-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              isSpeaking
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/80 dark:text-indigo-300 ring-1 ring-indigo-400'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent'
            }`}
            title={isSpeaking ? 'Stop listening' : 'Listen to input'}
            aria-label={isSpeaking ? 'Stop listening' : 'Listen to input'}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4 animate-pulse text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs hidden sm:inline">Stop</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span className="text-xs hidden sm:inline">Listen</span>
              </>
            )}
          </button>

          {/* Paste from Clipboard */}
          <button
            type="button"
            onClick={handlePaste}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
            title="Paste from clipboard"
            aria-label="Paste from clipboard"
          >
            <ClipboardPaste className="w-4 h-4" />
            <span className="text-xs hidden sm:inline">Paste</span>
          </button>
        </div>

        {/* Character and Word Count Stats */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500">
          <span>{wordCount} words</span>
          <span>•</span>
          <span className={isNearLimit ? 'text-amber-600 dark:text-amber-400 font-semibold' : ''}>
            {charCount}/{MAX_CHARS}
          </span>
        </div>
      </div>
    </div>
  );
};
