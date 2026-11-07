import { body } from "express-validator";
import { CategoryModel } from "../../models/category.model.js";

export const categoryValidation = [
  body("name")
    .notEmpty()
    .withMessage("El name no debe ser vacío.")
    .isLength({ min: 2, max: 30 })
    .withMessage("El name debe tener entre 2 a 30 carácteres.")
    .custom(async (name) => {
      const nameExists = await CategoryModel.findOne({ name });
      if (nameExists) {
        throw new Error("El name ingresado ya está en uso.");
      }
      return true;
    }),

  body("description")
    .optional()
    .isString()
    .withMessage("El description debe ser un texto.")
    .isLength({ max: 200 })
    .withMessage("El description debe tener un máximo de 200 carácteres."),
  ,
];
