import express from "express";
import { getBookings } from "../controller/bookings.controller.js";

const router = express.Router();

router.get("/", getBookings); // <-- controller plugged in here

export default router;