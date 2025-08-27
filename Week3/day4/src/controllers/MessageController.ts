// src/controllers/MessageController.ts
import { Request, Response } from "express";
import MessageRepository from "../repositories/MessageRepository";
import { getTranslatedMessage } from "../services/TranslationService";
import RedisClient from "../clients/RedisClient";

export const getRecentMessages = async (req: Request, res: Response) => {
  try {
    const redis = RedisClient.getInstance();
    const cached = await redis.get("recent_messages");
    if (cached) return res.json(JSON.parse(cached));

    const messages = await MessageRepository.getRecent(10);
    await redis.setEx("recent_messages", 60, JSON.stringify(messages));

    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recent messages" });
  }
};

export const getTranslatedMessages = async (req: Request, res: Response) => {
  try {
    const { lang } = req.query;
    if (!lang) return res.status(400).json({ error: "lang query param required" });

    const messages = await MessageRepository.getRecent(10);
    const translated = await Promise.all(
      messages.map(async (msg) => ({
        ...msg.toJSON(),
        text: await getTranslatedMessage(msg.content, lang as string),
      }))
    );

    res.json(translated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch translated messages" });
  }
};

export const createMessage = async (req: Request, res: Response) => {
  const { text, roomId, userId } = req.body;
  if (!text || !roomId || !userId) {
    return res.status(400).json({ error: "text, roomId, and userId are required" });
  }

  try {
    const message = await MessageRepository.createMessage({ text, roomId, userId });
    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create message" });
  }
};
