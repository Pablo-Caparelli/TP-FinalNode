import { z } from "zod";

export const messageSchema = z.object({
  text: z.string().min(1, "El mensaje no puede estar vacío"),
  userId: z.string().min(1),
  chatId: z.string().min(1),
});

export const updateMessageSchema = z.object({
  text: z.string().min(1, "El mensaje no puede estar vacío"),
});
