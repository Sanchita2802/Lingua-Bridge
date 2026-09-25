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
  transliteration?: string;
  linguisticNotes?: string;
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
  transliteration?: string;
  tone: TranslationTone;
  timestamp: number;
  isFavorite?: boolean;
}
