import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;

// Initialize Google GenAI client according to official guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  // Translation API Endpoint
  app.post('/api/translate', async (req: Request, res: Response): Promise<void> => {
    try {
      const { text, sourceLang = 'auto', targetLang = 'es', tone = 'natural' } = req.body;

      if (!text || typeof text !== 'string' || !text.trim()) {
        res.status(400).json({ error: 'Please enter text to translate.' });
        return;
      }

      if (text.length > 6000) {
        res.status(400).json({ error: 'Text exceeds maximum limit of 5,000 characters.' });
        return;
      }

      // If source and target are the same and not auto-detect, return directly
      if (sourceLang !== 'auto' && sourceLang.toLowerCase() === targetLang.toLowerCase()) {
        res.json({
          translatedText: text,
          detectedLanguage: sourceLang,
          detectedLanguageCode: sourceLang,
          confidence: 100,
        });
        return;
      }

      const prompt = `Translate the following text.
Source language: ${sourceLang === 'auto' ? 'Auto-detect' : sourceLang}
Target language: ${targetLang}
Desired tone: ${tone}

Text to translate:
"""
${text}
"""`;

      const systemInstruction = `You are LinguaBridge, a world-class professional translation engine.
Your mission is to translate text faithfully, idiomatically, and accurately while preserving formatting, paragraphing, and tone.

Guidelines:
1. Preserve all whitespace, line breaks, markdown symbols, numbers, and proper nouns.
2. If source language is 'Auto-detect', detect the source language and its ISO code.
3. Tone requirement: ${tone} (e.g., natural conversational, formal business, casual friendly, academic, or creative).
4. Provide a phonetic transliteration / romanization (e.g. Romaji for Japanese, Pinyin for Chinese, Roman script for Hindi/Marathi/Arabic/Russian/Greek/Korean) if the target or source language is written in a non-Latin script. Otherwise, omit or set to null.
5. Provide a brief 1-sentence linguistic nuance note if any cultural idiom, honorific, or grammar subtlety was adapted. Otherwise set to null.

You MUST respond strictly with valid JSON with this exact structure:
{
  "translatedText": "the translation",
  "detectedLanguage": "English/Hindi/French/etc.",
  "detectedLanguageCode": "en/hi/fr/etc.",
  "confidence": 98,
  "transliteration": "optional phonetic text or null",
  "linguisticNotes": "optional note or null"
}`;

      const generateWithFallback = async (contents: string, config: any) => {
        const models = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
        let lastError: any = null;

        for (const model of models) {
          try {
            return await ai.models.generateContent({
              model,
              contents,
              config,
            });
          } catch (err: any) {
            console.warn(`Model ${model} failed, trying fallback:`, err?.message || err);
            lastError = err;
          }
        }
        throw lastError;
      };

      const response = await generateWithFallback(prompt, {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.3,
      });

      const responseText = response.text || '';
      let parsed;
      try {
        parsed = JSON.parse(responseText);
      } catch (parseError) {
        // Fallback for wrapped json blocks
        const cleaned = responseText
          .replace(/^```json\s*/i, '')
          .replace(/^```\s*/i, '')
          .replace(/\s*```$/i, '')
          .trim();
        try {
          parsed = JSON.parse(cleaned);
        } catch (e) {
          // Fallback if raw text returned
          parsed = {
            translatedText: responseText.trim(),
            confidence: 95,
          };
        }
      }

      res.json({
        translatedText: parsed.translatedText || responseText.trim(),
        detectedLanguage: parsed.detectedLanguage,
        detectedLanguageCode: parsed.detectedLanguageCode,
        confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 95,
        transliteration: parsed.transliteration || null,
        linguisticNotes: parsed.linguisticNotes || null,
      });
    } catch (error: any) {
      console.error('Translation error:', error);
      let errorMessage = 'An unexpected error occurred while translating. Please try again.';
      try {
        if (typeof error?.message === 'string') {
          if (error.message.startsWith('{')) {
            const parsedErr = JSON.parse(error.message);
            errorMessage = parsedErr?.error?.message || errorMessage;
          } else {
            errorMessage = error.message;
          }
        }
      } catch {
        errorMessage = error?.message || errorMessage;
      }

      if (errorMessage.includes('API_KEY') || error?.status === 403) {
        errorMessage = 'Translation service credentials not configured. Please check your Gemini API key in Settings > Secrets.';
      } else if (errorMessage.includes('demand') || error?.status === 503) {
        errorMessage = 'AI translation servers are experiencing a brief spike in demand. Please click "Try Again" in a moment.';
      }

      res.status(500).json({ error: errorMessage });
    }
  });

  // Fast Language Detection Endpoint
  app.post('/api/detect-language', async (req: Request, res: Response): Promise<void> => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== 'string' || !text.trim()) {
        res.status(400).json({ error: 'Text required for detection.' });
        return;
      }

      const prompt = `Identify the natural language of this text:\n"""\n${text.slice(0, 500)}\n"""`;
      const systemInstruction = `You are a linguistic language detector. Identify the language.
Respond with JSON only:
{
  "detectedLanguage": "Full English Name (e.g. French)",
  "detectedLanguageCode": "ISO code (e.g. fr)",
  "confidence": 98
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.1,
        },
      });

      const responseText = response.text || '';
      try {
        const parsed = JSON.parse(responseText);
        res.json(parsed);
      } catch {
        res.json({ detectedLanguage: 'Unknown', detectedLanguageCode: 'auto', confidence: 80 });
      }
    } catch (error: any) {
      console.error('Language detection error:', error);
      res.status(500).json({ error: 'Language detection failed.' });
    }
  });

  // Setup Vite middlewares in development or serve static files in production
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`LinguaBridge server active on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
