import express from "express";
import "dotenv/config";
import { startDB } from "./src/config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { authRouter } from "./src/routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.use("/api/auth", authRouter);

app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo en el puerto ${PORT}`);
});
