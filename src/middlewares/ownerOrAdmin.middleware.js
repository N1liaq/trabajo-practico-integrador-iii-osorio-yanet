import { EventModel } from "../models/event.model.js";

export const ownerOrAdminMiddleware = async (req, res, next) => {
  try {
    if (req.user.role === "admin") return next();

    const event = await EventModel.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ msg: "Evento no encontrado" });
    }

    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        msg: "Acceso denegado.",
      });
    }

    next();
  } catch (error) {
    return res.status(400).json({ msg: "ID de evento inválido" });
  }
};
