import React, { useState } from 'react';
import {
  X,
  History,
  Star,
  Trash2,
  RotateCcw,
  Search,
  Calendar,
  Sparkles,
  ArrowRight,
  Download,
} from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  favorites: HistoryItem[];
  onReuse: (item: HistoryItem) => void;
  onToggleFavorite: (id: string) => void;
  onDeleteHistoryItem: (id: string) => void;
  onClearHistory: () => void;
  initialTab?: 'history' | 'favorites';
}

function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  return new Date(timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  favorites,
  onReuse,
  onToggleFavorite,
  onDeleteHistoryItem,
  onClearHistory,
  initialTab = 'history',
}) => {
  const [activeTab, setActiveTab] = useState<'history' | 'favorites'>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);

  if (!isOpen) return null;

  const currentList = activeTab === 'history' ? history : favorites;
  const filteredList = currentList.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.sourceText.toLowerCase().includes(q) ||
      item.translatedText.toLowerCase().includes(q) ||
      item.sourceLangName.toLowerCase().includes(q) ||
      item.targetLangName.toLowerCase().includes(q)
    );
  });

  const handleExportJson = () => {
    const dataStr = JSON.stringify(currentList, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linguabridge_${activeTab}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-base">
                Saved Translations
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-4 pt-3 pb-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="flex p-1 bg-slate-200/60 dark:bg-slate-800 rounded-lg">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('history');
                  setConfirmClear(false);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'history'
                    ? 'bg-white dark:bg-slate-700 text-indigo-700 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>History ({history.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('favorites');
                  setConfirmClear(false);
                }}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'favorites'
                    ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Favorites ({favorites.length})</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mt-2.5">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filteredList.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 dark:text-slate-500">
                {activeTab === 'history' ? (
                  <History className="w-10 h-10 stroke-1 mb-2 text-slate-300 dark:text-slate-600" />
                ) : (
                  <Star className="w-10 h-10 stroke-1 mb-2 text-slate-300 dark:text-slate-600" />
                )}
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {searchQuery
                    ? 'No matching translations found'
                    : activeTab === 'history'
                      ? 'No translation history yet'
                      : 'No favorites bookmarked yet'}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs">
                  {activeTab === 'history'
                    ? 'Translations you perform will be saved here automatically (up to 15 items).'
                    : 'Click the star icon on any translation card to save it here for quick access.'}
                </p>
              </div>
            ) : (
              filteredList.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-xl p-3 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors group flex flex-col justify-between"
                >
                  {/* Top Bar: Languages & Timestamp */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
                      <span>{item.sourceLangName}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                      <span className="text-indigo-600 dark:text-indigo-400">
                        {item.targetLangName}
                      </span>
                      {item.tone && item.tone !== 'natural' && (
                        <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 px-1.5 py-0.5 rounded capitalize">
                          {item.tone}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        {formatRelativeTime(item.timestamp)}
                      </span>
                    </div>
                  </div>

                  {/* Text snippets */}
                  <div className="space-y-1 text-xs">
                    <p className="text-slate-500 dark:text-slate-400 line-clamp-2 italic">
                      &ldquo;{item.sourceText}&rdquo;
                    </p>
                    <p className="text-slate-900 dark:text-slate-100 font-medium line-clamp-2">
                      {item.translatedText}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onReuse(item)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reuse in Translator</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(item.id)}
                        className={`p-1 rounded hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors ${
                          item.isFavorite
                            ? 'text-amber-500'
                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                        }`}
                        title={item.isFavorite ? 'Remove bookmark' : 'Bookmark'}
                      >
                        <Star className={`w-3.5 h-3.5 ${item.isFavorite ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteHistoryItem(item.id)}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
                        title="Delete from list"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {currentList.length > 0 && (
            <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleExportJson}
                className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 flex items-center gap-1 font-medium"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>

              {activeTab === 'history' && (
                <div>
                  {confirmClear ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                        Confirm clear?
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          onClearHistory();
                          setConfirmClear(false);
                        }}
                        className="text-xs px-2 py-1 bg-rose-600 text-white rounded font-medium hover:bg-rose-700"
                      >
                        Yes, Clear
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmClear(false)}
                        className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmClear(true)}
                      className="text-xs text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1 font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear History</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
