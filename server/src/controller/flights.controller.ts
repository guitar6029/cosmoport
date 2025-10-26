import { Request, Response } from "express";

export const getFlights = async (_req: Request, res: Response) => {
  try {
    const response = await fetch("http://localhost:4003/flights");
    const flights = await response.json();
    res.json(flights);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
};
