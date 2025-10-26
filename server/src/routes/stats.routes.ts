import express from "express";
import { getFlights } from "../controller/flights.controller.js";

const router = express.Router();

router.get("/", getFlights); // <-- controller plugged in here

export default router;