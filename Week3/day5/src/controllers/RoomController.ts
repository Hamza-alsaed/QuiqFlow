// src/controllers/RoomController.ts
import { Request, Response } from "express";
import { Room } from "../models/Room";

class RoomController {
  async createRoom(req: Request, res: Response) {
    try {
      const room = await Room.create(req.body);
      res.status(201).json(room);
    } catch (err) {
      res.status(500).json({ error: "Failed to create room", details: err });
    }
  }

  async getAllRooms(req: Request, res: Response) {
    try {
      const rooms = await Room.findAll();
      res.json(rooms);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch rooms" });
    }
  }

  async getRoomById(req: Request, res: Response) {
    try {
      const room = await Room.findByPk(req.params.id);
      if (!room) return res.status(404).json({ error: "Room not found" });
      res.json(room);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch room" });
    }
  }

  async updateRoom(req: Request, res: Response) {
    try {
      const room = await Room.findByPk(req.params.id);
      if (!room) return res.status(404).json({ error: "Room not found" });

      await room.update(req.body);
      res.json(room);
    } catch (err) {
      res.status(500).json({ error: "Failed to update room" });
    }
  }

  async deleteRoom(req: Request, res: Response) {
    try {
      const room = await Room.findByPk(req.params.id);
      if (!room) return res.status(404).json({ error: "Room not found" });

      await room.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Failed to delete room" });
    }
  }
}

export default new RoomController();
