import { Router } from "express";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { userValidation } from "../middlewares/validations/user.validation.js";
import { validate } from "../middlewares/validate.middleware.js";
import { paramIDValidation } from "../middlewares/validations/paramID.validation.js";

export const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", userValidation, validate, register);
authRouter.get(
  "/profile/:id",
  authMiddleware,
  paramIDValidation,
  validate,
  getProfile,
);
authRouter.put(
  "/profile/:id",
  authMiddleware,
  paramIDValidation,
  userValidation,
  validate,
  updateProfile,
);
authRouter.post("/logout", authMiddleware, logout);
