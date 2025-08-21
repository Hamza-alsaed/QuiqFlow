import { Request, Response, NextFunction } from "express";
import translateService from "../services/translateService.js";

interface TranslateBody {
  text: string;
  lang?: string; // optional; if not provided, could default to a language
}

interface HttpError extends Error {
  statusCode?: number;
}

// Helper to create errors
const createError = (message: string, statusCode: number): HttpError => {
  const err = new Error(message) as HttpError;
  err.statusCode = statusCode;
  return err;
};

export const translateText = async (
  req: Request<{}, {}, TranslateBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text, lang } = req.body;

    if (!text || text.trim() === "") {
      throw createError("Text is required", 400);
    }

    const translated = await translateService.translate(text, lang);
    res.json({ translated });
  } catch (err) {
    next(err);
  }
};
