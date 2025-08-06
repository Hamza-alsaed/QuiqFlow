import { Request, Response, NextFunction } from 'express';
import { TranslatorService } from '../services/TranslatorService';
import { logTranslation } from '../utils/logger';

const translator = new TranslatorService();

export async function translateText(req: Request, res: Response, next: NextFunction) {
  try {
    const { text, targetLang } = req.body;

    const translatedText = await translator.translate(text, targetLang);

    logTranslation(text, translatedText, targetLang);

    res.json({ success: true, translatedText });
  } catch (error) {
    next(error);
  }
}
