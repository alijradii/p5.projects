export const UI_PANEL_WIDTH = 220;

export function initColorSwatches(
  palette: readonly string[],
  initialColor: string,
  onSelect: (color: string) => void
): void {
  const swatchesEl = document.getElementById('color-swatches');
  if (!swatchesEl) return;

  palette.forEach((color) => {
    const swatch = document.createElement('button');
    swatch.type = 'button';
    swatch.className = 'color-swatch' + (color === initialColor ? ' selected' : '');
    swatch.style.background = color;
    swatch.setAttribute('aria-label', `Pick color ${color}`);
    swatch.addEventListener('click', () => {
      onSelect(color);
      swatchesEl.querySelectorAll('.color-swatch').forEach((s) => s.classList.remove('selected'));
      swatch.classList.add('selected');
    });
    swatchesEl.appendChild(swatch);
  });
}

export function initBrushRadiusInput(): void {
  const radiusInput = document.getElementById('brush-radius') as HTMLInputElement;
  const radiusValue = document.getElementById('brush-radius-value');
  if (!radiusInput || !radiusValue) return;

  const updateLabel = () => {
    radiusValue.textContent = radiusInput.value;
  };
  radiusInput.addEventListener('input', updateLabel);
  updateLabel();
}

export function getBrushRadius(): number {
  const radiusInput = document.getElementById('brush-radius') as HTMLInputElement;
  return radiusInput ? Number(radiusInput.value) : 200;
}
