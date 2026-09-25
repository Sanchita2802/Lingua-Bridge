import React from 'react';
import { TranslationTone } from '../types';
import { Sparkles, Briefcase, Smile, BookOpen, Feather } from 'lucide-react';

interface ToneSelectorProps {
  currentTone: TranslationTone;
  onChangeTone: (tone: TranslationTone) => void;
  disabled?: boolean;
}

const TONES: { id: TranslationTone; label: string; description: string; icon: React.ReactNode }[] = [
  { id: 'natural', label: 'Natural', description: 'Standard fluent conversational translation', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'formal', label: 'Formal', description: 'Polite, professional with formal pronouns', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: 'business', label: 'Business', description: 'Executive, corporate correspondence', icon: <Briefcase className="w-3.5 h-3.5" /> },
  { id: 'casual', label: 'Casual', description: 'Friendly, relaxed everyday tone', icon: <Smile className="w-3.5 h-3.5" /> },
  { id: 'creative', label: 'Creative', description: 'Expressive, poetic and engaging', icon: <Feather className="w-3.5 h-3.5" /> },
];

export const ToneSelector: React.FC<ToneSelectorProps> = ({ currentTone, onChangeTone, disabled }) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-1 shrink-0">
        Tone:
      </span>
      {TONES.map((tone) => {
        const isActive = currentTone === tone.id;
        return (
          <button
            key={tone.id}
            type="button"
            disabled={disabled}
            onClick={() => onChangeTone(tone.id)}
            title={tone.description}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-150 shrink-0 ${
              isActive
                ? 'bg-indigo-600 text-white shadow-xs font-semibold'
                : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {tone.icon}
            <span>{tone.label}</span>
          </button>
        );
      })}
    </div>
  );
};
