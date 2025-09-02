import { Request, Response } from "express";
import { MessageRepository } from "../repositories/MessageRepository";

export class MessageController {
  private repo = new MessageRepository();

  createMessage = async (req: Request, res: Response) => {
    try {
      const message = await this.repo.createMessage(req.body);
      res.json(message);
    } catch {
      res.status(500).json({ error: "Failed to create message" });
    }
  };

  getMessages = async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const messages = await this.repo.getMessagesByRoom(Number(roomId));
    res.json(messages);
  };
}
