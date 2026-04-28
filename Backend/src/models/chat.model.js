import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    users: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      ],
      validate: {
        validator: (arr) => arr.length >= 2,
        message: "Un chat debe tener al menos 2 usuarios",
      },
    },
  },
  { timestamps: true },
);

const Chat = mongoose.model("Chat", chatSchema);

export { Chat };
