import mongoose from "mongoose";

import { EventModel } from "../../models/event.model.js";
import { CategoryModel } from "../../models/category.model.js";
import { body } from "express-validator";

export const eventValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El title debe ser vacío.")
    .isLength({ min: 3, max: 150 })
    .withMessage("El title debe tener entre 3 y 150 carácteres.")

    .custom(async (title) => {
      const titleExists = await EventModel.findOne({ title });
      if (titleExists) {
        throw new Error("El title ingresado ya está en uso.");
      }
      return true;
    }),

  body("description")
    .notEmpty()
    .withMessage("El description no debe ser vacío.")
    .isLength({ min: 20 })
    .withMessage("El description debe tener un mínimo de 20 carácteres."),

  body("startDate")
    .notEmpty()
    .withMessage("El startDate no debe ser vacío.")
    .isISO8601()
    .withMessage("El startDate no es válido."),

  body("endDate")
    .notEmpty()
    .withMessage("El endDate no debe ser vacío.")
    .isISO8601()
    .withMessage("El endDate no es válido.")
    .bail()
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error("El endDate debe ser posterior al startDate.");
      }
      return true;
    }),

  body("capacity")
    .isInt({ min: 1 })
    .withMessage("La capacidad debe ser un entero mayor o igual a 1."),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El price debe ser un número mayor o igual a 0."),

  body("status")
    .optional()
    .trim()
    .toLowerCase()
    .isIn(["scheduled", "cancelled", "finished"])
    .withMessage('El status debe ser "scheduled", "cancelled" o "finished".'),

  body("location").isObject().withMessage("location debe ser un objeto"),

  body("location.venue")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("El venue debe tener entre 3 y 100 caracteres"),

  body("location.address")
    .trim()
    .isLength({ min: 5, max: 150 })
    .withMessage("El address debe tener entre 5 y 150 caracteres"),

  body("location.city")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("La city debe tener entre 2 y 50 caracteres"),

  body("categories")
    .optional()
    .isArray()
    .withMessage("categories debe ser un array de ids")
    .bail()
    .custom(async (categories) => {
      if (!categories.every((id) => mongoose.isValidObjectId(id))) {
        throw new Error("Hay un id de category con formato inválido");
      }

      const uniqueIds = [...new Set(categories)];
      const count = await CategoryModel.countDocuments({
        _id: { $in: uniqueIds },
      });

      if (count !== uniqueIds.length) {
        throw new Error("Alguna category no existe");
      }
      return true;
    }),
];
