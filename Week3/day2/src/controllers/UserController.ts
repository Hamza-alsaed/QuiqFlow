import { Request, Response } from "express";
import { UserRepository } from "../repositories/UserRepository";

export class UserController {
  private repo = new UserRepository();

  createUser = async (req: Request, res: Response) => {
  try {
    const user = await this.repo.createUser(req.body);
    res.json(user);
  } catch (err) {
    console.error("Create user error:", err);
    res.status(500).json({ error: "Failed to create user", details: err.message });
  }
};


  getUsers = async (_req: Request, res: Response) => {
    const users = await this.repo.getAllUsers();
    res.json(users);
  };
}
