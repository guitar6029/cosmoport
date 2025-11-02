<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { onMounted, onBeforeUnmount, ref } from 'vue';

const containerRef = ref<HTMLDivElement | null>(null);
let app: PIXI.Application | null = null;
let starLayer!: PIXI.Container;
let ship!: PIXI.Graphics;

onMounted(async () => {
  // Wrap init in async IIFE to avoid top-level await issues in some Vite builds
  app = new PIXI.Application();
  await app.init({
    resizeTo: containerRef.value!,          // auto-resize to wrapper
    resolution: Math.min(window.devicePixelRatio || 1, 2), // cap DPR a bit
    backgroundColor: 0x000000,
    antialias: false,
    powerPreference: 'high-performance',
  });
  containerRef.value!.appendChild(app.canvas);

  // Layers
  starLayer = new PIXI.Container();
  app.stage.addChild(starLayer);

  // Simple starfield (two parallax layers later)
  const makeStars = (n: number, alpha = 1) => {
    const g = new PIXI.Graphics();
    for (let i = 0; i < n; i++) {
      const x = Math.random() * app!.renderer.width;
      const y = Math.random() * app!.renderer.height;
      g.circle(x, y, 1).fill({ color: 0xffffff, alpha });
    }
    starLayer.addChild(g);
  };
  makeStars(200, 0.6);
  makeStars(100, 1.0);

  // Placeholder ship in center (use a real sprite later)
  ship = new PIXI.Graphics()
    .poly([0, -12, 8, 10, 0, 5, -8, 10]) // tiny triangle
    .fill(0x00e5ff);
  ship.x = app.renderer.width / 2;
  ship.y = app.renderer.height / 2;
  app.stage.addChild(ship);

  // Tiny “emergency arrival” vibe: slow spin + faint pulse
  let t = 0;
  app.ticker.add((delta) => {
    t += delta / 60;
    ship.rotation += 0.01 * delta;
    const s = 1 + Math.sin(t * 2) * 0.02;
    ship.scale.set(s, s);
  });
});

onBeforeUnmount(() => {
  if (app) {
    app.destroy(true); // cleans ticker, textures, events
    app = null;
  }
});
</script>

<template>
  <div ref="containerRef" class="w-full h-dvh"></div>
</template>
