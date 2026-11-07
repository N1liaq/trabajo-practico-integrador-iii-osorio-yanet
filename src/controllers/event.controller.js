import mongoose from "mongoose";
import { EventModel } from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      capacity,
      price,
      status,
      location,
      categories,
    } = req.body;

    const eventId = new mongoose.Types.ObjectId();

    const event = await EventModel.create([
      {
        _id: eventId,
        title,
        description,
        startDate,
        endDate,
        capacity,
        price,
        status,
        location,
        categories,
        organizer: req.user._id,
      },
    ]);

    return res.status(201).json({ data: event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getEventsAll = async (req, res) => {
  try {
    const events = await EventModel.find()
      .populate("organizer", "username email")
      .populate("categories");

    return res.status(200).json({ data: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const events = await EventModel.find({ organizer: req.user._id });

    return res.status(200).json({ data: events });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await EventModel.findById({ _id: id })
      .populate("organizer", "username email")
      .populate("categories");

    if (!event) {
      return res.status(404).json({ msg: "Event no encontrado." });
    }

    return res.status(200).json({ data: event });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      startDate,
      endDate,
      capacity,
      price,
      status,
      location,
      categories,
    } = req.body;

    const updatedEvent = await EventModel.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        startDate,
        endDate,
        capacity,
        price,
        status,
        location,
        categories,
      },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedEvent) {
      return res.status(404).json({ msg: "Event no encontrado." });
    }

    return res.status(200).json({ data: updatedEvent });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await EventModel.findById(id);

    if (!event) {
      return res.status(404).json({ msg: "Event no encontrado." });
    }

    await EventModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Event eliminado correctamente." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
