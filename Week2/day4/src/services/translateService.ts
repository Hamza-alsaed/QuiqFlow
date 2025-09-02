import OpenAIClient from "../clients/OpenAIClient.js";

class TranslateService {
  private client: OpenAIClient;

  constructor() {
    this.client = OpenAIClient.getInstance(); // singleton pattern
  }

  /**
   * Translates text to a target language.
   * @param text - The text to translate
   * @param targetLang - The language code to translate into (default: "fr")
   * @returns Translated text
   */
  async translate(text: string, targetLang: string = "fr"): Promise<string> {
    // MOCK: return a formatted string instead of calling OpenAI
    return `[${targetLang}] ${text}`;
  }
}

export default new TranslateService(); // ready-to-use instance
