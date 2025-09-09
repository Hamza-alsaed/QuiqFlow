// src/routes/authRoutes.ts
import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { authenticateJWT } from "../middleware/auth";
import { API_PREFIX } from "../constants/ApiPrefix";

const router = Router();

router.use(authenticateJWT);

router.post(`${API_PREFIX}/login`, AuthController.login);
router.post(`${API_PREFIX}/register`, AuthController.register);

export default router;
