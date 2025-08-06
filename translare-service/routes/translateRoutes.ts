import express from 'express';
import { translateText } from '../controllers/translateController';
import { validateRequest } from '../middleware/validateRequest'; // ✅ Now this works

const router = express.Router();

router.post('/translate', validateRequest, translateText);

export default router;
