import type * as PIXI from "pixi.js";
import type { IScene } from "./IScene";

export class SceneManager {
    private app: PIXI.Application;
    private current?: IScene;

    constructor(app: PIXI.Application) {
        this.app = app
    }

    async set(scene: IScene) {
        this.current?.destroy();
        this.current = scene;
        await this.current.init(this.app);
    }

    tick = (delta: number) => {
        this.current?.update(delta);
    }
}