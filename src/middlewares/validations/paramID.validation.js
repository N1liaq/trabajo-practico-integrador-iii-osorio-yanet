import { param } from "express-validator";

export const paramIDValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID del user no debe ser nulo.")
    .isMongoId()
    .withMessage("El ID debe ser un MongoID válido."),
];
