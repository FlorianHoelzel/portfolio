const GLYPHS = '!<>[]{}/*+=:#%?';
export const NAME_ENTRANCE_DURATION = 1.6;
const clamp = (value: number) => Math.min(1, Math.max(0, value));
const noise = (seed: number) => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

// Local text scramble, independent of the cloud. Fixed targets and seeded noise
// keep the animation inside the heading without changing the page's layout.
export function createAsciiName(context: CanvasRenderingContext2D, heading: HTMLElement, hero: HTMLElement) {
  const bounds = hero.getBoundingClientRect();
  const text = heading.getBoundingClientRect();
  const style = getComputedStyle(heading);
  const fontSize = parseFloat(style.fontSize);
  const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const name = heading.textContent || 'Florian';
  context.font = font;
  context.letterSpacing = style.letterSpacing;
  const metrics = context.measureText(name);
  const ascent = metrics.fontBoundingBoxAscent || fontSize * .8;
  const descent = metrics.fontBoundingBoxDescent || fontSize * .2;
  const left = text.left - bounds.left;
  const baseline = text.top - bounds.top + (text.height - ascent - descent) / 2 + ascent;
  const letters = Array.from(name).map((letter, index) => {
    const start = context.measureText(name.slice(0, index)).width;
    const end = context.measureText(name.slice(0, index + 1)).width;
    return { letter, center: left + (start + end) / 2, width: end - start,
      initial: left + (index + .5) * text.width / name.length,
      lock: .55 + [0, 2, 4, 1, 6, 3, 5][index % 7] * .1 };
  });

  return (time: number) => {
    context.clearRect(0, 0, bounds.width, bounds.height);
    context.textBaseline = 'alphabetic';
    context.textAlign = 'center';
    context.letterSpacing = '0px';
    const frame = Math.floor(time * 16);
    const settling = 1 - Math.pow(1 - clamp(time / 1.15), 3);
    const resolve = clamp((time - 1.3) / .3);
    for (const [index, letter] of letters.entries()) {
      if (letter.letter === ' ') continue;
      const locked = time >= letter.lock;
      const jitter = locked ? 0 : (1 - settling) * fontSize * .18;
      const glyph = locked ? letter.letter : GLYPHS[Math.floor(noise(index * 37 + frame) * GLYPHS.length)];
      const x = letter.initial + (letter.center - letter.initial) * settling + (noise(frame + index * 11) - .5) * jitter;
      const y = baseline + (noise(frame + index * 19 + 100) - .5) * jitter;
      context.font = locked ? font : `${style.fontWeight} ${fontSize * .82}px Consolas, monospace`;
      context.fillStyle = locked ? style.color : '#b9cdf0';
      context.globalAlpha = 1 - resolve;
      // Wide symbols compress into narrow letter slots as the mess settles.
      const glyphWidth = context.measureText(glyph).width;
      context.save();
      context.translate(x, y);
      context.scale(Math.min(1, Math.max(letter.width, fontSize * .18) / glyphWidth), 1);
      context.fillText(glyph, 0, 0);
      context.restore();
      if (!locked) {
        context.font = `${Math.max(8, fontSize * .16)}px Consolas, monospace`;
        context.fillStyle = '#8eafd1';
        context.globalAlpha = .45 * (1 - settling);
        for (let echo = 0; echo < 3; echo++) {
          const seed = index * 31 + echo * 7 + frame;
          context.fillText(GLYPHS[Math.floor(noise(seed) * GLYPHS.length)],
            x + (noise(seed + 1) - .5) * fontSize * .6,
            baseline - fontSize * (.15 + noise(seed + 2) * .8));
        }
      }
    }
    context.globalAlpha = 1;
    heading.style.opacity = String(resolve);
  };
}
