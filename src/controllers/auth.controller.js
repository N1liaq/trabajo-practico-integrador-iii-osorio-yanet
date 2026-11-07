import mongoose from "mongoose";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { UserModel } from "../models/user.model.js";
import { signToken } from "../helpers/jwt.helper.js";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExist = await UserModel.findOne({ username });

    if (!userExist) {
      return res.status(401).json({
        msg: "Credenciales incorrectas",
      });
    }

    const validPassword = await comparePassword(password, userExist.password);

    if (!validPassword) {
      return res.status(401).json({
        msg: "Credenciales incorrectas",
      });
    }

    const token = signToken({ user: userExist.id, role: userExist.role });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({
      msg: "Usuario logueado correctamente",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ msg: "ID inválido" });
    }

    const user = await UserModel.findOne({ _id: id, deletedAt: null }).select(
      "profile",
    );

    if (!user) {
      return res.status(404).json({ msg: "profile no encontrado." });
    }

    return res.status(200).json({ profile: user.profile });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, birthDate, phone } = req.body;

    const fields = { firstName, lastName, birthDate, phone };
    const updates = {};
    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) updates[`profile.${key}`] = value;
    }

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ msg: "No se enviaron campos para actualizar." });
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: req.user._id, deletedAt: null },
      { $set: updates },
      { returnDocument: "after" },
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "Profile no encontrado." });
    }

    return res.status(200).json({ data: updatedUser.profile });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password, role, profile } = req.body;

    const hashedPassword = await hashPassword(password);

    const userId = new mongoose.Types.ObjectId();

    await UserModel.create([
      {
        _id: userId,
        username,
        email,
        password: hashedPassword,
        role,
        profile,
      },
    ]);

    const createdUser = await UserModel.findById(userId).select("-password");

    return res.status(201).json({ data: createdUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ msg: "se cerró la sesión correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
