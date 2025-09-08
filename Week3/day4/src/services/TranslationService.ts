import RedisClient from "../clients/RedisClient";
import OpenAIClient from "../clients/OpenAIClient";

export const getTranslatedMessage = async (text: string, lang: string) => {
  const redis = RedisClient.getInstance();
  const cacheKey = `translate:${lang}:${text}`;

  const cached = await redis.get(cacheKey);
  if (cached) return cached;

  const translation = await OpenAIClient.getInstance().translate(text, lang);
  await redis.setEx(cacheKey, 3600, translation); // cache for 1 hour

  return translation;
};
