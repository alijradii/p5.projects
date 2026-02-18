import { Vector2 } from "@shared/math/Vector2";
import p5 from "p5";
import { Flock } from "../flock";
import { FlockAgent } from "../flock-agent";

export abstract class AbstractBehavior {
    weight: number;

    constructor(weight: number) {
        this.weight = weight;
    }

    abstract steer(agent: FlockAgent, flock: Flock, p: p5, neighbors: FlockAgent[]): Vector2;
}