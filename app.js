import express from "express";
import "dotenv/config";
import { startDB } from "./src/config/database.js";

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo en el puerto ${PORT}`);
});
