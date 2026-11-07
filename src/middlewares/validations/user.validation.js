import { body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const userValidation = [
  body("username")
    .notEmpty()
    .withMessage("El username no debe ser vacío.")
    .isAlphanumeric()
    .withMessage("El username solo puede tener letras y números.")
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 a 20 carácteres.")
    .custom(async (username) => {
      const usernameExists = await UserModel.findOne({ username });
      if (usernameExists) {
        throw new Error("El username ingresado ya está en uso.");
      }
      return true;
    }),

  body("email")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("El email no debe ser vacío.")
    .isEmail()
    .withMessage("Debe ingresar un email válido.")
    .custom(async (email) => {
      const emailExists = await UserModel.findOne({ email });
      if (emailExists) {
        throw new Error("El email ingresado ya está en uso.");
      }

      const atIndex = email.indexOf("@");
      const localPart = email.slice(0, atIndex);
      if (localPart.includes("+") || localPart.includes(".")) {
        throw new Error("No se permiten puntos ni signo + antes del @.");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("La password no debe ser vacía.")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    })
    .withMessage(
      "La password debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número.",
    ),

  body("role")
    .optional()
    .trim()
    .toLowerCase()
    .custom((role) => {
      const validRoles = ["user", "admin"];
      if (!validRoles.includes(role)) {
        throw new Error(
          `El rol '${role}' no es válido. Los roles permitidos son "user" o "admin".`,
        );
      }
      return true;
    }),

  body("profile").isObject().withMessage("profile debe ser un objeto"),

  body("profile.firstName")
    .notEmpty()
    .withMessage("El firstName no debe ser vacío.")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El firstName debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]+$/)
    .withMessage("El firstName solo puede tener letras."),

  ,
  body("profile.lastName")
    .notEmpty()
    .withMessage("El lastName no debe ser vacío.")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El lastName debe tener entre 2 y 50 caracteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ ]+$/)
    .withMessage("El firstName solo puede tener letras."),

  ,
  body("profile.birthDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha de nacimiento no es válida")
    .bail()
    .custom((birthDate) => {
      if (new Date(birthDate) > new Date()) {
        throw new Error("La fecha de nacimiento no puede ser futura.");
      }
      return true;
    }),

  ,
  body("profile.phone")
    .optional()
    .matches(/^\d{8,15}$/)
    .withMessage("El phone debe tener solo números, entre 8 y 15 dígitos."),
];
