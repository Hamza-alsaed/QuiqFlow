// src/controllers/UserController.ts
import { Request, Response } from "express";
import { User } from "../models/User";

class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json({ error: "Failed to create user", details: err });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      await user.update(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Failed to update user" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      await user.destroy();
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  }
}

export default new UserController();
