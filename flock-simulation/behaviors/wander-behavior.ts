import { Vector2 } from "@shared/math/Vector2";
import { randomBetween } from "@shared/p5-utils";
import p5 from "p5";
import { Flock } from "../flock";
import { FlockAgent } from "../flock-agent";
import { AbstractBehavior } from "./abstract-behavior";

export class WanderBehavior extends AbstractBehavior {
    circleDistance: number = 20;
    circleRadius: number = 30;
    angleChange: number = 30;

    constructor(
        weight: number,
    ) {
        super(weight);
    }

    steer(agent: FlockAgent, _flock: Flock, p: p5, _neighbors: FlockAgent[]): Vector2 {
        const velocity = agent.velocity.copy();
        const circleCenter = velocity.copy().normalize().multiply(this.circleDistance);

        agent.wanderAngle += randomBetween(-this.angleChange, this.angleChange);

        const displacement = new Vector2(
            Math.cos(agent.wanderAngle),
            Math.sin(agent.wanderAngle)
        ).multiply(this.circleRadius);

        const steer = circleCenter.add(displacement, false).normalize();

        return steer;
    }
}
