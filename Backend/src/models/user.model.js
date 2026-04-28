import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
  },
  {
    versionKey: false,
  },
);

//modelo -> model
const User = mongoose.model("User", userSchema);

export { User };
