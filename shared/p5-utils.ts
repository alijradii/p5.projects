import type p5 from 'p5';

export function fullscreenCanvas(p: p5): void {
  p.createCanvas(p.windowWidth, p.windowHeight)
}

export function handleResize(p: p5): void {
  p.resizeCanvas(p.windowWidth, p.windowHeight)
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function constrainToCanvas(
  p: p5,
  x: number,
  y: number,
  radius = 0,
): { x: number; y: number } {
  return {
    x: p.constrain(x, radius, p.width - radius),
    y: p.constrain(y, radius, p.height - radius),
  }
}

export const PALETTES = {
  neon: ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec', '#3a86ff'],
  ocean: ['#03045e', '#0077b6', '#00b4d8', '#90e0ef', '#caf0f8'],
  sunset: ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'],
  mono: ['#f8f9fa', '#dee2e6', '#adb5bd', '#495057', '#212529'],
} as const

export type PaletteName = keyof typeof PALETTES

export function randomFromPalette(palette: PaletteName): string {
  const colors = PALETTES[palette]
  return colors[Math.floor(Math.random() * colors.length)]
}

export function randomColor(): string {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}