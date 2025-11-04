# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## PIXI Integration (Summary)

- Wrapper component `client/src/components/game/PixiScene.vue:1` creates a `PIXI.Application`, appends its canvas, and decides which scene to show.
- For the intro, PixiScene draws a simple starfield and an animated ship.
- For the base scene, PixiScene uses a tiny scene system:
  - `IScene` interface: `client/src/components/game/engine/IScene.ts:1`
  - `SceneManager` manages the current scene and forwards ticker updates: `client/src/components/game/engine/SceneManager.ts:1`
  - `BaseScene` implements input + movement and renders the landing pad: `client/src/components/game/scenes/BaseScene.ts:1`
- The Pixi ticker calls `SceneManager.tick(delta)` every frame; `delta` is ~1 at 60fps. Scenes convert to seconds with `delta / 60`.
- Keyboard input (WASD/Arrows) is handled inside `BaseScene` via window `keydown/keyup`, updating the `Player` each frame.
- Always remove listeners/ticker callbacks on unmount; this is handled in `PixiScene` and `BaseScene.destroy()`.

More detailed notes: `client/docs/PIXI-Overview.md`
