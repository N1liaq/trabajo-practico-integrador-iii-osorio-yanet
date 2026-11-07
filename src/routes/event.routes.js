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

export const eventRouter = Router();

eventRouter.post("/events", authMiddleware, createEvent);
eventRouter.get("/events", authMiddleware, getEventsAll);
eventRouter.get("/events/my", authMiddleware, getMyEvents);
eventRouter.get("/events/:id", authMiddleware, getEventById);
eventRouter.put(
  "/events/:id",
  authMiddleware,
  ownerOrAdminMiddleware,
  updateEvent,
);
eventRouter.delete(
  "/events/:id",
  authMiddleware,
  ownerOrAdminMiddleware,
  deleteEvent,
);
