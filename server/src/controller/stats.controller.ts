import { Request, Response } from "express";

export const getStats = async (_req: Request, res: Response) => {
  try {
    const response = await fetch("http://localhost:4004/stats");
    const stats = await response.json();
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
