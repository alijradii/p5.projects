import { Vector2 } from '@shared/math/Vector2';
import { randomBetween } from '@shared/p5-utils';
import p5 from 'p5';
import { FlockAgent } from './flock-agent';

export class Flock {
  populationSize: number = 50;
  maxSpeed: number = 2;
  flockAgents: FlockAgent[];

  constructor() {
    this.flockAgents = [];
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

  draw(p: p5) {
    for (const agent of this.flockAgents) {
      agent.draw(p);
    }
  }
}