// src/controllers/AuthController.ts
import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Config from "../../config/config";

export default class AuthController {
  static async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    try {
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ username, email, password: hashed });
      res.json({ id: user.id, username: user.username, email: user.email });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to register user" });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: "User not found" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id },
        Config.getInstance().JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to login" });
    }
  }
}
