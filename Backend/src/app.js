import express from "express";
import cors from "cors";
import { createServer } from "http"; // Nativo de Node
import { Server } from "socket.io"; // Se instala con npm install socket.io
import { connectMongoDb } from "./config/connectMongoDb.js";
import { userRouter } from "./routes/user.route.js";
import chatRouter from "./routes/chat.route.js";
import messageRouter from "./routes/message.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const server = express();
const httpServer = createServer(server); // Servidor base para Sockets

// Configuración de Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
  },
});

server.use(cors());
server.use(express.json());

// Rutas API
server.use("/users", userRouter);
server.use("/chats", chatRouter);
server.use("/messages", messageRouter);

server.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Ruta no encontrada",
  });
});

server.use(errorHandler);

// Lógica de Chat en tiempo real
io.on("connection", (socket) => {
  console.log("✅ Cliente conectado:", socket.id);

  socket.on("enviar_mensaje", (data) => {
    // Reenviar mensaje a todos
    io.emit("recibir_mensaje", data);
  });
});

// USAR httpServer.listen
httpServer.listen(1234, () => {
  connectMongoDb();
  console.log(`✅ Servidor en escucha http://localhost:1234`);
});
