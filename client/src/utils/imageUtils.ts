/**
 * Returns an object containing URLs of ship images based on its ID.
 * The object contains three properties: default, side1, and side2.
 * @param {string} key The ID of the ship.
 * @returns {Object} An object containing URLs of ship images.
 * @example
 * const images = getShipImages('starling-courier');
 * console.log(images.default); // URL of the default ship image
 * console.log(images.side1); // URL of the side1 ship image
 * console.log(images.side2); // URL of the side2 ship image
 */
export const getShipImages = (key: string) => ({
  default: new URL(`../assets/img/ships/${key}.png`, import.meta.url).href,
  side1: new URL(`../assets/img/ships/${key}-1.png`, import.meta.url).href,
  side2: new URL(`../assets/img/ships/${key}-2.png`, import.meta.url).href,
});

/**
 * Returns the URL of an item image based on its ID.
 * @param {string} id The ID of the item.
 * @returns {string} The URL of the item image.
 */
export const getItemImages = (id: string | null) => {
  if (!id) return "";
  const url = new URL(`../assets/img/items/${id}.jpg`, import.meta.url);
  return url.toString();
};
