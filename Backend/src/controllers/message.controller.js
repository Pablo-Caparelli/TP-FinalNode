import { Message } from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { text, userId, chatId } = req.body;

    if (!text || !userId || !chatId) {
      return res.status(400).json({
        success: false,
        message: "Faltan datos",
      });
    }

    const message = await Message.create({ text, userId, chatId });

    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.log("ERROR MESSAGE:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;

  const messages = await Message.find({ chatId }).populate("userId");

  res.json({
    success: true,
    data: messages,
    message: "Historial",
  });
};
