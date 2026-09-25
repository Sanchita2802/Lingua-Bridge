import { GoogleGenAI, Type } from '@google/genai';

/**
 * Vercel Serverless Function Handler for /api/translate
 * Supports Vercel serverless deployments alongside custom server deployments.
 */
export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { text, sourceLang, targetLang, tone = 'natural' } = body || {};

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Source text is required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error:
          'Gemini API key is not configured. Please set GEMINI_API_KEY or API_KEY in your Vercel Environment Variables.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Tone instructions
    const toneInstructions: Record<string, string> = {
      formal: 'Use refined, polite, respectful, and professional language suitable for business or formal correspondence.',
      informal: 'Use casual, conversational, friendly, and everyday language as spoken between friends or peers.',
      business: 'Use crisp, polished, clear, executive-grade corporate terminology and professional courtesy.',
      poetic: 'Preserve deep imagery, rhythm, lyricism, and literary elegance while keeping core meaning true.',
      natural: 'Provide the most idiomatic, modern, natural phrasing that a native speaker would intuitively choose.',
    };

    const selectedToneInstruction = toneInstructions[tone] || toneInstructions.natural;

    const prompt = `You are a world-class translation engine and computational linguist.
Translate the following text accurately and idiomatically.

SOURCE LANGUAGE: ${sourceLang === 'auto' ? 'Auto-Detect' : sourceLang}
TARGET LANGUAGE: ${targetLang}
TONE / STYLE: ${tone} (${selectedToneInstruction})

INPUT TEXT:
"""
${text}
"""

Instructions:
1. Translate accurately into the target language respecting the requested tone.
2. If the source language is Auto-Detect, identify the detected language name (e.g., "French", "Hindi", "Japanese") and its BCP-47 / ISO code (e.g., "fr", "hi", "ja").
3. If source language was already specified, confirm that language name and code.
4. Estimate your detection/translation confidence (0 to 100 integer).
5. For languages using non-Latin scripts (e.g., Hindi, Japanese, Arabic, Russian, Chinese, Korean, Malayalam, etc.), provide a helpful romanized pronunciation / transliteration. If target language is already Latin-based, this can be null.
6. Provide a brief linguistic note explaining nuances, cultural resonance, or idiom equivalents if interesting, else null.
`;

    // Generate translation using gemini-3.8-flash with fallback support
    const models = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
    let response: any = null;
    let lastError: any = null;

    for (const model of models) {
      try {
        response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            temperature: 0.3,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                translatedText: { type: Type.STRING },
                detectedLanguage: { type: Type.STRING },
                detectedLanguageCode: { type: Type.STRING },
                confidence: { type: Type.INTEGER },
                transliteration: { type: Type.STRING },
                linguisticNotes: { type: Type.STRING },
              },
              required: ['translatedText', 'detectedLanguage', 'detectedLanguageCode'],
            },
          },
        });
        if (response) break;
      } catch (err: any) {
        console.warn(`Model ${model} in serverless function failed, trying fallback:`, err?.message || err);
        lastError = err;
      }
    }

    if (!response) {
      throw lastError || new Error('Failed to generate content with available models.');
    }

    const outputText = response.text?.trim() || '{}';
    const parsedData = JSON.parse(outputText);

    return res.status(200).json(parsedData);
  } catch (error: any) {
    console.error('Translation error in Vercel function:', error);
    return res.status(500).json({
      error: error.message || 'An unexpected error occurred during translation.',
    });
  }
}
