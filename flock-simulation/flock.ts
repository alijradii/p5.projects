import { Vector2 } from '@shared/math/Vector2';
import { randomBetween } from '@shared/p5-utils';
import p5 from 'p5';
import type { AbstractBehavior } from './behaviors/abstract-behavior';
import { AlignmentBehavior } from './behaviors/alignment-behavior';
import { CohesionBehavior } from './behaviors/cohesoin-behavior';
import { SeparationBehavior } from './behaviors/separation-behavior';
import { FlockAgent } from './flock-agent';

export class Flock {
  populationSize: number = 50;
  maxForce: number = 0.2;
  maxSpeed: number = 2;

  public flockAgents: FlockAgent[];
  flockBehaviors: AbstractBehavior[] = [];

  public perceptionRadius: number = 90;
  public avoidanceRadius: number = 30;

  constructor() {
    this.flockAgents = [];

    this.flockBehaviors.push(new AlignmentBehavior(0.7));
    this.flockBehaviors.push(new CohesionBehavior(0.5));
    this.flockBehaviors.push(new SeparationBehavior(0.8));
  }

  initAgents(p: p5) {
    for (let i = 0; i < this.populationSize; i++) {
      const agent = new FlockAgent(
        new Vector2(randomBetween(0, p.width), randomBetween(0, p.height)),
      );

      agent.velocity = Vector2.randomNormalized().multiply(this.maxSpeed);
      this.flockAgents.push(agent);
    }
  }

  update(p: p5) {
    for (const agent of this.flockAgents) {
      const neighbors = agent.getNeighbors(this);

      for (const behavior of this.flockBehaviors) {
        const steer = behavior.steer(agent, this, p, neighbors);

        agent.acceleration.add(steer);
      }

      agent.acceleration.limit(this.maxForce);
      agent.velocity.add(agent.acceleration);
      agent.velocity.limit(this.maxSpeed);

      agent.pos.add(agent.velocity);

      agent.acceleration.multiply(0);
      agent.update(p);
    }
  }

  draw(p: p5) {
    for (const agent of this.flockAgents) {
      agent.draw(p);
    }
  }
}