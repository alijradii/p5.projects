import { Vector2 } from '@shared/math/Vector2';
import { PALETTES, randomBetween, randomFromPalette } from '@shared/p5-utils';
import p5 from 'p5';
import { Canvas } from './canvas';
import { createCircleAnimation } from './circle-animation';
import {
  UI_PANEL_WIDTH,
  getBrushRadius,
  initBrushRadiusInput,
  initColorSwatches,
} from './ui';

const SELECTED_PALETTE_NAME = "pink"
const SELECTED_PALETTE = PALETTES[SELECTED_PALETTE_NAME];

function getCanvasSize(): { w: number; h: number } {
  const container = document.getElementById('canvas-container');
  const fallback = { w: window.innerWidth - UI_PANEL_WIDTH, h: window.innerHeight };
  if (!container) return fallback;
  const w = container.clientWidth || fallback.w;
  const h = container.clientHeight || fallback.h;
  return { w: w > 0 ? w : fallback.w, h: h > 0 ? h : fallback.h };
}

new p5((p: p5) => {
  const canvas = new Canvas(p);
  const start = new Vector2(0, 0);
  let selectedColor: string = SELECTED_PALETTE[0];
  const circleAnimation = createCircleAnimation(p);

  p.setup = () => {
    const { w, h } = getCanvasSize();
    p.createCanvas(w, h).parent('canvas-container');
    p.background(10);

    document.addEventListener('contextmenu', (e) => e.preventDefault());

    initColorSwatches(SELECTED_PALETTE, selectedColor, (color) => {
      selectedColor = color;
    });
    initBrushRadiusInput();

    for (let i = 0; i < 70; i++) {
      const x = randomBetween(0, p.width);
      const y = randomBetween(0, p.height);
      const radius = randomBetween(80, 200);
      const color = randomFromPalette(SELECTED_PALETTE_NAME);
      canvas.addDrop(new Vector2(x, y), radius, color);
    }
  };

  p.draw = () => {
    p.clear();
    p.background(10);
    circleAnimation.update(canvas);
    canvas.draw();
  };

  p.mousePressed = (mouseEvent: MouseEvent) => {
    if (mouseEvent.button === 2) {
      const radius = getBrushRadius();
      const center = new Vector2(p.mouseX, p.mouseY);
      canvas.addDrop(center, radius, selectedColor);
    }

    if (mouseEvent.button === 0) {
      start.x = p.mouseX;
      start.y = p.mouseY;
    }
  };

  p.mouseDragged = () => {
    const end = new Vector2(p.mouseX, p.mouseY);
    end.subtract(start);
    end.normalize();

    if (p.keyIsDown("x")) {
      canvas.vstroke(end, p.mouseX, p.mouseY);
    } else {
      canvas.stroke(end, p.mouseX, p.mouseY);
    }
  };

  p.windowResized = () => {
    const { w, h } = getCanvasSize();
    p.resizeCanvas(w, h);
    p.background(10);
  };
});
