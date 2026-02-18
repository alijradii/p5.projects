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
        p.circle(this.pos.x, this.pos.y, this.radius * 2);
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

            if (Vector2.manhattanDistance(otherAgent.pos, this.pos)
                > flock.perceptionRadius) continue;

            neighbors.push(otherAgent);
        }

        return neighbors;
    }
}