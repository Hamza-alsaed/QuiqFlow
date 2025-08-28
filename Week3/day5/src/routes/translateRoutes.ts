import { Router } from "express";
import TranslateController from "../controllers/TranslateController";

const router = Router();

router.post("/", TranslateController.translate);

export default router;
