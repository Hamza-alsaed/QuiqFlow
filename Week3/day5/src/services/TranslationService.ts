// src/services/TranslateService.ts
import OpenAI from "openai";
import CacheService from "./CacheService";

class TranslateService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  async translate(text: string, targetLang: string): Promise<string> {
    const cacheKey = `translation:${targetLang}:${text}`;
    const cached = await CacheService.get(cacheKey);
    if (cached) return cached;

    const response = await this.client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `Translate the text into ${targetLang}` },
        { role: "user", content: text },
      ],
    });

    const translated = response.choices[0].message?.content ?? text;
    await CacheService.set(cacheKey, translated, 3600); // cache for 1h
    return translated;
  }
}

export default new TranslateService();
