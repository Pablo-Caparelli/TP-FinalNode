import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  email: z.string().email("Email inválido"),
});

export const updateUserSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio").optional(),
  email: z.string().email("Email inválido").optional(),
});
