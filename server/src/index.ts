import express from "express";
import dotenv from "dotenv";
import airlinesRouter from "./routes/airlines.routes.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // parse JSON bodies


app.use("/api/airlines", airlinesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
