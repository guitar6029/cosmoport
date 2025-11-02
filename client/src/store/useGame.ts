import { defineStore } from "pinia";

export const useGame = defineStore("game", {
  state: () => ({
    scene: "intro" as "intro" | "dock", // later: 'travel', 'mining', etc.
    credits: 0,
    inventory: { ore: 0 },
     seenDockIntro: false, 
    saveVersion: 1,
  }),
});
