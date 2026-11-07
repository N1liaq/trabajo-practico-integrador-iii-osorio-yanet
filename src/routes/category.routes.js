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
import { categoryValidation } from "../middlewares/validations/category.validation.js";
import { validate } from "../middlewares/validate.middleware.js";
import { paramIDValidation } from "../middlewares/validations/paramID.validation.js";

export const categoryRouter = Router();

categoryRouter.post(
  "/categories",
  authMiddleware,
  adminMiddleware,
  categoryValidation,
  validate,
  createCategory,
);
categoryRouter.get("/categories", authMiddleware, validate, getCategoriesAll);
categoryRouter.get(
  "/categories/:id",
  authMiddleware,
  paramIDValidation,
  validate,
  getCategoryById,
);
categoryRouter.put(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  paramIDValidation,
  categoryValidation,
  validate,
  updateCategory,
);
categoryRouter.delete(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  paramIDValidation,
  validate,
  deleteCategory,
);
