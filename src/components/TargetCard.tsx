import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Copy,
  Check,
  Download,
  Star,
  Sparkles,
  Info,
  Maximize2,
  Minimize2,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { Language, TranslationResponse } from '../types';
import { LanguageSelector } from './LanguageSelector';
import { POPULAR_TARGET_LANGUAGES } from '../data/languages';

interface TargetCardProps {
  translation: TranslationResponse | null;
  isLoading: boolean;
  error: string | null;
  selectedLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  sourceText: string;
  isSpeaking: boolean;
  onSpeak: () => void;
  onStopSpeak: () => void;
  onRetry: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  disabled?: boolean;
}

export const TargetCard: React.FC<TargetCardProps> = ({
  translation,
  isLoading,
  error,
  selectedLanguage,
  onSelectLanguage,
  sourceText,
  isSpeaking,
  onSpeak,
  onStopSpeak,
  onRetry,
  isFavorite,
  onToggleFavorite,
  disabled,
}) => {
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const targetText = translation?.translatedText || '';
  const isRtl = selectedLanguage.direction === 'rtl';

  const charCount = targetText.length;
  const wordCount = targetText.trim() ? targetText.trim().split(/\s+/).length : 0;
  const sourceWordCount = sourceText.trim() ? sourceText.trim().split(/\s+/).length : 0;

  const handleCopy = async () => {
    if (!targetText) return;
    try {
      await navigator.clipboard.writeText(targetText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleExport = () => {
    if (!targetText) return;
    const blob = new Blob([targetText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `translation_${selectedLanguage.code}_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className={`flex flex-col bg-slate-50/70 dark:bg-slate-900/90 border border-indigo-100/90 dark:border-indigo-950/70 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden relative ${
        isFullscreen
          ? 'fixed inset-4 z-50 bg-white dark:bg-slate-900 shadow-2xl overflow-y-auto'
          : 'min-h-[380px] lg:min-h-[460px]'
      }`}
    >
      {/* Top Header / Target Language Selector */}
      <div className="p-3.5 sm:p-4 border-b border-indigo-100/70 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <LanguageSelector
            label="Target Language"
            selectedLanguage={selectedLanguage}
            onSelectLanguage={onSelectLanguage}
            allowAutoDetect={false}
            popularCodes={POPULAR_TARGET_LANGUAGES}
            disabled={disabled || isLoading}
          />
        </div>

        {/* Right Action Icons (Star Favorite, Fullscreen) */}
        <div className="flex items-center gap-1">
          {targetText && (
            <button
              type="button"
              onClick={onToggleFavorite}
              className={`p-1.5 rounded-lg transition-colors ${
                isFavorite
                  ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
              aria-label={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors"
            title={isFullscreen ? 'Exit full screen' : 'Expand view'}
            aria-label={isFullscreen ? 'Exit full screen' : 'Expand view'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Translation Content Area */}
      <div className="relative flex-1 flex flex-col p-4">
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="w-full flex-1 flex flex-col gap-3 py-2 animate-pulse" aria-live="polite" aria-busy="true">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Translating with Gemini AI...</span>
            </div>
            <div className="h-5 bg-indigo-100/70 dark:bg-slate-800 rounded-md w-3/4"></div>
            <div className="h-5 bg-indigo-100/60 dark:bg-slate-800 rounded-md w-11/12"></div>
            <div className="h-5 bg-indigo-100/50 dark:bg-slate-800 rounded-md w-5/6"></div>
            <div className="h-5 bg-indigo-100/40 dark:bg-slate-800 rounded-md w-2/3"></div>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="my-auto p-4 rounded-xl bg-rose-50/90 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold mb-1">Translation Unavailable</h4>
                <p className="text-xs text-rose-700 dark:text-rose-300 leading-relaxed mb-3">
                  {error}
                </p>
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-medium transition-colors shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Empty Placeholder State */}
        {!isLoading && !error && !targetText && (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400 dark:text-slate-500">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50/80 dark:bg-slate-800/80 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-3 border border-indigo-100/50 dark:border-slate-700">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Translation appears here
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs">
              Type in the left box or press{' '}
              <kbd className="px-1.5 py-0.5 text-[11px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300 shadow-2xs">
                Ctrl+Enter
              </kbd>
            </p>
          </div>
        )}

        {/* Translation Output Display */}
        {!isLoading && !error && targetText && (() => {
          const rawRomanization = translation?.romanization ?? translation?.transliteration;
          const isValidRomanization = Boolean(
            rawRomanization &&
              typeof rawRomanization === 'string' &&
              rawRomanization.trim().toLowerCase() !== 'null' &&
              rawRomanization.trim().toLowerCase() !== 'undefined' &&
              rawRomanization.trim().toLowerCase() !== 'none' &&
              rawRomanization.trim().toLowerCase() !== 'n/a' &&
              rawRomanization.trim() !== ''
          );
          const validRomanization = isValidRomanization ? (rawRomanization as string).trim() : null;

          const rawNotes = translation?.linguisticNotes;
          const isValidNotes = Boolean(
            rawNotes &&
              typeof rawNotes === 'string' &&
              rawNotes.trim().toLowerCase() !== 'null' &&
              rawNotes.trim().toLowerCase() !== 'undefined' &&
              rawNotes.trim().toLowerCase() !== 'none' &&
              rawNotes.trim().toLowerCase() !== 'n/a' &&
              rawNotes.trim() !== ''
          );
          const validNotes = isValidNotes ? (rawNotes as string).trim() : null;

          return (
            <div className="flex-1 flex flex-col justify-between">
              <div
                dir={isRtl ? 'rtl' : 'ltr'}
                className={`text-slate-900 dark:text-slate-50 text-base sm:text-lg leading-relaxed select-text whitespace-pre-wrap ${
                  isRtl ? 'text-right' : 'text-left'
                }`}
              >
                {targetText}
              </div>

              {/* Pronunciation / Romanization & Linguistic Nuances */}
              {(validRomanization || validNotes) && (
                <div className="mt-4 pt-3 border-t border-indigo-100/60 dark:border-slate-800 space-y-2">
                  {validRomanization && (
                    <div className="text-xs bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 rounded-lg p-2.5 text-indigo-900 dark:text-indigo-200">
                      <span className="font-semibold uppercase tracking-wider text-[10px] text-indigo-500 dark:text-indigo-400 block mb-0.5">
                        Pronunciation / Romanization
                      </span>
                      <p className="italic font-serif text-sm font-medium tracking-wide text-indigo-950 dark:text-indigo-100">
                        {validRomanization}
                      </p>
                    </div>
                  )}

                  {validNotes && (
                    <div className="text-xs bg-slate-100/70 dark:bg-slate-800/60 rounded-lg p-2.5 text-slate-600 dark:text-slate-300 flex items-start gap-2">
                      <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{validNotes}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Card Footer Toolbar */}
      <div className="px-4 py-3 border-t border-indigo-100/70 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 flex items-center justify-between">
        <div className="flex items-center gap-1 sm:gap-2">
          {/* TTS Listen Button */}
          <button
            type="button"
            onClick={isSpeaking ? onStopSpeak : onSpeak}
            disabled={!targetText || isLoading}
            className={`p-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
              isSpeaking
                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/80 dark:text-indigo-300 ring-1 ring-indigo-400'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent'
            }`}
            title={isSpeaking ? 'Stop listening' : 'Listen to translation'}
            aria-label={isSpeaking ? 'Stop listening' : 'Listen to translation'}
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

          {/* Copy to Clipboard with Animated Toast Badge */}
          <button
            type="button"
            onClick={handleCopy}
            disabled={!targetText || isLoading}
            className={`p-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-1.5 ${
              copied
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-transparent'
            }`}
            title="Copy to clipboard"
            aria-label="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="text-xs hidden sm:inline">Copy</span>
              </>
            )}
          </button>

          {/* Export as .txt */}
          <button
            type="button"
            onClick={handleExport}
            disabled={!targetText || isLoading}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 disabled:opacity-40 disabled:hover:bg-transparent"
            title="Export as .txt"
            aria-label="Export as .txt"
          >
            <Download className="w-4 h-4" />
            <span className="text-xs hidden sm:inline">Export</span>
          </button>
        </div>

        {/* Word & Character Comparison Stats */}
        {targetText && (
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500">
            <span>
              {wordCount} words {sourceWordCount > 0 && `(vs ${sourceWordCount})`}
            </span>
            <span>•</span>
            <span>{charCount} chars</span>
          </div>
        )}
      </div>
    </div>
  );
};
