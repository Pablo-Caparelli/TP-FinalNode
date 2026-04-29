import { z } from "zod";

export const chatSchema = z.object({
  user1: z.string().min(1, "user1 es obligatorio"),
  user2: z.string().min(1, "user2 es obligatorio"),
});
