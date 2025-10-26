import { Request, Response } from "express";


export const getBookings = async (_req: Request, res: Response) => {
    try {
        const response = await fetch("http://localhost:4002/bookings");
        const bookings = await response.json();
        res.json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
};