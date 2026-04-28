import { User } from "../models/user.model.js";

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.create({ name, email });

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("ERROR USER:", error.message);
    res.status(500).json({ success: false });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res.json({ status: "Usuario eliminado" });
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const userUpdated = await User.findByIdAndUpdate(
      id,
      body,
      { new: true }, // 🔥 devuelve el actualizado
    );

    res.json({
      success: true,
      data: userUpdated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export { getUsers, addUser, deleteUser, updateUser };
