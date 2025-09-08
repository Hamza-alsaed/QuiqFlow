import { Router } from "express";
import { MessageController } from "../controllers/MessageController";

const router = Router();
const controller = new MessageController();

router.post("/", controller.createMessage);
router.get("/:roomId", controller.getMessages);

export default router;
