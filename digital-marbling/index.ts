import { Vector2 } from '@shared/math/Vector2';
import { PALETTES, randomBetween, randomFromPalette } from '@shared/p5-utils';
import p5 from 'p5';
import { Canvas } from './canvas';

const UI_PANEL_WIDTH = 220;
const OCEAN = PALETTES.ocean;

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
  let selectedColor: string = OCEAN[0];

  p.setup = () => {
    const { w, h } = getCanvasSize();
    p.createCanvas(w, h).parent('canvas-container');
    p.background(10);

    document.addEventListener('contextmenu', (e) => e.preventDefault());

    const swatchesEl = document.getElementById('color-swatches');
    if (swatchesEl) {
      OCEAN.forEach((color) => {
        const swatch = document.createElement('button');
        swatch.type = 'button';
        swatch.className = 'color-swatch' + (color === selectedColor ? ' selected' : '');
        swatch.style.background = color;
        swatch.setAttribute('aria-label', `Pick color ${color}`);
        swatch.addEventListener('click', () => {
          selectedColor = color;
          swatchesEl.querySelectorAll('.color-swatch').forEach((s) => s.classList.remove('selected'));
          swatch.classList.add('selected');
        });
        swatchesEl.appendChild(swatch);
      });
    }

    const radiusInput = document.getElementById('brush-radius') as HTMLInputElement;
    const radiusValue = document.getElementById('brush-radius-value');
    if (radiusInput && radiusValue) {
      const updateLabel = () => {
        radiusValue.textContent = radiusInput.value;
      };
      radiusInput.addEventListener('input', updateLabel);
      updateLabel();
    }

    for (let i = 0; i < 70; i++) {
      const x = randomBetween(0, p.width);
      const y = randomBetween(0, p.height);
      const radius = randomBetween(80, 200);
      const color = randomFromPalette('ocean');
      canvas.addDrop(new Vector2(x, y), radius, color);
    }
  };

  p.draw = () => {
    p.clear();
    p.background(10);
    canvas.draw();
  };

  p.mousePressed = (mouseEvent: MouseEvent) => {
    if (mouseEvent.button === 2) {
      const radiusInput = document.getElementById('brush-radius') as HTMLInputElement;
      const radius = radiusInput ? Number(radiusInput.value) : 200;
      const center = new Vector2(p.mouseX, p.mouseY);
      canvas.addDrop(center, radius, selectedColor);
    }
  };

  p.windowResized = () => {
    const { w, h } = getCanvasSize();
    p.resizeCanvas(w, h);
    p.background(10);
  };
});
