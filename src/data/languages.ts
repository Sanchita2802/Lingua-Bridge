import { Language } from '../types';

export const AUTO_DETECT_LANGUAGE: Language = {
  code: 'auto',
  name: 'Auto-Detect',
  nativeName: 'Auto-Detect',
  flag: '✨',
  ttsCode: 'en-US',
};

export const LANGUAGES: Language[] = [
  // Major requested world languages
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', ttsCode: 'en-US' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', ttsCode: 'es-ES' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', ttsCode: 'fr-FR' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', ttsCode: 'de-DE' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', ttsCode: 'hi-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', ttsCode: 'mr-IN' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文', flag: '🇨🇳', ttsCode: 'zh-CN' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文', flag: '🇹🇼', ttsCode: 'zh-TW' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵', ttsCode: 'ja-JP' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', flag: '🇰🇷', ttsCode: 'ko-KR' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', ttsCode: 'ar-SA', direction: 'rtl' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', ttsCode: 'ru-RU' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹', ttsCode: 'pt-PT' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹', ttsCode: 'it-IT' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇧🇩', ttsCode: 'bn-BD' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', ttsCode: 'ta-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', ttsCode: 'te-IN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', ttsCode: 'gu-IN' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', ttsCode: 'pa-IN' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', ttsCode: 'ur-PK', direction: 'rtl' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', ttsCode: 'tr-TR' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', ttsCode: 'vi-VN' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย', flag: '🇹🇭', ttsCode: 'th-TH' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱', ttsCode: 'nl-NL' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱', ttsCode: 'pl-PL' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪', ttsCode: 'sv-SE' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷', ttsCode: 'el-GR' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱', ttsCode: 'he-IL', direction: 'rtl' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', ttsCode: 'id-ID' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu', flag: '🇲🇾', ttsCode: 'ms-MY' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪', ttsCode: 'sw-KE' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦', ttsCode: 'uk-UA' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿', ttsCode: 'cs-CZ' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk', flag: '🇩🇰', ttsCode: 'da-DK' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮', ttsCode: 'fi-FI' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴', ttsCode: 'nb-NO' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺', ttsCode: 'hu-HU' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română', flag: '🇷🇴', ttsCode: 'ro-RO' },
  { code: 'tl', name: 'Filipino (Tagalog)', nativeName: 'Tagalog', flag: '🇵🇭', ttsCode: 'fil-PH' },
  { code: 'fa', name: 'Persian (Farsi)', nativeName: 'فارسی', flag: '🇮🇷', ttsCode: 'fa-IR', direction: 'rtl' },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာဘာသာ', flag: '🇲🇲', ttsCode: 'my-MM' },
  { code: 'km', name: 'Khmer', nativeName: 'ភាសាខ្មែរ', flag: '🇰🇭', ttsCode: 'km-KH' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', flag: '🇳🇵', ttsCode: 'ne-NP' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල', flag: '🇱🇰', ttsCode: 'si-LK' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳', ttsCode: 'ml-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', ttsCode: 'kn-IN' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', ttsCode: 'or-IN' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳', ttsCode: 'as-IN' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски', flag: '🇷🇸', ttsCode: 'sr-RS' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷', ttsCode: 'hr-HR' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰', ttsCode: 'sk-SK' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬', ttsCode: 'bg-BG' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans', flag: '🇿🇦', ttsCode: 'af-ZA' },
  { code: 'sq', name: 'Albanian', nativeName: 'Shqip', flag: '🇦🇱', ttsCode: 'sq-AL' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹', ttsCode: 'am-ET' },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan', flag: '🇦🇿', ttsCode: 'az-AZ' },
  { code: 'eu', name: 'Basque', nativeName: 'Euskara', flag: '🇪🇸', ttsCode: 'eu-ES' },
  { code: 'be', name: 'Belarusian', nativeName: 'Беларуская', flag: '🇧🇾', ttsCode: 'be-BY' },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski', flag: '🇧🇦', ttsCode: 'bs-BA' },
  { code: 'ca', name: 'Catalan', nativeName: 'Català', flag: '🇪🇸', ttsCode: 'ca-ES' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti', flag: '🇪🇪', ttsCode: 'et-EE' },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული', flag: '🇬🇪', ttsCode: 'ka-GE' },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge', flag: '🇮🇪', ttsCode: 'ga-IE' },
  { code: 'is', name: 'Icelandic', nativeName: 'Íslenska', flag: '🇮🇸', ttsCode: 'is-IS' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹', ttsCode: 'lt-LT' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻', ttsCode: 'lv-LV' },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски', flag: '🇲🇰', ttsCode: 'mk-MK' },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti', flag: '🇲🇹', ttsCode: 'mt-MT' },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол', flag: '🇲🇳', ttsCode: 'mn-MN' },
  { code: 'cy', name: 'Welsh', nativeName: 'Cymraeg', flag: '🇬🇧', ttsCode: 'cy-GB' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦', ttsCode: 'zu-ZA' },
  { code: 'la', name: 'Latin', nativeName: 'Latina', flag: '🏛️', ttsCode: 'la' },
  { code: 'eo', name: 'Esperanto', nativeName: 'Esperanto', flag: '🌐', ttsCode: 'eo' },
];

export const POPULAR_SOURCE_LANGUAGES = ['auto', 'en', 'es', 'fr', 'de', 'hi', 'zh-CN', 'ja'];
export const POPULAR_TARGET_LANGUAGES = ['es', 'fr', 'de', 'hi', 'mr', 'ja', 'zh-CN', 'ar'];

export function getLanguageByCode(code: string): Language {
  if (code === 'auto') return AUTO_DETECT_LANGUAGE;
  return (
    LANGUAGES.find((lang) => lang.code.toLowerCase() === code.toLowerCase()) || {
      code,
      name: code.toUpperCase(),
      nativeName: code.toUpperCase(),
      flag: '🌐',
      ttsCode: code,
    }
  );
}

export const SAMPLE_TEXTS = [
  {
    title: 'Business Greeting',
    text: 'Good morning! Thank you for taking the time to meet with our international team today. We look forward to a successful collaboration.',
    sourceLang: 'en',
    targetLang: 'es',
  },
  {
    title: 'Travel & Dining',
    text: 'Excuse me, could you please recommend a traditional local restaurant nearby that offers vegetarian options?',
    sourceLang: 'en',
    targetLang: 'fr',
  },
  {
    title: 'Hindi to English',
    text: 'नमस्ते! आशा है कि आपका दिन शुभ और मंगलमय हो। हम मिलकर बहुत कुछ नया सीख सकते हैं।',
    sourceLang: 'hi',
    targetLang: 'en',
  },
  {
    title: 'Marathi to English',
    text: 'नमस्कार! आजचा दिवस तुमच्यासाठी आनंददायी आणि यशस्वी जावो हीच सदिच्छा.',
    sourceLang: 'mr',
    targetLang: 'en',
  },
  {
    title: 'Japanese to English',
    text: 'こんにちは！本日はお忙しいところお時間をいただき、誠にありがとうございます。',
    sourceLang: 'ja',
    targetLang: 'en',
  },
];
