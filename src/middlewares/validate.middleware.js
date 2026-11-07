import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const custom = result.formatWith((err) => {
      return `${err.path}: ${err.msg}`;
    });
    return res.status(400).json(custom.array());
  }
  next();
};
