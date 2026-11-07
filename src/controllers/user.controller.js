import { hashPassword } from "../helpers/bcrypt.helper.js";
import { EventModel } from "../models/event.model.js";
import { UserModel } from "../models/user.model.js";

export const getUsersAll = async (req, res) => {
  try {
    const users = await UserModel.find({ deletedAt: null })
      .select("-password")
      .populate("events");

    return res.status(200).json({ data: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById({ _id: id, deletedAt: null })
      .select("-password")
      .populate("events");

    if (!user) {
      return res.status(404).json({ msg: "User no encontrado." });
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { username, email, password, role, profile } = req.body;

    const hashedPassword = await hashPassword(password);

    const updatedUser = await UserModel.findByIdAndUpdate(
      { _id: id, deletedAt: null },
      {
        username,
        email,
        password: hashedPassword,
        role,
        profile,
      },
      { returnDocument: "after", runValidators: true },
    ).select(-"password");

    if (!updateUser) {
      return res.status(404).json({ msg: "User no encontrado." });
    }

    return res.status(200).json({ data: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findOne({ _id: id, deletedAt: null });

    if (!user) {
      return res.status(404).json({ msg: "User no encontrado." });
    }

    await EventModel.deleteMany({ organizer: id });

    await UserModel.findByIdAndDelete(id, { deletedAt: new Date() });
    return res.status(200).json({ message: "User eliminado correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
