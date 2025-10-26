// controllers/airlines.controller.ts
import { Request, Response } from "express";

export const getAirlines = async (_req: Request, res: Response) => {
  try {
    const response = await fetch("http://localhost:4001/airlines");
    const airlines = await response.json();
    res.json(airlines);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch airlines" });
  }
};
