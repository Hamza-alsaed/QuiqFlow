import { Router } from "express";
import MessageController from "../controllers/MessageController";

const router = Router();

router.post("/", MessageController.createMessage);
router.get("/room/:roomId", MessageController.getMessagesByRoom);
router.get("/", MessageController.getAllMessages);
router.get("/:id", MessageController.getMessageById);
router.put("/:id", MessageController.updateMessage);
router.delete("/:id", MessageController.deleteMessage);


export default router;
