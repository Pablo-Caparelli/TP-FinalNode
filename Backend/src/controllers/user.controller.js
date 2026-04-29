import { User } from "../models/user.model.js";
import { updateUserSchema, userSchema } from "../validators/user.validator.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

const addUser = async (req, res, next) => {
  try {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Datos inválidos",
        errors: result.error.format(),
      });
    }

    const user = await User.create(result.data);

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const userDeleted = await User.findByIdAndDelete(id);

    if (!userDeleted) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.json({
      success: true,
      data: userDeleted,
      message: "Usuario eliminado",
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = updateUserSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Datos inválidos",
        errors: result.error.format(),
      });
    }

    const userUpdated = await User.findByIdAndUpdate(id, result.data, {
      new: true,
    });

    if (!userUpdated) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    res.json({
      success: true,
      data: userUpdated,
      message: "Usuario actualizado",
    });
  } catch (error) {
    next(error);
  }
};

export { getUsers, addUser, deleteUser, updateUser };
