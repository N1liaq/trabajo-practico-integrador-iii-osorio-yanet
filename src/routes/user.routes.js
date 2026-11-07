import { Router } from "express";
import {
  deleteUser,
  getUserById,
  getUsersAll,
  updateUser,
} from "../controllers/user.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const userRouter = Router();

userRouter.get("/users", authMiddleware, adminMiddleware, getUsersAll);
userRouter.get("/users/:id", authMiddleware, adminMiddleware, getUserById);
userRouter.put("/users/:id", authMiddleware, adminMiddleware, updateUser);
userRouter.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);
