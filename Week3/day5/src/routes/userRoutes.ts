import { Router } from "express";
import UserController from "../controllers/UserController";
import { API_PREFIX } from "../constants/ApiPrefix";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.post(`${API_PREFIX}`,authenticateJWT, UserController.createUser);
router.get(`${API_PREFIX}`,authenticateJWT, UserController.getAllUsers);
router.get(`${API_PREFIX}/:id`,authenticateJWT, UserController.getUserById);
router.put(`${API_PREFIX}/:id`,authenticateJWT, UserController.updateUser);
router.delete(`${API_PREFIX}/:id`,authenticateJWT, UserController.deleteUser);

export default router;
