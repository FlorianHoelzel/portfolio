export interface CorruptionPoint { x: number; y: number; life: number }
const GLYPHS = '01{}[]<>/\\|!?$%&#@*+=:;';
const SHADING = '.:-=+*#%@';

// Stable spatial noise gives damaged regions a shape; time only changes their data.
function noise(x: number, y: number, frame = 0) {
  const value = Math.sin(x * 127.1 + y * 311.7 + frame * 74.7) * 43758.5453;
  return value - Math.floor(value);
}

export function createCursorCorruption(target: HTMLElement, direction: 'next' | 'previous') {
  const bounds = target.getBoundingClientRect();
  const bitmap = document.createElement('canvas');
  bitmap.width = Math.ceil(bounds.width); bitmap.height = Math.ceil(bounds.height);
  const ink = bitmap.getContext('2d')!;
  const image = target.querySelector('img');
  if (image) {
    const scale = Math.max(bitmap.width / image.naturalWidth, bitmap.height / image.naturalHeight);
    ink.drawImage(image, (bitmap.width - image.naturalWidth * scale) / 2, 0, image.naturalWidth * scale, image.naturalHeight * scale);
  }
  const columns = Math.max(20, Math.round(bitmap.width / 10));
  const rows = Math.max(1, Math.round(bitmap.height / 13));
  const sample = document.createElement('canvas'); sample.width = columns; sample.height = rows;
  const sampleContext = sample.getContext('2d')!; sampleContext.drawImage(bitmap, 0, 0, columns, rows);
  const pixels = sampleContext.getImageData(0, 0, columns, rows).data;
  const width = bitmap.width, height = bitmap.height, cw = width / columns, ch = height / rows;

  return (context: CanvasRenderingContext2D, points: CorruptionPoint[], time: number, reduced: boolean) => {
    context.clearRect(0, 0, width, height);
    context.font = `${Math.max(9, cw * .95)}px Consolas, monospace`;
    context.textAlign = 'center'; context.textBaseline = 'middle';
    const radius = width < 500 ? 78 : 124;
    for (let row = 0; row < rows; row++) for (let column = 0; column < columns; column++) {
      const x = column * cw, y = row * ch;
      const cellNoise = noise(column, row);
      const blockNoise = noise(Math.floor(column / 4), Math.floor(row / 2));
      const rowNoise = noise(0, row);
      let energy = 0;
      const order = direction === 'next' ? 1 - column / columns : column / columns;
      if (!reduced) energy = Math.max(energy, Math.min(1, Math.max(0, (.75 - time - order * .12) * 3)));
      for (const point of points) {
        const dx = Math.abs(x + cw / 2 - point.x);
        const dy = Math.abs(y + ch / 2 - point.y);
        // Uneven rectangular islands interrupt the core, rather than a soft circle.
        const distance = Math.max(dx / (radius * (1 + rowNoise * .45)), dy / (radius * .7));
        const reach = 1 + (blockNoise - .5) * .5;
        const local = Math.max(0, Math.min(1, (reach - distance) * 2.2));
        energy = Math.max(energy, local * Math.max(0, point.life));
      }
      // Cells repair at different thresholds, breaking the trail into fragments.
      const damage = Math.max(0, Math.min(1, (energy - cellNoise * .23) * 1.3));
      if (damage < .035) continue;
      const index = (row * columns + column) * 4;
      const r = pixels[index], g = pixels[index + 1], b = pixels[index + 2];
      const brightness = (r * .2126 + g * .7152 + b * .0722) / 255;
      const inverted = blockNoise > .83 && cellNoise > .2;
      const brokenRow = rowNoise > .78 && blockNoise > .4;
      // Inversion is spatially stable: the symbols mutate, the image never sways.
      context.globalAlpha = damage;
      context.fillStyle = inverted ? '#b9cdf0' : brokenRow ? '#263344' : '#11151a';
      context.fillRect(x, y, cw + 1, ch + 1);
      const frame = reduced ? 0 : Math.floor(time * (10 + Math.floor(cellNoise * 5)) + blockNoise * 7);
      const corruptNoise = noise(column, row, frame);
      const baseGlyph = SHADING[Math.min(SHADING.length - 1, Math.floor(brightness * SHADING.length))];
      const glyph = damage > .35
        ? GLYPHS[Math.floor(corruptNoise * GLYPHS.length)]
        : baseGlyph;
      context.fillStyle = inverted ? '#141414' : cellNoise > .8 ? '#e6e6e6' : `rgb(${Math.round(135 + r * .4)}, ${Math.round(155 + g * .32)}, ${Math.round(180 + b * .28)})`;
      context.globalAlpha = Math.min(1, damage * 1.6);
      context.fillText(glyph, x + cw / 2, y + ch / 2);
      if (brokenRow && cellNoise > .65) {
        context.globalAlpha = damage * .65;
        context.fillRect(x + 1, y + ch - 2, cw - 2, 1);
      }
    }
    context.globalAlpha = 1;
  };
}
