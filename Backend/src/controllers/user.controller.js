import { User } from "../models/user.model.js";

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
    const { name, email } = req.body;

    const user = await User.create({ name, email });

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
    const body = req.body;

    const userUpdated = await User.findByIdAndUpdate(id, body, {
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
