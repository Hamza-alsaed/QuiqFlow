import { Router } from "express";
import { getRecentMessages, getTranslatedMessages, createMessage } from "../controllers/MessageController";

const router = Router();

router.get("/recent", getRecentMessages);
router.get("/translated", getTranslatedMessages);
router.post("/", createMessage);

export default router;
