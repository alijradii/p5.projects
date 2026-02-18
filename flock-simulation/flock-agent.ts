import { Vector2 } from '@shared/math/Vector2';
import { randomFromPalette } from '@shared/p5-utils';
import p5 from 'p5';
import type { Flock } from './flock';

export class FlockAgent {
    public pos: Vector2;
    public velocity: Vector2;
    public acceleration: Vector2;
    public radius: number;
    public color: string;

    constructor(
        pos: Vector2,
    ) {
        this.pos = pos;
        this.velocity = new Vector2(0, 0);
        this.acceleration = new Vector2(0, 0);
        this.radius = 5;
        this.color = randomFromPalette('neon');
    }

    draw(p: p5) {
        p.noStroke();
        p.fill(this.color);

        const angle =
            this.velocity.x !== 0 || this.velocity.y !== 0
                ? Math.atan2(this.velocity.y, this.velocity.x)
                : 0;

        const r = this.radius;
        const nose = r * 1.5;
        const tail = -r;
        const wing = r;

        p.push();
        p.translate(this.pos.x, this.pos.y);
        p.rotate(angle);
        p.triangle(nose, 0, tail, wing, tail, -wing);
        p.pop();
    }

    update(p: p5) {
        this.wrapAround(p);
    }

    wrapAround(p: p5) {
        if (this.pos.x > p.width) {
            this.pos.x = 0;
        }
        if (this.pos.x < 0) {
            this.pos.x = p.width;
        }
        if (this.pos.y > p.height) {
            this.pos.y = 0;
        }
        if (this.pos.y < 0) {
            this.pos.y = p.height;
        }
    }

    getNeighbors(flock: Flock): FlockAgent[] {
        const neighbors: FlockAgent[] = [];

        for (const otherAgent of flock.flockAgents) {
            if (otherAgent === this) continue;

            if (Vector2.euclideanDistance(otherAgent.pos, this.pos)
                > flock.perceptionRadius) continue;

            neighbors.push(otherAgent);
        }

        return neighbors;
    }
}