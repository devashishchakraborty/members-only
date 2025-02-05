import { Router } from "express";
import messageController from "../controllers/messageController.js";
const messageRouter = Router();

messageRouter.get("/", messageController.getMessages);
messageRouter.get("/add", messageController.messageAddGet);
messageRouter.get("/:id/delete", messageController.messageDelete);

messageRouter.post("/add", messageController.messageAddPost);

export default messageRouter;
