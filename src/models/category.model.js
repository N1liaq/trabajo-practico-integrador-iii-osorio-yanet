import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: { type: String, minlength: 2, maxlength: 30, unique: true },
    description: {
      type: String,
      maxlength: 200,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

categorySchema.virtual("events", {
  ref: "Event",
  localField: "_id",
  foreignField: "categories",
});

export const CategoryModel = model("Category", categorySchema);
