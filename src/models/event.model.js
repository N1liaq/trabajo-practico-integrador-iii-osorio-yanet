import { model, Schema, Types } from "mongoose";

const locationSchema = new Schema(
  {
    venue: {
      type: String,
      minlength: 3,
      maxlength: 100,
    },
    address: {
      type: String,
      minlength: 5,
      maxlength: 150,
    },
    city: {
      type: String,
      minlength: 2,
      maxlength: 50,
    },
  },
  { _id: false },
);

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
    capacity: {
      type: Number,
      required: true,
      min: 1,
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
    location: locationSchema,
    organizer: { type: Types.ObjectId, ref: "User", required: true },
    categories: [{ type: Types.ObjectId, ref: "Category" }],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const EventModel = model("Event", eventSchema);
