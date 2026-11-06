import { Router } from "express";
import {
  renderMessageBoard,
  createMessage,
} from "../controllers/messageController.js";
import { isAuthenticated } from "../middleware/auth.js";

const messageRouter = Router();
messageRouter.post("/new", isAuthenticated, createMessage);
messageRouter.get("/", isAuthenticated, renderMessageBoard);
export default messageRouter;
