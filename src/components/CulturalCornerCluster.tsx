/**
 * CulturalCornerCluster.tsx
 * 
 * Corner-Anchored Cultural Visual Context Gallery:
 * Displays a compact, decorative photo-cluster / badge deck anchored to the
 * top-right corner of the translation workspace.
 * 
 * Hovering (or tapping) smoothly reveals an expanded popover displaying both
 * Source and Target cultural images, landmarks, and educational captions.
 * Completely taken out of document flow via CSS absolute/fixed positioning so
 * it never resizes, shrinks, or displaces the translation UI or action buttons.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Landmark,
  Palmtree,
  Palette,
  X,
  Maximize2,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';
import { getCulturalContextForLanguage, CulturalItem } from '../data/culturalContext';

interface CulturalCornerClusterProps {
  sourceLanguage: Language;
  targetLanguage: Language;
  detectedLanguageCode?: string;
  detectedLanguageName?: string;
}

export const CulturalCornerCluster: React.FC<CulturalCornerClusterProps> = ({
  sourceLanguage,
  targetLanguage,
  detectedLanguageCode,
  detectedLanguageName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [previewItem, setPreviewItem] = useState<{ item: CulturalItem; region: string } | null>(null);

  const clusterRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Retrieve cultural context for both Source and Target
  const sourceContext = getCulturalContextForLanguage(
    sourceLanguage.code,
    sourceLanguage.code === 'auto' ? detectedLanguageCode : undefined
  );
  const targetContext = getCulturalContextForLanguage(targetLanguage.code);

  // Reset failed image cache when languages change
  useEffect(() => {
    setFailedImages({});
  }, [sourceLanguage.code, targetLanguage.code, detectedLanguageCode]);

  // Close popover if clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (clusterRef.current && !clusterRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleImageError = (key: string) => {
    setFailedImages((prev) => ({ ...prev, [key]: true }));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'landmark':
        return <Landmark className="w-3 h-3 text-indigo-500" />;
      case 'nature':
        return <Palmtree className="w-3 h-3 text-emerald-500" />;
      default:
        return <Palette className="w-3 h-3 text-amber-500" />;
    }
  };

  // Hover handlers with slight debounce for smooth interaction
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 250);
  };

  // Show popover if hovered or explicitly opened via click/tap
  const isExpanded = isOpen || isHovered;

  // Primary preview photos for the compact stacked cluster
  const sourceThumb = sourceContext.items[0];
  const targetThumb = targetContext.items[0];

  const isAutoSource = sourceLanguage.code === 'auto' && !detectedLanguageCode;

  return (
    <>
      {/* 
        ========================================================================
        CORNER-ANCHORED CLUSTER CONTAINER
        Positioned absolute relative to main container, anchored to the top-right.
        Never overlaps or displaces translation textboxes, dropdowns, or buttons.
        ========================================================================
      */}
      <div
        ref={clusterRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="absolute top-3 sm:top-3.5 right-3 sm:right-6 lg:right-8 z-30 flex flex-col items-end"
      >
        {/* COMPACT STACKED PHOTO DECK (Default Unhovered State) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2 p-1 sm:p-1.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          title="Click or hover to explore Cultural Visual Context"
          aria-expanded={isExpanded}
          aria-label="Cultural context gallery"
        >
          {/* Overlapping Stacked Photo Thumbnails (approx 44-50px) */}
          <div className="relative w-14 h-11 shrink-0 select-none">
            {/* Target Culture Photo (Bottom card, tilted slightly right) */}
            <div className="absolute top-0.5 right-0 w-8 h-8 rounded-lg overflow-hidden border-2 border-white dark:border-slate-900 shadow-xs transform rotate-6 group-hover:rotate-12 transition-transform duration-200 bg-slate-200 dark:bg-slate-800">
              {!failedImages['target-thumb'] ? (
                <img
                  src={targetThumb.imageUrl}
                  alt={targetThumb.title}
                  loading="lazy"
                  onError={() => handleImageError('target-thumb')}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] bg-indigo-50 dark:bg-slate-800 text-indigo-500 font-bold">
                  {targetLanguage.flag || '🌐'}
                </div>
              )}
              {/* Target flag badge */}
              <span className="absolute bottom-0 right-0 text-[10px] leading-none drop-shadow-xs">
                {targetLanguage.flag}
              </span>
            </div>

            {/* Source Culture Photo (Top card, tilted slightly left) */}
            <div className="absolute top-1 left-0 w-8 h-8 rounded-lg overflow-hidden border-2 border-white dark:border-slate-900 shadow-xs transform -rotate-6 group-hover:-rotate-12 transition-transform duration-200 bg-slate-200 dark:bg-slate-800">
              {!failedImages['source-thumb'] ? (
                <img
                  src={sourceThumb.imageUrl}
                  alt={sourceThumb.title}
                  loading="lazy"
                  onError={() => handleImageError('source-thumb')}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] bg-indigo-50 dark:bg-slate-800 text-indigo-500 font-bold">
                  {sourceLanguage.flag || '✨'}
                </div>
              )}
              {/* Source flag badge */}
              <span className="absolute bottom-0 right-0 text-[10px] leading-none drop-shadow-xs">
                {sourceLanguage.flag}
              </span>
            </div>
          </div>

          {/* Minimal Label Badge */}
          <div className="hidden md:flex flex-col text-left pr-1.5">
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1 leading-tight">
              <Compass className="w-3 h-3 text-indigo-500" />
              <span>Cultural Vista</span>
            </span>
            <span className="text-[9px] text-slate-400 dark:text-slate-500 truncate max-w-[100px] leading-tight">
              {sourceLanguage.name} → {targetLanguage.name}
            </span>
          </div>

          <ChevronDown
            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-180 text-indigo-600' : ''
            }`}
          />
        </button>

        {/* 
          ======================================================================
          EXPANDED FLOATING CULTURAL POPOVER (Revealed on Hover / Tap)
          Anchored to the top-right, floating safely above the page.
          ======================================================================
        */}
        {isExpanded && (
          <div
            className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-2xl p-3.5 sm:p-4 animate-in fade-in zoom-in-95 duration-200"
            role="region"
            aria-label="Cultural Visual Context Details"
          >
            {/* Popover Header */}
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Cultural Visual Context
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    Landmarks, traditions & heritage
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setIsHovered(false);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close cultural context"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* SECTION 1: SOURCE LANGUAGE CULTURAL IMAGES */}
            <div className="mb-3.5">
              <div className="flex items-center justify-between gap-1.5 mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>{sourceLanguage.flag}</span>
                  <span className="text-slate-500 dark:text-slate-400 font-normal">Source:</span>
                  <span>
                    {isAutoSource
                      ? 'Auto-Detect'
                      : detectedLanguageName && sourceLanguage.code === 'auto'
                      ? `${detectedLanguageName}`
                      : sourceLanguage.name}
                  </span>
                </div>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium truncate max-w-[140px]">
                  {sourceContext.region}
                </span>
              </div>

              {/* Source Thumbnails Row (2-3 items) */}
              <div className="grid grid-cols-3 gap-2">
                {sourceContext.items.map((item, idx) => {
                  const key = `src-img-${idx}`;
                  const hasFailed = failedImages[key];

                  return (
                    <div
                      key={`src-${item.title}-${idx}`}
                      onClick={() => setPreviewItem({ item, region: sourceContext.region })}
                      className="group/item relative flex flex-col bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 rounded-xl overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-600 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                    >
                      <div className="relative w-full h-16 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        {!hasFailed ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            loading="lazy"
                            onError={() => handleImageError(key)}
                            className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-indigo-950 p-1 text-center">
                            {getCategoryIcon(item.category)}
                          </div>
                        )}
                        <div className="absolute top-1 right-1 p-0.5 rounded bg-black/50 text-white opacity-0 group-hover/item:opacity-100 transition-opacity">
                          <Maximize2 className="w-2.5 h-2.5" />
                        </div>
                      </div>
                      <div className="p-1.5">
                        <p className="text-[10px] font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 leading-tight group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400">
                          {item.title}
                        </p>
                        <p className="text-[9px] text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SEPARATOR DIVIDER */}
            <div className="border-t border-slate-100 dark:border-slate-800/80 my-2.5" />

            {/* SECTION 2: TARGET LANGUAGE CULTURAL IMAGES */}
            <div>
              <div className="flex items-center justify-between gap-1.5 mb-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>{targetLanguage.flag}</span>
                  <span className="text-slate-500 dark:text-slate-400 font-normal">Target:</span>
                  <span>{targetLanguage.name}</span>
                </div>
                <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium truncate max-w-[140px]">
                  {targetContext.region}
                </span>
              </div>

              {/* Target Thumbnails Row (2-3 items) */}
              <div className="grid grid-cols-3 gap-2">
                {targetContext.items.map((item, idx) => {
                  const key = `tgt-img-${idx}`;
                  const hasFailed = failedImages[key];

                  return (
                    <div
                      key={`tgt-${item.title}-${idx}`}
                      onClick={() => setPreviewItem({ item, region: targetContext.region })}
                      className="group/item relative flex flex-col bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 rounded-xl overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-600 transition-all cursor-pointer shadow-2xs hover:shadow-xs"
                    >
                      <div className="relative w-full h-16 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        {!hasFailed ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            loading="lazy"
                            onError={() => handleImageError(key)}
                            className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-indigo-950 p-1 text-center">
                            {getCategoryIcon(item.category)}
                          </div>
                        )}
                        <div className="absolute top-1 right-1 p-0.5 rounded bg-black/50 text-white opacity-0 group-hover/item:opacity-100 transition-opacity">
                          <Maximize2 className="w-2.5 h-2.5" />
                        </div>
                      </div>
                      <div className="p-1.5">
                        <p className="text-[10px] font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 leading-tight group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400">
                          {item.title}
                        </p>
                        <p className="text-[9px] text-slate-400 dark:text-slate-500 line-clamp-1 mt-0.5">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Popover Footer Note */}
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                <span>Click photo for high-res view</span>
              </span>
              <span>Visual Cultural Heritage</span>
            </div>
          </div>
        )}
      </div>

      {/* 
        ========================================================================
        FULL-SCREEN LIGHTBOX MODAL (When any image is clicked)
        ========================================================================
      */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setPreviewItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-lg w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-64 sm:h-72 bg-slate-100 dark:bg-slate-800">
              <img
                src={previewItem.item.imageUrl}
                alt={previewItem.item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80';
                }}
              />
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                aria-label="Close image preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                {getCategoryIcon(previewItem.item.category)}
                <span className="capitalize">{previewItem.item.category}</span>
                <span>•</span>
                <span>{previewItem.region}</span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
                {previewItem.item.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {previewItem.item.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
