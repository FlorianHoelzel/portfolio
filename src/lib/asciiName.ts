interface LetterParticle { x: number; y: number; startX: number; startY: number; delay: number; bend: number; glyph: string }
const GLYPHS = '.:+=*ox%#@';
export const NAME_ENTRANCE_DURATION = 2.15;
const clamp = (value: number) => Math.min(1, Math.max(0, value));

export function createAsciiName(context: CanvasRenderingContext2D, heading: HTMLElement, hero: HTMLElement, cloud: HTMLElement) {
  const bounds = hero.getBoundingClientRect();
  const text = heading.getBoundingClientRect();
  const source = cloud.getBoundingClientRect();
  const style = getComputedStyle(heading);
  const mask = document.createElement('canvas');
  mask.width = Math.ceil(text.width);
  mask.height = Math.ceil(text.height);
  const ink = mask.getContext('2d')!;
  ink.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  ink.letterSpacing = style.letterSpacing;
  ink.textBaseline = 'alphabetic';
  const name = heading.textContent || 'Florian';
  const metrics = ink.measureText(name);
  const ascent = metrics.fontBoundingBoxAscent || parseFloat(style.fontSize) * .8;
  const descent = metrics.fontBoundingBoxDescent || parseFloat(style.fontSize) * .2;
  // Match the DOM line box, so the particle lettering resolves in place.
  ink.fillText(name, 0, (text.height - ascent - descent) / 2 + ascent);
  const pixels = ink.getImageData(0, 0, mask.width, mask.height).data;
  const particles: LetterParticle[] = [];
  const spacing = text.height < 60 ? 4 : 5;
  for (let y = 0; y < mask.height; y += spacing) {
    for (let x = 0; x < mask.width; x += spacing) {
      if (pixels[(y * mask.width + x) * 4 + 3] < 120) continue;
      const index = particles.length;
      const angle = index * 2.39996;
      const ring = .3 + ((index * 37) % 100) / 145;
      particles.push({
        x: text.left - bounds.left + x,
        y: text.top - bounds.top + y,
        startX: source.left - bounds.left + source.width * .53 + Math.cos(angle) * source.width * .18 * ring,
        startY: source.top - bounds.top + source.height * .46 + Math.sin(angle) * source.height * .14 * ring,
        delay: x / mask.width * .38 + ((index * 13) % 17) / 100,
        bend: Math.sin(angle) * 35,
        glyph: GLYPHS[index % GLYPHS.length],
      });
    }
  }

  return (time: number) => {
    context.clearRect(0, 0, bounds.width, bounds.height);
    context.font = `${spacing + 2}px Consolas, 'Liberation Mono', monospace`;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    const resolve = clamp((time - 1.65) / .5);
    for (const particle of particles) {
      const progress = clamp((time - particle.delay) / 1.1);
      if (progress === 0) continue;
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -8 * progress);
      const arc = Math.sin(progress * Math.PI);
      const x = particle.startX + (particle.x - particle.startX) * eased;
      const y = particle.startY + (particle.y - particle.startY) * eased - arc * (25 + particle.bend);
      context.globalAlpha = Math.min(1, progress * 6) * (1 - resolve);
      context.fillStyle = progress > .7 ? '#dfecff' : '#8eafd1';
      context.fillText(particle.glyph, x, y);
      // A short echo makes the flow legible without long trails across the copy.
      if (progress < .65) {
        context.globalAlpha *= .25;
        context.fillText('.', x + (particle.startX - x) * .04, y + 2);
      }
    }
    context.globalAlpha = 1;
    heading.style.opacity = String(.25 + .75 * (1 - Math.pow(1 - resolve, 3)));
  };
}
