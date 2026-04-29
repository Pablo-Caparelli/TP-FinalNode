import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import { connectMongoDb } from "./config/connectMongoDb.js";
import { userRouter } from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";
import messageRouter from "./routes/message.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 1234;

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/chats", chatRouter);
app.use("/messages", messageRouter);

io.on("connection", (socket) => {
  console.log("✅ Cliente conectado:", socket.id);

  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
  });

  socket.on("enviar_mensaje", (data) => {
    io.to(data.chatId).emit("recibir_mensaje", data);
  });

  socket.on("disconnect", () => {
    console.log("❌ Cliente desconectado:", socket.id);
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

app.use(errorHandler);

httpServer.listen(PORT, () => {
  connectMongoDb();
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
