// src/controllers/MessageController.ts
import { Request, Response } from "express";
import { Message } from "../models/Message";

class MessageController {
  async createMessage(req: Request, res: Response) {
    try {
      const message = await Message.create(req.body);
      res.status(201).json(message);
    } catch (err) {
      res.status(500).json({ error: "Failed to create message", details: err });
    }
  }

  async getAllMessages(req: Request, res: Response) {
    try {
      const messages = await Message.findAll();
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  }

  async getMessageById(req: Request, res: Response) {
    try {
      const message = await Message.findByPk(req.params.id);
      if (!message) return res.status(404).json({ error: "Message not found" });
      res.json(message);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch message" });
    }
  }

  async updateMessage(req: Request, res: Response) {
    try {
      const message = await Message.findByPk(req.params.id);
      if (!message) return res.status(404).json({ error: "Message not found" });

      await message.update(req.body);
      res.json(message);
    } catch (err) {
      res.status(500).json({ error: "Failed to update message" });
    }
  }

  async deleteMessage(req: Request, res: Response) {
    try {
      const message = await Message.findByPk(req.params.id);
      if (!message) return res.status(404).json({ error: "Message not found" });

      await message.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Failed to delete message" });
    }
  }

  async getMessagesByRoom(req: Request, res: Response) {
    try {
      const { roomId } = req.params;
      const messages = await Message.getMessagesByRoom(Number(roomId));
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  }
}

export default new MessageController();
