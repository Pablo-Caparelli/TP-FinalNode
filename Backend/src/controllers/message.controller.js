import { Message } from "../models/message.model.js";

export const sendMessage = async (req, res, next) => {
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
      message: "Mensaje enviado",
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId }).populate("userId");

    res.json({
      success: true,
      data: messages,
      message: "Historial",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mensajeEliminado = await Message.findByIdAndDelete(id);

    if (!mensajeEliminado) {
      return res.status(404).json({
        success: false,
        message: "Mensaje no encontrado",
      });
    }

    res.json({
      success: true,
      data: mensajeEliminado,
      message: "Mensaje eliminado",
    });
  } catch (error) {
    next(error);
  }
};

export const updateMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "El texto es obligatorio",
      });
    }

    const updatedMessage = await Message.findByIdAndUpdate(
      id,
      { text },
      { new: true },
    );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Mensaje no encontrado",
      });
    }

    res.json({
      success: true,
      data: updatedMessage,
      message: "Mensaje actualizado",
    });
  } catch (error) {
    next(error);
  }
};
