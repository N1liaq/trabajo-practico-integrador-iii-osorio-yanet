import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 20,
      match: /^[a-zA-Z0-9]+$/,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },

    password: { type: String, select: false },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile: [profileSchema],
  },

  {
    versionKey: false,
    timestamps: true,
  },
);

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
    },
    birthDate: {
      type: Date,
      default: Date.now,
    },
    phone: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const UserModel = model("User", userSchema);
