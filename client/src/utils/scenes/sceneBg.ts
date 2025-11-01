export const sceneBackground = {
  intro_outpost: new URL("../../assets/img/scenes/intro_outpost.jpg", import.meta.url)
    .href,
  chapter1_power: new URL("../../assets/img/scenes/reactor_bay.jpg", import.meta.url)
    .href,
  chapter2_mining: new URL("../../assets/img/scenes/mining_zone.jpg", import.meta.url)
    .href,
  chapter3_comms: new URL("../../assets/img/scenes/comms_tower.jpg", import.meta.url)
    .href,
  chapter4_dock: new URL("../../assets/img/scenes/dock_hangar.jpg", import.meta.url)
    .href,
  chapter5_market: new URL(
    "../../assets/img/scenes/market_corridor.jpg",
    import.meta.url
  ).href,
} as const;
