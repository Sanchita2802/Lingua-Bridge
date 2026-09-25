import React from 'react';
import {
  Languages,
  Moon,
  Sun,
  History,
  Star,
  Zap,
  Keyboard,
} from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  liveTranslate: boolean;
  onToggleLiveTranslate: () => void;
  onOpenHistory: () => void;
  onOpenFavorites: () => void;
  onOpenShortcuts: () => void;
  historyCount: number;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  liveTranslate,
  onToggleLiveTranslate,
  onOpenHistory,
  onOpenFavorites,
  onOpenShortcuts,
  historyCount,
  favoritesCount,
}) => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Lingua<span className="text-indigo-600 dark:text-indigo-400">Bridge</span>
            </h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 hidden md:block">
              Multi-Language Translation Platform
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Live Translate Toggle */}
          <div className="hidden sm:flex items-center gap-1.5 pl-2 pr-3 py-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-full border border-slate-200/70 dark:border-slate-700/70">
            <button
              type="button"
              onClick={onToggleLiveTranslate}
              className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-full transition-colors ${
                liveTranslate
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
              title="Automatically translate 800ms after you stop typing"
              aria-label="Toggle Live Translate"
            >
              <Zap className={`w-3 h-3 ${liveTranslate ? 'fill-current animate-pulse' : ''}`} />
              <span>Live {liveTranslate ? 'ON' : 'OFF'}</span>
            </button>
          </div>

          {/* History Button */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
            title="View translation history"
            aria-label="View translation history"
          >
            <History className="w-4 h-4" />
            <span className="text-xs font-medium hidden md:inline">History</span>
            {historyCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {historyCount}
              </span>
            )}
          </button>

          {/* Favorites Button */}
          <button
            type="button"
            onClick={onOpenFavorites}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center gap-1"
            title="View starred favorites"
            aria-label="View starred favorites"
          >
            <Star className="w-4 h-4" />
            <span className="text-xs font-medium hidden md:inline">Saved</span>
            {favoritesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Keyboard Shortcuts button */}
          <button
            type="button"
            onClick={onOpenShortcuts}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors hidden sm:flex"
            title="Keyboard shortcuts"
            aria-label="Keyboard shortcuts"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Dark / Light Mode Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
