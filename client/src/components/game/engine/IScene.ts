import type * as PIXI from "pixi.js";
export interface IScene {
  init(app: PIXI.Application): Promise<void> | void;
  update(dt: number): void;
  destroy(): void;
}
