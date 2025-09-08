import dotenv from "dotenv";
dotenv.config();

class Config {
  private static instance: Config;

  public readonly DB_USER: string;
  public readonly DB_PASSWORD: string;
  public readonly DB_HOST: string;
  public readonly DB_PORT: number;
  public readonly DB_NAME: string;
  public readonly JWT_SECRET: string;

  private constructor() {
    this.DB_USER = process.env.DB_USER || "admin";
    this.DB_PASSWORD = process.env.DB_PASSWORD || "admin";
    this.DB_HOST = process.env.DB_HOST || "localhost";
    this.DB_PORT = Number(process.env.DB_PORT) || 5433;
    this.DB_NAME = process.env.DB_NAME || "chatapp";
    this.JWT_SECRET = process.env.JWT_SECRET || "secret";
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}

export default Config;
