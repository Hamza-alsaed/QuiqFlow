import { createClient, RedisClientType } from "redis";

export default class RedisClient {
  private static instance: RedisClientType;
  
  private constructor() {}

  public static getInstance(): RedisClientType {
    if (!RedisClient.instance) {
      RedisClient.instance = createClient({
        url: process.env.REDIS_URL || "redis://localhost:6379"
      });

      RedisClient.instance.on("error", (err) => console.error("Redis Client Error", err));
      RedisClient.instance.connect().then(() => console.log("Redis connected"));
    }

    return RedisClient.instance;
  }
}
