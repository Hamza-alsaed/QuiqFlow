// src/config/Config.ts
import dotenv from "dotenv";

dotenv.config();

class Config {
  private static instance: Config;

  public readonly JWT_SECRET: string;
  public readonly PORT: number;
  public readonly DB_HOST: string;
  public readonly DB_PORT: number;
  public readonly DB_USER: string;
  public readonly DB_PASSWORD: string;
  public readonly DB_NAME: string;
  public readonly OPENAI_API_KEY: string;

  private constructor() {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined");
    if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY is not defined");

    this.JWT_SECRET = process.env.JWT_SECRET;
    this.PORT = Number(process.env.PORT) || 3000;
    this.DB_HOST = process.env.DB_HOST || "127.0.0.1";
    this.DB_PORT = Number(process.env.DB_PORT) || 5432;
    this.DB_USER = process.env.DB_USER || "admin";
    this.DB_PASSWORD = process.env.DB_PASSWORD || "admin";
    this.DB_NAME = process.env.DB_NAME || "chatapp";
    this.OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }
}

export default Config;
