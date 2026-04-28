import { Chat } from "../models/chat.model.js";

export const createChat = async (req, res) => {
  try {
    const { user1, user2 } = req.body;

    if (!user1 || !user2) {
      return res.status(400).json({
        success: false,
        message: "Faltan usuarios",
      });
    }

    // 🔥 Buscar si ya existe el chat
    let chat = await Chat.findOne({
      users: { $all: [user1, user2] },
    });

    // 🔥 Si no existe → crearlo
    if (!chat) {
      chat = await Chat.create({
        users: [user1, user2],
      });
    }

    res.json({
      success: true,
      data: chat,
    });
  } catch (error) {
    console.log("ERROR CHAT:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getChats = async (req, res) => {
  const chats = await Chat.find().populate("users");

  res.json({
    success: true,
    data: chats,
    message: "Lista de chats",
  });
};
