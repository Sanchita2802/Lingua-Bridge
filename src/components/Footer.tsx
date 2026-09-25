import React from 'react';
import { Sparkles, Globe2, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 transition-colors py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-indigo-500" />
            <span className="font-medium text-slate-700 dark:text-slate-300">LinguaBridge</span>
            <span>—</span>
            <span className="italic">Breaking language barriers, one sentence at a time.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              Powered by Gemini 3.8 Flash
            </span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              70+ World Languages Supported
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
