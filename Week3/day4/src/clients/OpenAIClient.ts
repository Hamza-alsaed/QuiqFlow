class OpenAIClient {
  private static instance: OpenAIClient;

  private constructor() {}

  public static getInstance(): OpenAIClient {
    if (!OpenAIClient.instance) {
      OpenAIClient.instance = new OpenAIClient();
    }
    return OpenAIClient.instance;
  }

  public async translate(text: string, lang: string): Promise<string> {
    // MOCK implementation
    return `[${lang}] ${text}`;
  }
}

export default OpenAIClient;
