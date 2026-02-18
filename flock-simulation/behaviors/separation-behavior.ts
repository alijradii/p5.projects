import { Vector2 } from "@shared/math/Vector2";
import p5 from "p5";
import type { Flock } from "../flock";
import type { FlockAgent } from "../flock-agent";
import { AbstractBehavior } from "./abstract-behavior";

export class SeparationBehavior extends AbstractBehavior {
    steer(agent: FlockAgent, flock: Flock, p: p5, neighbors: FlockAgent[]): Vector2 {
        if (neighbors.length == 0) return new Vector2(0, 0);

        let count = 0;
        let steer = new Vector2(0, 0);

        for (const otherAgent of neighbors) {
            const distance = Vector2.euclideanDistance(agent.pos, otherAgent.pos);

            if (distance > flock.avoidanceRadius) {
                continue;
            }

            count++;

            const difference = agent.pos.subtract(otherAgent.pos, false);
            difference.normalize();
            difference.divide(distance);

            steer.add(difference);
        }

        if (count == 0) return new Vector2(0, 0);

        steer.normalize();

        return steer;
    }
}