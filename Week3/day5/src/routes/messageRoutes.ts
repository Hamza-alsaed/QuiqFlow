import { Router } from "express";
import MessageController from "../controllers/MessageController";
import { API_PREFIX } from "../constants/ApiPrefix";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.post(`${API_PREFIX}/messages`, authenticateJWT, MessageController.createMessage);
router.get(`${API_PREFIX}/room/:roomId`, authenticateJWT, MessageController.getMessagesByRoom);

export default router;
