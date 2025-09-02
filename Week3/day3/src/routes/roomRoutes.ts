import { Router } from "express";
import { RoomController } from "../controllers/RoomController";

const router = Router();
const controller = new RoomController();

router.post("/", controller.createRoom);
router.get("/", controller.getRooms);

export default router;
