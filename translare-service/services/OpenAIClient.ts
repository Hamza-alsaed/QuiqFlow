import OpenAI from 'openai';

/**
 * Singleton wrapper for the OpenAI client.
 * 
 * This class ensures only one instance of the OpenAI client is created and shared 
 * throughout the app, avoiding redundant initializations and making configuration consistent.
 */
export class OpenAIClient {
  // The single shared instance of OpenAI
  private static instance: OpenAI;

  // Private constructor prevents direct instantiation
  private constructor() {}

  /**
   * Returns the single instance of OpenAI client.
   * Initializes it on first use, using the API key from the .env file.
   *
   * @throws {Error} If the OPENAI_API_KEY is not defined in the environment.
   * @returns {OpenAI} The singleton instance of the OpenAI client.
   */
  public static getInstance(): OpenAI {
    // Check if instance already exists
    if (!OpenAIClient.instance) {
      // Validate that API key is available
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY not set in .env');
      }

      // Initialize the OpenAI client with the API key
      OpenAIClient.instance = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }

    // Return the existing or newly created instance
    return OpenAIClient.instance;
  }
}
