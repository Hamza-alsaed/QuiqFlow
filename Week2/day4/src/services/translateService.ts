import OpenAIClient from "../clients/OpenAIClient.js";

class TranslateService {
  private client;

  constructor() {
    this.client = OpenAIClient.getInstance(); // use Singleton
  }

  async translate(text: string, targetLang: string = "fr"): Promise<string> {
    // MOCK: Instead of calling OpenAI, fake it
    return `[${targetLang}] ${text}`;
  }
}

export default new TranslateService(); // export as ready-to-use service
