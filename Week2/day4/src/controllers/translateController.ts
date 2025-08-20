import { Request, Response, NextFunction } from "express";
import translateService from "../services/translateService.js";

export const translateText = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text, lang } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    const translated = await translateService.translate(text, lang);
    res.json({ translated });
  } catch (err) {
    next(err);
  }
};
