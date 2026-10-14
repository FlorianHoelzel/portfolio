export interface CorruptionPoint { x: number; y: number; life: number }
const GLYPHS = '.:;+=*ox%#@';

export function createCursorCorruption(target: HTMLElement, direction: 'next' | 'previous') {
  const bounds = target.getBoundingClientRect();
  const bitmap = document.createElement('canvas');
  bitmap.width = Math.ceil(bounds.width); bitmap.height = Math.ceil(bounds.height);
  const ink = bitmap.getContext('2d')!;
  const image = target.querySelector('img');
  if (image) {
    const scale = Math.max(bitmap.width / image.naturalWidth, bitmap.height / image.naturalHeight);
    ink.drawImage(image, (bitmap.width - image.naturalWidth * scale) / 2, 0, image.naturalWidth * scale, image.naturalHeight * scale);
  } else {
    const style = getComputedStyle(target);
    ink.fillStyle = '#1c1c1c'; ink.fillRect(0, 0, bitmap.width, bitmap.height);
    ink.font = `${style.fontSize} Consolas, monospace`; ink.textBaseline = 'alphabetic';
    for (const line of target.querySelectorAll<HTMLElement>('.source-line')) {
      const position = line.getBoundingClientRect();
      ink.fillStyle = style.color;
      ink.fillText(line.textContent?.trimEnd() || '', position.left - bounds.left, position.top - bounds.top + parseFloat(style.fontSize) * 1.3);
    }
  }
  const columns = Math.max(20, Math.round(bitmap.width / 13));
  const rows = Math.max(1, Math.round(bitmap.height / 17));
  const sample = document.createElement('canvas'); sample.width = columns; sample.height = rows;
  const sampleContext = sample.getContext('2d')!; sampleContext.drawImage(bitmap, 0, 0, columns, rows);
  const pixels = sampleContext.getImageData(0, 0, columns, rows).data;
  const width = bitmap.width, height = bitmap.height, cw = width / columns, ch = height / rows;

  return (context: CanvasRenderingContext2D, points: CorruptionPoint[], time: number, full: boolean, reduced: boolean) => {
    context.clearRect(0, 0, width, height);
    context.font = `${Math.max(9, cw * .95)}px Consolas, monospace`;
    context.textAlign = 'center'; context.textBaseline = 'middle';
    const radius = width < 500 ? 64 : 95;
    for (let row = 0; row < rows; row++) for (let column = 0; column < columns; column++) {
      const x = column * cw, y = row * ch;
      let energy = full ? .9 : 0;
      const order = direction === 'next' ? 1 - column / columns : column / columns;
      if (!reduced) energy = Math.max(energy, Math.min(1, Math.max(0, (.75 - time - order * .12) * 3)));
      for (const point of points) {
        const distance = Math.hypot(x + cw / 2 - point.x, y + ch / 2 - point.y);
        energy = Math.max(energy, Math.max(0, 1 - distance / radius) * point.life);
      }
      if (energy < .035) continue;
      const index = (row * columns + column) * 4;
      const r = pixels[index], g = pixels[index + 1], b = pixels[index + 2];
      const brightness = (r * .2126 + g * .7152 + b * .0722) / 255;
      const seed = Math.sin(column * 12.9898 + row * 78.233) * 43758.5453;
      const noise = seed - Math.floor(seed);
      // Energy follows the cursor trail; it never punches an empty circular hole.
      const displacement = reduced ? 0 : Math.sin(time * 8 + noise * 6.28) * energy * cw * .65;
      context.globalAlpha = Math.min(1, energy * 1.5);
      context.fillStyle = `rgb(${r}, ${g}, ${b})`;
      context.fillRect(x + displacement, y, cw + 1, ch + 1);
      context.fillStyle = '#141414'; context.globalAlpha = energy * .8;
      context.fillRect(x, y, cw + 1, ch + 1);
      context.fillStyle = brightness > .4 ? '#dfecff' : '#9cb5cb';
      context.globalAlpha = Math.min(1, energy * 1.4);
      const glyphIndex = Math.min(GLYPHS.length - 1, Math.floor(brightness * 6 + noise * 5));
      context.fillText(GLYPHS[glyphIndex], x + cw / 2 + displacement, y + ch / 2);
    }
    context.globalAlpha = 1;
  };
}
