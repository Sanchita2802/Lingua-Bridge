import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, X, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { LANGUAGES, AUTO_DETECT_LANGUAGE } from '../data/languages';

interface LanguageSelectorProps {
  label: string;
  selectedLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  allowAutoDetect?: boolean;
  popularCodes: string[];
  disabled?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  label,
  selectedLanguage,
  onSelectLanguage,
  allowAutoDetect = false,
  popularCodes,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isOpen && e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const allAvailable = allowAutoDetect ? [AUTO_DETECT_LANGUAGE, ...LANGUAGES] : LANGUAGES;

  const filteredLanguages = allAvailable.filter((lang) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      lang.name.toLowerCase().includes(q) ||
      lang.nativeName.toLowerCase().includes(q) ||
      lang.code.toLowerCase().includes(q)
    );
  });

  const popularLanguages = popularCodes
    .map((code) => {
      if (code === 'auto') return AUTO_DETECT_LANGUAGE;
      return LANGUAGES.find((l) => l.code === code);
    })
    .filter((l): l is Language => Boolean(l));

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Quick Select Popular Pills & Main Selector Trigger */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {/* Main Dropdown Button */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 ${
            isOpen
              ? 'bg-indigo-50 border-indigo-300 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-600 dark:text-indigo-300 shadow-sm'
              : 'bg-white border-slate-200/90 text-slate-800 hover:bg-slate-50/80 hover:border-slate-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800/80'
          }`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`${label}: ${selectedLanguage.name}`}
        >
          <span className="text-base select-none">{selectedLanguage.flag}</span>
          <span className="font-semibold tracking-tight">{selectedLanguage.name}</span>
          {selectedLanguage.code !== 'auto' && (
            <span className="hidden sm:inline text-xs text-slate-400 font-normal dark:text-slate-500">
              ({selectedLanguage.nativeName})
            </span>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-indigo-600 dark:text-indigo-400' : ''
            }`}
          />
        </button>

        {/* Quick Tabs for top 4-5 frequent languages */}
        <div className="hidden lg:flex items-center gap-1">
          {popularLanguages.slice(0, 5).map((lang) => {
            const isSelected = selectedLanguage.code === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                onClick={() => onSelectLanguage(lang)}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/90 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/80'
                }`}
              >
                {lang.code === 'auto' ? 'Auto' : lang.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Popover Dropdown Panel */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[440px] animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Search Box Header */}
          <div className="p-2.5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900/90 sticky top-0 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 70+ languages or country..."
                className="w-full pl-9 pr-8 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick popular chips within dropdown */}
            {!searchQuery && (
              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1 block mb-1">
                  Popular Languages
                </span>
                <div className="flex flex-wrap gap-1">
                  {popularLanguages.map((pLang) => (
                    <button
                      key={`pop-${pLang.code}`}
                      type="button"
                      onClick={() => {
                        onSelectLanguage(pLang);
                        setIsOpen(false);
                      }}
                      className={`text-xs px-2 py-0.5 rounded border transition-colors flex items-center gap-1 ${
                        selectedLanguage.code === pLang.code
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800 font-semibold'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                      }`}
                    >
                      <span>{pLang.flag}</span>
                      <span>{pLang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Languages List */}
          <div className="overflow-y-auto p-1.5 divide-y divide-slate-100 dark:divide-slate-800/40">
            {filteredLanguages.length === 0 ? (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">
                No languages found matching &ldquo;{searchQuery}&rdquo;
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-0.5">
                {filteredLanguages.map((lang) => {
                  const isSelected = selectedLanguage.code === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => {
                        onSelectLanguage(lang);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-sm transition-colors group ${
                        isSelected
                          ? 'bg-indigo-50/90 text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-200 font-semibold'
                          : 'hover:bg-slate-50 text-slate-700 dark:text-slate-200 dark:hover:bg-slate-800/70'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base select-none shrink-0">{lang.flag}</span>
                        <div className="flex flex-col truncate">
                          <span className="truncate flex items-center gap-1.5">
                            {lang.name}
                            {lang.code === 'auto' && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 px-1.5 py-0.2 rounded font-medium">
                                <Sparkles className="w-2.5 h-2.5" /> AI Engine
                              </span>
                            )}
                          </span>
                          {lang.code !== 'auto' && (
                            <span className="text-xs text-slate-400 dark:text-slate-500 truncate">
                              {lang.nativeName}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono uppercase text-slate-400 dark:text-slate-500">
                          {lang.code}
                        </span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer count indicator */}
          <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-[11px] text-slate-400 dark:text-slate-500 text-center">
            {filteredLanguages.length} {filteredLanguages.length === 1 ? 'language' : 'languages'} available
          </div>
        </div>
      )}
    </div>
  );
};
