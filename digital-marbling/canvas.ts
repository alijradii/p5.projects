import type { Vector2 } from "@shared/math/Vector2";
import type p5 from "p5";
import { Drop } from "./drop";

export class Canvas {
    p: p5;
    drops: Drop[] = [];
    defaultDropRadius = 200;

    constructor(p: p5) {
        this.p = p;
    }

    addDrop(center: Vector2, radius: number, color: string,) {
        const drop = new Drop(center, radius, color);

        for (const otherDrop of this.drops) {
            otherDrop.displace(drop);
        }

        this.drops.push(drop);
    }

    draw() {
        for (const drop of this.drops) {
            drop.draw(this.p);
        }
    }
}