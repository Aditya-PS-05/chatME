import { Router } from "express";
import AuthController from "../controllers/AuthController";
import ChatGroupController from "../controllers/ChatGroupController";
import authMiddleware from "../middlewares/AuthMiddleware";
import ChatGroupUserController from "../controllers/ChatGroupUserController";
import ChatsController from "../controllers/ChatsController";

const router = Router();

router.post("/auth/login", AuthController.login);

// Chat Group Routes
router.get("/chat-group", authMiddleware, ChatGroupController.index);
router.get("/chat-group/:id", ChatGroupController.show);
router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy);

// chat group users 
router.get("/chat-group-users", ChatGroupUserController.index);
router.post("/chat-group-users", ChatGroupUserController.store);

// chat messages
router.get('/chats/:groupId', ChatsController.index);
export default router;
