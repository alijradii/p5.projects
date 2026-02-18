import { Vector2 } from "@shared/math/Vector2";
import p5 from "p5";
import type { Flock } from "../flock";
import type { FlockAgent } from "../flock-agent";
import { AbstractBehavior } from "./abstract-behavior";

export class CohesionBehavior extends AbstractBehavior {
    steer(agent: FlockAgent, flock: Flock, p: p5, neighbors: FlockAgent[]): Vector2 {
        if (neighbors.length === 0) return new Vector2(0, 0);

        let averagePosition = new Vector2(0, 0);

        for (const otherAgent of neighbors) {
            averagePosition.add(otherAgent.pos);
        }

        averagePosition.divide(neighbors.length);

        const steer = averagePosition.subtract(agent.pos);
        return steer.normalize();
    }
}