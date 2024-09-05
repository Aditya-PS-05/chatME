import { Router } from "express";
import AuthController from "../controllers/AuthController";
import ChatGroupController from "../controllers/ChatGroupController";
import authMiddleware from "../middlewares/AuthMiddleware";

const router = Router();

router.post("/auth/login", AuthController.login);
router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.get("/chat-group/:id", ChatGroupController.show);
router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy);
export default router;
