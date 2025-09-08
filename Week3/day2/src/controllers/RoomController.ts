import { Request, Response } from "express";
import { RoomRepository } from "../repositories/RoomRepository";

export class RoomController {
  private repo = new RoomRepository();

  createRoom = async (req: Request, res: Response) => {
    try {
      const room = await this.repo.createRoom(req.body);
      res.json(room);
    } catch {
      res.status(500).json({ error: "Failed to create room" });
    }
  };

  getRooms = async (_req: Request, res: Response) => {
    const rooms = await this.repo.getAllRooms();
    res.json(rooms);
  };
}
