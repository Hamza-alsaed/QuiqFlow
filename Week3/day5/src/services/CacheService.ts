// src/services/CacheService.ts
import Redis from "ioredis";

class CacheService {
  private static client: Redis;

  static getClient(): Redis {
    if (!this.client) {
      this.client = new Redis({
        host: process.env.REDIS_HOST || "127.0.0.1",
        port: Number(process.env.REDIS_PORT) || 6379,
      });
    }
    return this.client;
  }

  static async get(key: string) {
    return this.getClient().get(key);
  }

  static async set(key: string, value: string, ttl?: number) {
    if (ttl) return this.getClient().set(key, value, "EX", ttl);
    return this.getClient().set(key, value);
  }
}

export default CacheService;
