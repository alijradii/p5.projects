import p5 from 'p5'
import { fullscreenCanvas, handleResize, randomFromPalette } from '@shared/p5-utils'

interface Particle {
  pos: p5.Vector
  vel: p5.Vector
  acc: p5.Vector
  prevPos: p5.Vector
  color: string
  maxSpeed: number
}

new p5((p: p5) => {
  const particles: Particle[] = []
  const PARTICLE_COUNT = 800
  const NOISE_SCALE = 0.005
  const FORCE_MAG = 0.5
  let zOff = 0

  function createParticle(): Particle {
    const pos = p.createVector(p.random(p.width), p.random(p.height))
    return {
      pos,
      vel: p.createVector(0, 0),
      acc: p.createVector(0, 0),
      prevPos: pos.copy(),
      color: randomFromPalette('sunset'),
      maxSpeed: p.random(1, 4),
    }
  }

  function updateParticle(pt: Particle): void {
    pt.prevPos.set(pt.pos)

    const angle =
      p.noise(pt.pos.x * NOISE_SCALE, pt.pos.y * NOISE_SCALE, zOff) *
      p.TWO_PI *
      2
    const force = p.createVector(p.cos(angle), p.sin(angle)).mult(FORCE_MAG)

    pt.acc.add(force)
    pt.vel.add(pt.acc)
    pt.vel.limit(pt.maxSpeed)
    pt.pos.add(pt.vel)
    pt.acc.mult(0)

    if (pt.pos.x > p.width) { pt.pos.x = 0; pt.prevPos.set(pt.pos) }
    if (pt.pos.x < 0) { pt.pos.x = p.width; pt.prevPos.set(pt.pos) }
    if (pt.pos.y > p.height) { pt.pos.y = 0; pt.prevPos.set(pt.pos) }
    if (pt.pos.y < 0) { pt.pos.y = p.height; pt.prevPos.set(pt.pos) }
  }

  p.setup = () => {
    fullscreenCanvas(p)
    p.background(10)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle())
    }
  }

  p.draw = () => {
    for (const pt of particles) {
      updateParticle(pt)
      p.stroke(pt.color + '18')
      p.strokeWeight(1.5)
      p.line(pt.prevPos.x, pt.prevPos.y, pt.pos.x, pt.pos.y)
    }
    zOff += 0.001
  }

  p.windowResized = () => {
    handleResize(p)
    p.background(10)
  }
})
