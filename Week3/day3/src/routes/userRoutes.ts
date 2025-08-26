import { Router } from "express";
import { UserController } from "../controllers/UserController";

const router = Router();
const controller = new UserController();

router.post("/", controller.createUser);
router.get("/", controller.getUsers);

export default router;
