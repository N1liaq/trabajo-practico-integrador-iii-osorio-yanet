import { verifyToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies["token"];

    if (!token) {
      return res.status(401).json({ msg: "No autenticado" });
    }

    const decoded = verifyToken(token);

    const user = await UserModel.findById(decoded.user);

    if (!user || user.deletedAt) {
      return res.status(401).json({ msg: "Usuario no válido" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
};
