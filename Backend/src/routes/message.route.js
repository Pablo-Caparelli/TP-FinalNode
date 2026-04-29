import { Router } from "express";
import {
  sendMessage,
  getMessages,
  deleteMessage,
  updateMessage,
} from "../controllers/message.controller.js";

const router = Router();

router.post("/", sendMessage);
router.get("/chat/:chatId", getMessages);
router.delete("/:id", deleteMessage);
router.put("/:id", updateMessage);

export default router;
