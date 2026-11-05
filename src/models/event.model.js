import { Model, Schema } from "mongoose";

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 150,
  },
  description: {
    type: String,
    minlength: 20,
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  endDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  price: {
    type: Number,
    minlength: 0,
    default: 0,
  },
  status: {
    type: String,
    enum: ["scheduled", "cancelled", "finished"],
    default: "scheduled",
  },
});

export const EventModel = Model("Event", eventSchema);
