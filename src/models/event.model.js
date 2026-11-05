import { Model, Schema, Types } from "mongoose";

const eventSchema = new Schema(
  {
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
    location: [locationSchema],
    organizer: { type: Types.ObjectId, ref: "User", required: true },
    categories: [{ type: Types.ObjectId, ref: "Category" }],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const locationSchema = new Schema(
  {
    venue: {
      type: String,
      minlength: 3,
      maxlength: 100,
    },
    address: {
      type: string,
      minlength: 5,
      maxlength: 150,
    },
    city: {
      type: string,
      minlength: 2,
      maxlength: 50,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const EventModel = Model("Event", eventSchema);
