export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  ttsCode: string;
  direction?: 'ltr' | 'rtl';
}

export type TranslationTone = 'natural' | 'formal' | 'casual' | 'business' | 'creative';

export interface TranslationResponse {
  translatedText: string;
  detectedLanguage?: string;
  detectedLanguageCode?: string;
  confidence?: number;
  romanization?: string | null;
  transliteration?: string | null;
  linguisticNotes?: string | null;
}

export interface HistoryItem {
  id: string;
  sourceText: string;
  translatedText: string;
  sourceLang: string;
  sourceLangName: string;
  targetLang: string;
  targetLangName: string;
  detectedLanguage?: string;
  confidence?: number;
  romanization?: string | null;
  transliteration?: string | null;
  tone: TranslationTone;
  timestamp: number;
  isFavorite?: boolean;
}
