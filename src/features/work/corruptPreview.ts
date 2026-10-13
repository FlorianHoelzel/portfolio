const GLYPHS = ' .:-=+*/%#@';
export const CORRUPTION_DURATION = 1.35;

// Capture only the image or source region; controls and factual copy stay intact.
export function capturePreview(target: HTMLElement) {
  const bounds = target.getBoundingClientRect();
  const bitmap = document.createElement('canvas');
  bitmap.width = Math.ceil(bounds.width);
  bitmap.height = Math.ceil(bounds.height);
  const context = bitmap.getContext('2d')!;
  const image = target.querySelector('img');
  if (image) {
    if (!image.complete || !image.naturalWidth) return null;
    const scale = Math.max(bitmap.width / image.naturalWidth, bitmap.height / image.naturalHeight);
    context.drawImage(image, (bitmap.width - image.naturalWidth * scale) / 2, 0, image.naturalWidth * scale, image.naturalHeight * scale);
  } else {
    const style = getComputedStyle(target);
    context.fillStyle = '#1c1c1c';
    context.fillRect(0, 0, bitmap.width, bitmap.height);
    context.font = `${style.fontSize} 'SFMono-Regular', Consolas, monospace`;
    context.textBaseline = 'alphabetic';
    target.querySelectorAll<HTMLElement>('.source-line').forEach(line => {
      const lineBounds = line.getBoundingClientRect();
      const number = line.querySelector<HTMLElement>('.source-line-number');
      const x = lineBounds.left - bounds.left;
      const y = lineBounds.top - bounds.top + parseFloat(style.fontSize) * 1.3;
      context.fillStyle = '#a0a0a0';
      context.fillText(number?.textContent || '', x, y);
      context.fillStyle = style.color;
      context.fillText((line.textContent || '').slice(number?.textContent?.length || 0).trimEnd(), x + (number?.getBoundingClientRect().width || 0), y);
    });
  }
  const sample = document.createElement('canvas');
  sample.width = 66;
  sample.height = Math.max(1, Math.round(bitmap.height / bitmap.width * 40));
  const sampleContext = sample.getContext('2d')!;
  sampleContext.drawImage(bitmap, 0, 0, sample.width, sample.height);
  const pixels = sampleContext.getImageData(0, 0, sample.width, sample.height).data;
  return { bitmap, pixels, columns: sample.width, rows: sample.height };
}

export type PreviewCapture = NonNullable<ReturnType<typeof capturePreview>>;

const random = (seed: number) => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

export function drawCorruption(context: CanvasRenderingContext2D, capture: PreviewCapture, time: number, reducedMotion: boolean, seed = 1) {
  const { bitmap, pixels, columns, rows } = capture;
  const { width, height } = bitmap;
  context.clearRect(0, 0, width, height);
  context.drawImage(bitmap, 0, 0);
  const progress = Math.min(1, time / CORRUPTION_DURATION);
  const strength = reducedMotion ? 1 : Math.sin(Math.PI * progress) * Math.pow(1 - progress, .4);
  let y = 0;
  for (let band = 0; y < height; band++) {
    const bandSeed = seed + band * 31;
    const bandHeight = Math.min(height - y, Math.ceil(height * (.013 + random(bandSeed) * .085)));
    const wave = Math.sin(time * (3 + random(bandSeed + 1) * 5) + random(bandSeed + 2) * 6.28);
    const offset = reducedMotion ? 0 : wave * strength * width * (.01 + random(bandSeed + 3) * .09);
    context.drawImage(bitmap, 0, y, width, bandHeight, offset, y, width, bandHeight);
    if (random(bandSeed + 4) > .65) {
      context.fillStyle = '#b9cdf0';
      context.globalAlpha = strength * .12;
      context.fillRect(0, y, width, bandHeight);
      context.globalAlpha = 1;
    }
    y += bandHeight;
  }
  // Independently torn rectangular patches break the regular scanline pattern.
  for (let patch = 0; patch < 14; patch++) {
    const patchSeed = seed + patch * 113;
    const patchWidth = width * (.03 + random(patchSeed) * .22);
    const patchHeight = height * (.025 + random(patchSeed + 1) * .14);
    const x = random(patchSeed + 2) * (width - patchWidth);
    const y = random(patchSeed + 3) * (height - patchHeight);
    const dx = reducedMotion ? 0 : Math.sin(time * 5 + patch) * width * .08 * strength;
    const dy = reducedMotion ? 0 : Math.cos(time * 4 + patch) * height * .025 * strength;
    context.globalAlpha = strength * .8;
    context.drawImage(bitmap, x, y, patchWidth, patchHeight, x + dx, y + dy, patchWidth, patchHeight);
  }
  context.globalAlpha = 1;
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  context.font = `${Math.max(7, cellWidth * .95)}px Consolas, monospace`;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const cellSeed = seed + Math.floor(row / 3) * 71 + Math.floor(column / 5) * 97;
      const zone = reducedMotion ? 1 : Math.max(0, Math.sin(time * (2 + random(cellSeed) * 3) + random(cellSeed + 1) * 6.28));
      const opacity = strength * zone;
      if (opacity < .08) continue;
      const index = (row * columns + column) * 4;
      const brightness = (pixels[index] * .2126 + pixels[index + 1] * .7152 + pixels[index + 2] * .0722) / 255;
      const glyph = GLYPHS[Math.min(GLYPHS.length - 1, Math.floor(brightness * 7 + random(cellSeed + row + column) * 4 + 1))];
      const x = column * cellWidth, y = row * cellHeight;
      context.fillStyle = '#141414';
      context.globalAlpha = opacity * .85;
      context.fillRect(x, y, cellWidth + 1, cellHeight + 1);
      context.fillStyle = brightness > .35 ? '#dfecff' : '#8eafd1';
      context.globalAlpha = opacity;
      context.fillText(glyph, x + cellWidth / 2, y + cellHeight / 2);
    }
  }
  context.globalAlpha = 1;
}
