import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategoriesAll,
  getCategoryById,
  updateCategory,
} from "../controllers/category.controller.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const categoryRouter = Router();

categoryRouter.post(
  "/categories",
  authMiddleware,
  adminMiddleware,
  createCategory,
);
categoryRouter.get("/categories", authMiddleware, getCategoriesAll);
categoryRouter.get("/categories/:id", authMiddleware, getCategoryById);
categoryRouter.put(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  updateCategory,
);
categoryRouter.delete(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  deleteCategory,
);
