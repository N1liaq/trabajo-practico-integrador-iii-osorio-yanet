import { Router } from "express";
import {
  deleteUser,
  getUserById,
  getUsersAll,
  updateUser,
} from "../controllers/user.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { paramIDValidation } from "../middlewares/validations/paramID.validation.js";
import { userValidation } from "../middlewares/validations/user.validation.js";

export const userRouter = Router();

userRouter.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  validate,
  getUsersAll,
);
userRouter.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  paramIDValidation,
  validate,
  getUserById,
);
userRouter.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  paramIDValidation,
  userValidation,
  validate,
  updateUser,
);
userRouter.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  paramIDValidation,
  validate,
  deleteUser,
);
