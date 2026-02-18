import { Vector2 } from '@shared/math/Vector2';
import { PALETTES, randomBetween, randomFromPalette } from '@shared/p5-utils';
import type p5 from 'p5';
import type { Canvas } from './canvas';

const SELECTED_PALETTE = PALETTES.ocean;

/** Ocean palette indices for 3 alternating colors */
const palette = [SELECTED_PALETTE[0], SELECTED_PALETTE[1], SELECTED_PALETTE[2]] as const;

const CIRCLE_RADIUS = 80;
const FIRST_BATCH = 20;
const TOTAL_CIRCLES = 25;
const FRAMES_PER_CIRCLE = 12;

export function createCircleAnimation(p: p5) {
  let circlesAdded = 0;
  let frameCounter = 0;
  let strokeCount = 0;
  let xOffset = 200;
  let yOffset = 200;

  let bottomLeftCorner: Vector2 = new Vector2(0, 0);
  let bottomRightCorner: Vector2 = new Vector2(0, 0);
  let topLeftCorner: Vector2 = new Vector2(0, 0);
  let topRightCorner: Vector2 = new Vector2(0, 0);

  return {
    update(canvas: Canvas) {
      if (circlesAdded < FIRST_BATCH) {
        frameCounter += 1;
        if (frameCounter >= FRAMES_PER_CIRCLE) {
          frameCounter = 0;
          const x = randomBetween(0, p.width);
          const y = randomBetween(0, p.height);
          const radius = randomBetween(100, 250);
          const color = randomFromPalette('pink');
          canvas.addDrop(new Vector2(x, y), Math.floor(radius / 3), color);

          circlesAdded++;
        }
      } else if (circlesAdded < TOTAL_CIRCLES) {
        frameCounter++;
        if (frameCounter >= FRAMES_PER_CIRCLE) {
          frameCounter = 0;
          const x = p.width / 2;
          const y = p.height / 2;
          const color = palette[circlesAdded % 3];
          canvas.addDrop(new Vector2(x, y), CIRCLE_RADIUS, color);

          // Use actual canvas corners so vertices don't coincide and produce NaN in displace()
          topLeftCorner.x = xOffset;
          topLeftCorner.y = yOffset;
          topRightCorner.x = p.width - xOffset;
          topRightCorner.y = yOffset;
          bottomLeftCorner.x = xOffset;
          bottomLeftCorner.y = p.height - yOffset;
          bottomRightCorner.x = p.width - xOffset;
          bottomRightCorner.y = p.height - yOffset;

          const radius = CIRCLE_RADIUS;
          canvas.addDrop(topLeftCorner, radius, color);
          canvas.addDrop(topRightCorner, radius, color);
          canvas.addDrop(bottomLeftCorner, radius, color);
          canvas.addDrop(bottomRightCorner, radius, color);
          circlesAdded++;
        }
      } else if (strokeCount < 40) {
        const cx = p.width / 2;
        const cy = p.height / 2;
        canvas.vstroke(new Vector2(0, -1), cx, cy);
        strokeCount++;
      } else if (strokeCount < 80) {
        const cy = p.height / 2;
        canvas.vstroke(new Vector2(0, -1), xOffset, cy);
        canvas.vstroke(new Vector2(0, -1), p.width - xOffset, cy);
        strokeCount += 2;
      }
    },
    isComplete(): boolean {
      return circlesAdded >= TOTAL_CIRCLES && strokeCount >= 80;
    },
  };
}
