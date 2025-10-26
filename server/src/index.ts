import express from "express";
import dotenv from "dotenv";
import airlinesRouter from "./routes/airlines.routes.js";
import bookingsRouter from "./routes/bookings.routes.js";
import flightsRouter from "./routes/flights.routes.js";
import statsRouter from "./routes/stats.routes.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // parse JSON bodies

app.use("/api/airlines", airlinesRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/flights", flightsRouter);
app.use("/api/stats", statsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
