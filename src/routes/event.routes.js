import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createEvent,
  deleteEvent,
  getEventById,
  getEventsAll,
  getMyEvents,
  updateEvent,
} from "../controllers/event.controller.js";
import { ownerOrAdminMiddleware } from "../middlewares/ownerOrAdmin.middleware.js";
import { eventValidator } from "../middlewares/validations/event.validation.js";
import { validate } from "../middlewares/validate.middleware.js";
import { paramIDValidation } from "../middlewares/validations/paramID.validation.js";

export const eventRouter = Router();

eventRouter.post(
  "/events",
  authMiddleware,
  eventValidator,
  validate,
  createEvent,
);
eventRouter.get("/events", authMiddleware, validate, getEventsAll);
eventRouter.get("/events/my", authMiddleware, validate, getMyEvents);
eventRouter.get(
  "/events/:id",
  authMiddleware,
  paramIDValidation,
  validate,
  getEventById,
);
eventRouter.put(
  "/events/:id",
  authMiddleware,
  ownerOrAdminMiddleware,
  paramIDValidation,
  eventValidator,
  validate,
  updateEvent,
);
eventRouter.delete(
  "/events/:id",
  authMiddleware,
  ownerOrAdminMiddleware,
  paramIDValidation,
  validate,
  deleteEvent,
);
