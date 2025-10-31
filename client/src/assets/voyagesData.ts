import type { Voyage } from "../types/Voyage";

//import all images
import crimsonRift from "./img/cosmoport/crimson_rift.jpg";
import eosDrift from "./img/cosmoport/eos_drift.jpg";
import projectHorizon from "./img/cosmoport/project_horizon.jpg";
import ophirBeltConvoy from "./img/cosmoport/ophir_belt_convoy.jpg";
import silentMoon from "./img/cosmoport/silent_moon.jpg";
import stellarBloom from "./img/cosmoport/stellar_bloom.jpg";
import echoesOfTitan from "./img/cosmoport/echoes_of_titan.jpg";
import novaDawn from "./img/cosmoport/nova_dawn.jpg";
import blackStarRun from "./img/cosmoport/black_star_run.jpg";
import auroraRelay from "./img/cosmoport/aurora_relay.jpg";

export const voyagesData: Voyage[] = [
  {
    id: 1,
    name: "The Crimson Rift",
    description:
      "A recent rift anomaly has opened near the Vega sector. Explorers are invited to collect readings before it collapses.",
    origin: "Vega Station",
    destination: "Crimson Rift Zone",
    difficulty: "Hard",
    recommendedShip: "Explorer",
    reward: 4200,
    durationMinutes: 15,
    imageUrl: crimsonRift,
  },
  {
    id: 2,
    name: "Eos Drift",
    description:
      "A golden nebula filled with mineral-rich fragments drifts through uncharted space. Survey and collect samples.",
    origin: "Nova Base",
    destination: "Eos Nebula",
    difficulty: "Moderate",
    recommendedShip: "Freighter",
    reward: 2700,
    durationMinutes: 12,
    imageUrl: eosDrift,
  },
  {
    id: 3,
    name: "Project Horizon",
    description:
      "Assist in the final phase of a planetary terraforming experiment. Atmospheric stabilizers need recalibration.",
    origin: "Horizon Command",
    destination: "Aurelia IV",
    difficulty: "Moderate",
    recommendedShip: "Scout",
    reward: 3000,
    durationMinutes: 10,
    imageUrl: projectHorizon,
  },
  {
    id: 4,
    name: "Ophir Belt Convoy",
    description:
      "Escort mining vessels through the dense Ophir asteroid belt. Expect minor debris and potential pirate interference.",
    origin: "Titan Outpost",
    destination: "Ophir Belt",
    difficulty: "Hard",
    recommendedShip: "Fighter",
    reward: 4800,
    durationMinutes: 15,
    imageUrl: ophirBeltConvoy,
  },
  {
    id: 5,
    name: "The Silent Moon",
    description:
      "An abandoned moon colony has reactivated a distress signal. Investigate and recover any surviving data cores.",
    origin: "Eden Station",
    destination: "Lunaris IX",
    difficulty: "Moderate",
    recommendedShip: "Explorer",
    reward: 3500,
    durationMinutes: 13,
    imageUrl: silentMoon,
  },
  {
    id: 6,
    name: "Stellar Bloom",
    description:
      "A strange bioluminescent growth has appeared near a pulsar field. Collect organic samples for research.",
    origin: "Helix Port",
    destination: "Pulsar Verge",
    difficulty: "Easy",
    recommendedShip: "Scout",
    reward: 1900,
    durationMinutes: 10,
    imageUrl: stellarBloom,
  },
  {
    id: 7,
    name: "Echoes of Titan",
    description:
      "Ancient alien ruins beneath Titan's ice crust have started transmitting faint energy signals.",
    origin: "Sol Relay 03",
    destination: "Titan Subsurface Site",
    difficulty: "Hard",
    recommendedShip: "Explorer",
    reward: 4500,
    durationMinutes: 14,
    imageUrl: echoesOfTitan,
  },
  {
    id: 8,
    name: "Nova Dawn",
    description:
      "A colony ship sustained damage during its descent. Deliver aid and help stabilize life-support systems.",
    origin: "Nova Command",
    destination: "Dawn Colony",
    difficulty: "Easy",
    recommendedShip: "Freighter",
    reward: 2200,
    durationMinutes: 11,
    imageUrl: novaDawn,
  },
  {
    id: 9,
    name: "Black Star Run",
    description:
      "A high-speed hyperspace test route through the Black Star region. Precision flying and nerves of steel required.",
    origin: "Black Star Gate",
    destination: "Outer Rim Track",
    difficulty: "Hard",
    recommendedShip: "Fighter",
    reward: 5000,
    durationMinutes: 15,
    imageUrl: blackStarRun,
  },
  {
    id: 10,
    name: "Aurora Relay",
    description:
      "Assist in recalibrating communication beacons within the Aurora sector. Minimal risk, high tech reward.",
    origin: "Aurora Station",
    destination: "Relay Network Cluster",
    difficulty: "Easy",
    recommendedShip: "Scout",
    reward: 2000,
    durationMinutes: 10,
    imageUrl: auroraRelay,
  },
];
