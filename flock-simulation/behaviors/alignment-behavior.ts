import { Vector2 } from "@shared/math/Vector2";
import p5 from "p5";
import { Flock } from "../flock";
import { FlockAgent } from "../flock-agent";
import { AbstractBehavior } from "./abstract-behavior";

export class AlignmentBehavior extends AbstractBehavior {
    steer(agent: FlockAgent, flock: Flock, p: p5, neighbors: FlockAgent[]): Vector2 {
        if (neighbors.length === 0) return new Vector2(0, 0);

        let averageVelocity = new Vector2(0, 0);

        for (const otherAgent of neighbors) {
            averageVelocity.add(otherAgent.velocity);
        }

        averageVelocity.divide(neighbors.length);
        const steer = averageVelocity.subtract(agent.velocity);

        return steer.normalize();
    }
}