import "dotenv/config";
import mongoose from "mongoose";

const mongoDB = process.env.MONGODB_URI;

export const startDB = async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log("Conectado a la db correctamente");
  } catch (error) {
    console.log("No se pudo conectar a la db", error);
  }
};
