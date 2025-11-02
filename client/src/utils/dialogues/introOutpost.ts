import { arisSprites } from "../sprites/arisSprites";

export const introOutpost = [
  {
    name: "ARIS",
    portrait: arisSprites.glitch,
    text: "Warning—core temperature rising! Hull integrity at 42%.",
  },
  {
    name: "ARIS",
    portrait: arisSprites.concern,
    text: "Main thrusters offline… we’re losing altitude, Operator.",
  },
  {
    name: "ARIS",
    portrait: arisSprites.neutral,
    text: "Scanning for emergency landing zones…",
  },
  {
    name: "ARIS",
    portrait: arisSprites.neutral,
    text: "Nearest viable site detected—Outpost-01. It’s still active!",
  },
  {
    name: "ARIS",
    portrait: arisSprites.concern,
    text: "Brace for impact. Diverting remaining power to stabilizers—hang on!",
  },
  {
    name: "ARIS",
    portrait: arisSprites.neutral,
    text: "…Landing sequence complete. Systems at minimal capacity, but we’re down.",
  },
  {
    name: "ARIS",
    portrait: arisSprites.think,
    text: "We made it to Outpost-01. I’ll start diagnostics while you catch your breath.",
  },
  {
    name: "ARIS",
    portrait: arisSprites.think,
    text: "Engines are fried, but with some materials from the nearby mines, we can rebuild.",
  },
] as const;
