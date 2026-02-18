import p5 from 'p5'
import { fullscreenCanvas, handleResize, randomBetween, randomFromPalette } from '@shared/p5-utils'

interface Ball {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

new p5((p: p5) => {
  const balls: Ball[] = []
  const BALL_COUNT = 30

  function createBall(): Ball {
    const radius = randomBetween(8, 30)
    return {
      x: randomBetween(radius, p.width - radius),
      y: randomBetween(radius, p.height - radius),
      vx: randomBetween(-4, 4),
      vy: randomBetween(-4, 4),
      radius,
      color: randomFromPalette('neon'),
    }
  }

  p.setup = () => {
    fullscreenCanvas(p)
    for (let i = 0; i < BALL_COUNT; i++) {
      balls.push(createBall())
    }
  }

  p.draw = () => {
    p.background(10, 10, 10, 40)

    for (const ball of balls) {
      ball.x += ball.vx
      ball.y += ball.vy

      if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= p.width) {
        ball.vx *= -1
        ball.x = p.constrain(ball.x, ball.radius, p.width - ball.radius)
      }
      if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= p.height) {
        ball.vy *= -1
        ball.y = p.constrain(ball.y, ball.radius, p.height - ball.radius)
      }

      p.noStroke()
      p.fill(ball.color + '80')
      p.circle(ball.x, ball.y, ball.radius * 2.5)
      p.fill(ball.color)
      p.circle(ball.x, ball.y, ball.radius * 2)
    }
  }

  p.windowResized = () => handleResize(p)
})
