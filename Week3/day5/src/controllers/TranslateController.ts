// src/controllers/TranslateController.ts
import { Request, Response } from "express";
import TranslateService from "../services/TranslationService";

class TranslateController {
  async translate(req: Request, res: Response) {
    try {
      const { text, targetLang } = req.body;
      if (!text || !targetLang) {
        return res.status(400).json({ error: "text and targetLang are required" });
      }
      const result = await TranslateService.translate(text, targetLang);
      res.json({ translated: result });
    } catch (err) {
      res.status(500).json({ error: "Translation failed", details: err });
    }
  }
}

export default new TranslateController();
