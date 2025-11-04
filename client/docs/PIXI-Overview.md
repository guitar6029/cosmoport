# PixiJS in This App — How It Works

This guide explains how our Vue app uses PixiJS for rendering, input, and scene updates. It focuses on the practical flow so you can extend or debug quickly.

## Big Picture

- PixiJS renders a 2D scene to a `<canvas>` via `PIXI.Application`.
- A game loop (the Pixi ticker) runs every frame and calls our scene's `update` method.
- We organize game code into "scenes" implementing a tiny interface with `init`, `update`, and `destroy`.
- Vue owns the Pixi Application lifecycle and decides which scene to load.

## Key Pieces

### PixiScene (Vue wrapper)

- Creates and initializes the Pixi `Application`, then appends `app.canvas` into a container div.
- For the "intro" scene, it draws a simple starfield and an animated ship.
- For the "base" scene, it instantiates our scene system (SceneManager + BaseScene) and wires the manager's `tick` to the Pixi ticker.

Where this happens: `client/src/components/game/PixiScene.vue:1`

### SceneManager and IScene

- `IScene` is a simple contract:
  - `init(app)`: create scene contents and attach any listeners
  - `update(dt)`: advance game state each frame
  - `destroy()`: clean up listeners and display objects
- `SceneManager` holds the current scene and exposes `tick(delta)` which forwards to `scene.update(delta)`.

Files:
- `client/src/components/game/engine/IScene.ts:1`
- `client/src/components/game/engine/SceneManager.ts:1`

### BaseScene (movement + input)

- Builds the "landing pad" world: background, pad, a dock console, and the `Player` graphic.
- Registers keyboard listeners on `window` to track keys currently held.
- On each frame, computes a velocity from the keys (WASD + Arrow keys), updates the player position, clamps it within the pad, and rotates the ship to face its travel direction.
- Cleans up its keyboard listeners in `destroy()`.

File: `client/src/components/game/scenes/BaseScene.ts:1`

### Player (display + motion)

- Holds position (`pos`), velocity (`vel`), speed, facing direction, and a `PIXI.Graphics` triangle as its view.
- `update(dtSeconds)` integrates position (`pos += vel * dt`) and rotates the view to match facing direction.

File: `client/src/components/player/Player.ts:1`

## The Frame Loop (Ticker) and Delta Time

- Pixi calls functions added to `app.ticker` every frame.
- Pixi's `ticker.deltaTime` is ~1 at 60fps, ~2 at 30fps, etc.
- In our scenes we convert frames to seconds via `dtSec = dt / 60` so movement math can be in pixels/second.

Flow:
1. PixiScene adds `manager.tick` to `app.ticker` (for the base scene).
2. Pixi calls `manager.tick(delta)` every frame.
3. `SceneManager` forwards `delta` to `currentScene.update(delta)`.
4. `BaseScene.update` computes velocity from input, calls `player.update(dtSec)`, and clamps within bounds.

## Coordinates, Containers, and Graphics

- Coordinate origin is top-left; `x` grows to the right, `y` grows downward.
- We layer content using `PIXI.Container` instances (e.g., world vs UI labels).
- We draw simple shapes via `PIXI.Graphics` with chainable APIs: `rect/roundRect/circle/poly().fill(color)`.
- Rotation is in radians; `Math.PI / 2` = 90°.

Examples from BaseScene:
- Background rectangle fills the screen using `app.renderer.width/height`.
- Landing pad is a rounded rectangle centered on screen.
- Player triangle (`poly([...]).fill(0x00e5ff)`) is positioned by `view.position.set(x, y)` and rotated to face movement.

## Input Handling (WASD / Arrow keys)

- BaseScene listens for `keydown`/`keyup` on `window` and stores active `KeyboardEvent.code`s in a `Set`.
- Mapping uses codes (`KeyW`, `ArrowUp`, etc.) so keyboard layout doesn’t matter.
- Each frame, we translate the held keys to a velocity vector and normalize diagonals so moving diagonally isn’t faster.

Gotchas:
- The page (canvas) must have focus to receive key events.
- Always uninstall listeners in `destroy()` to avoid leaks when switching/unmounting.

## Scene Lifecycle and Cleanup

1. Vue mounts PixiScene and creates the Pixi `Application`.
2. Intro path: draw stars + spin a ship; Base path: create `SceneManager` and `BaseScene`.
3. On unmount, PixiScene removes any attached `ticker` callbacks and destroys the `Application`.
4. `BaseScene.destroy()` removes keyboard listeners and clears stage children.

Why cleanup matters:
- Prevents duplicate listeners after hot reloads or navigation.
- Avoids calling `update` for an inactive scene.

## Adding a New Scene

1. Create a class that implements `IScene` and build your world in `init(app)`.
2. Put time-based logic in `update(dt)`, using `const seconds = dt / 60`.
3. Clean up listeners and graphics in `destroy()`.
4. Switch to it by constructing it in `PixiScene.vue` (or by adding a small scene router around `SceneManager.set(...)`).

Minimal template:

```ts
import * as PIXI from 'pixi.js';
import type { IScene } from '../engine/IScene';

export class MyScene implements IScene {
  private app!: PIXI.Application;
  private world!: PIXI.Container;

  async init(app: PIXI.Application) {
    this.app = app;
    this.world = new PIXI.Container();
    app.stage.addChild(this.world);
    // build display objects here
  }

  update(dt: number) {
    const dtSec = dt / 60;
    // advance game state here
  }

  destroy() {
    // remove listeners, destroy graphics
    this.app.stage.removeChildren();
  }
}
```

## Performance Tips (when you need them)

- Reuse display objects; avoid creating/destroying graphics per frame.
- Batch static visuals into fewer Graphics or convert to textures/sprites if they don’t change.
- Keep per-frame work simple; precompute data when possible.
- Cap resolution (we use `Math.min(devicePixelRatio, 2)`) to balance clarity and perf on high-DPI screens.

## Debugging Checklist

- No movement? Confirm the "base" scene is active so `BaseScene.update` runs.
- Key input not detected? Ensure the page has focus and check codes (`e.code`) in the console.
- Odd movement speed? Remember `dt` is frame-based; convert with `/ 60` when you want seconds.
- Events firing twice? Verify `destroy()` removes listeners and that the ticker callback is removed before destroying the app.

---

With these pieces, you can reason about where to add visuals (Graphics/Containers), where to put logic (scene `update`), and how to switch scenes cleanly using the Vue wrapper and `SceneManager`.

