import { arisSprites } from "../sprites/arisSprites";

export const introOutpost = [
  {
    name: "ARIS",
    portrait: arisSprites.neutral,
    text: "Boot sequence complete… Welcome to Outpost-01, Operator.",
  },
  {
    name: "ARIS",
    portrait: arisSprites.smile,
    text: "I'm ARIS—your reconstruction guide. This is a concept simulation, not a full game.",
  },
  {
    name: "ARIS",
    portrait: arisSprites.talkA,
    text: "We'll restore the outpost one system at a time. First, we need base materials.",
  },
  {
    name: "ARIS",
    portrait: arisSprites.concern,
    text: "The core is idle. Without resources, nothing wakes up.",
  },
  {
    name: "ARIS",
    portrait: arisSprites.talkB,
    text: "See the Resources panel? Try Mining Iron. I'll route it to your inventory.",
  },
  {
    name: "ARIS",
    portrait: arisSprites.neutral,
    text: "Watch the HUD: Credits and totals update as you collect.",
  },
  {
    name: "ARIS",
    portrait: arisSprites.smile,
    text: "Once you've got a stack, we'll look at auto-miners and upgrades.",
  },
  {
    name: "ARIS",
    portrait: arisSprites.glitch,
    text: "Signal drift detected… don't worry—that's just the simulation boundaries.",
  },
] as const;
