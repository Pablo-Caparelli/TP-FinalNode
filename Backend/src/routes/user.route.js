import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.post("/", addUser);

userRouter.delete("/:id", deleteUser);

userRouter.patch("/:id", updateUser);

export { userRouter };
