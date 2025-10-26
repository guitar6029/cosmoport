// routes/airlines.routes.ts
import express from "express";
import { getAirlines } from "../controller/airlines.controller.js";

const router = express.Router();

router.get("/", getAirlines); // <-- controller plugged in here

export default router;
