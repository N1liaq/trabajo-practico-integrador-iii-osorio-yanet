import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/profile/:id", authMiddleware, getProfile);
authRouter.put("/profile/:id", authMiddleware, updateProfile);
authRouter.post("/logout", authMiddleware, logout);
