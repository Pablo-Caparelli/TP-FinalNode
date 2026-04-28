import { Router } from "express";
import { createChat, getChats } from "../controllers/chat.controller.js";

console.log("CARGANDO CHAT ROUTER"); // 👈 ACÁ

const router = Router();

router.post("/", createChat);
router.get("/", getChats);

export default router;
