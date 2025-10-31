export const getShipImages = (key: string) => ({
  default: new URL(`../assets/img/ships/${key}.png`, import.meta.url).href,
  side1: new URL(`../assets/img/ships/${key}-1.png`, import.meta.url).href,
  side2: new URL(`../assets/img/ships/${key}-2.png`, import.meta.url).href,
});
