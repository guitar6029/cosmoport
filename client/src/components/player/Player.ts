import * as PIXI from "pixi.js";

export type Dir = "up" | "down" | "left" | "right";

export class Player {
  view: PIXI.Graphics;
  pos = { x: 0, y: 0 };
  vel = { x: 0, y: 0 };
  speed = 100  // px/sec
  dir: Dir = "down";

  constructor(x: number, y: number) {
    this.pos.x = x;
    this.pos.y = y;

    this.view = new PIXI.Graphics()
      .poly([0, -10, 7, 8, 0, 3, -7, 8])
      .fill(0x00e5ff);

    this.view.position.set(this.pos.x, this.pos.y);
  }

  setDirectionFromVelocity() {
    const { x, y } = this.vel;
    if (Math.abs(x) > Math.abs(y)) this.dir = x > 0 ? "right" : "left";
    else if (Math.abs(y) > 0) this.dir = y > 0 ? "down" : "up";
  }

  update(dtSeconds: number) {
    this.pos.x += this.vel.x * dtSeconds;
    this.pos.y += this.vel.y * dtSeconds;

    //face direction (rotate the player)
    this.setDirectionFromVelocity();
    const rotationByDir: Record<Dir, number> = {
      up: 0,
      right: Math.PI / 2,
      down: Math.PI,
      left: -Math.PI / 2,
    };
    this.view.rotation = rotationByDir[this.dir];

    //apply to view
    this.view.position.set(this.pos.x, this.pos.y);
  }

  destroy() {
    this.view.destroy();
  }
}
