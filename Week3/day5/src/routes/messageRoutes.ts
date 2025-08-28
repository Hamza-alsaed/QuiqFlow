import { Router } from "express";
import MessageController from "../controllers/MessageController";

const router = Router();

router.post("/", MessageController.createMessage);
router.get("/room/:roomId", MessageController.getMessagesByRoom);

export default router;
