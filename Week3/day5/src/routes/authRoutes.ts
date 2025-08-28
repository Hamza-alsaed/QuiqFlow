// src/routes/authRoutes.ts
import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { API_PREFIX } from "../constants/ApiPrefix";

const router = Router();


router.post("/register", AuthController.register);
router.post("/login", AuthController.login);

export default router;
