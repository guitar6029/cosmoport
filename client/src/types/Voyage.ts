export interface Voyage {
  id: number;
  name: string;
  description: string;
  origin: string;
  destination: string;
  difficulty: "Easy" | "Moderate" | "Hard";
  recommendedShip: "Scout" | "Freighter" | "Explorer" | "Fighter";
  reward: string;
  durationMinutes: number;
  status?: "available" | "in-progress" | "completed";
  imageUrl: string;
}
