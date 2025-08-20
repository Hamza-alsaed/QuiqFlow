class OpenAIClient {
  private static instance: OpenAIClient;

  private constructor() {
    console.log("Mock OpenAI Client initialized");
  }

  static getInstance(): OpenAIClient {
    if (!OpenAIClient.instance) {
      OpenAIClient.instance = new OpenAIClient();
    }
    return OpenAIClient.instance;
  }

}

export default OpenAIClient;
