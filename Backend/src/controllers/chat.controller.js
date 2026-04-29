import { Chat } from "../models/chat.model.js";
import { chatSchema } from "../validators/chat.validator.js";

export const createChat = async (req, res, next) => {
  try {
    const result = chatSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Datos inválidos",
        errors: result.error.format(),
      });
    }

    const { user1, user2 } = result.data;

    let chat = await Chat.findOne({
      users: { $all: [user1, user2] },
    });

    if (!chat) {
      chat = await Chat.create({
        users: [user1, user2],
      });
    }

    res.json({
      success: true,
      data: chat,
      message: "Chat creado/encontrado",
    });
  } catch (error) {
    next(error);
  }
};

export const getChats = async (req, res, next) => {
  try {
    const chats = await Chat.find().populate("users");

    res.json({
      success: true,
      data: chats,
      message: "Lista de chats",
    });
  } catch (error) {
    next(error);
  }
};
