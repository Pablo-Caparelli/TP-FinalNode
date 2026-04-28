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

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID recibido:", id);

    const mensajeEliminado = await Message.findByIdAndDelete(id);
    console.log("Eliminado:", mensajeEliminado);

    if (!mensajeEliminado) {
      return res.status(404).json({
        success: false,
        message: "Mensaje no encontrado",
      });
    }

    res.json({
      success: true,
      data: mensajeEliminado,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
