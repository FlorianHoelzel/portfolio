// An authored local-clock sky, rather than a location-based weather simulation.
// All transitions wrap through midnight and need no network or location access.
const STOPS = [
  { hour: 0, day: 0, warmth: 0, colors: ['#34465f', '#526d91', '#809fc4', '#b5cce7', '#e0eafa'] },
  { hour: 5, day: 0, warmth: 0, colors: ['#34465f', '#526d91', '#809fc4', '#b5cce7', '#e0eafa'] },
  { hour: 6, day: .5, warmth: 1, colors: ['#5c4e69', '#956e83', '#c69c9d', '#ebc5b4', '#ffe2bc'] },
  { hour: 8, day: 1, warmth: 0, colors: ['#3d5872', '#668ba8', '#99bcd2', '#c7dfea', '#edf6ff'] },
  { hour: 16, day: 1, warmth: 0, colors: ['#3d5872', '#668ba8', '#99bcd2', '#c7dfea', '#edf6ff'] },
  { hour: 18, day: .5, warmth: 1, colors: ['#62516a', '#9d7180', '#d09a91', '#efbe9d', '#ffdeb1'] },
  { hour: 20, day: 0, warmth: 0, colors: ['#34465f', '#526d91', '#809fc4', '#b5cce7', '#e0eafa'] },
  { hour: 24, day: 0, warmth: 0, colors: ['#34465f', '#526d91', '#809fc4', '#b5cce7', '#e0eafa'] },
];

const mix = (a: number, b: number, t: number) => a + (b - a) * t;
function mixColor(a: string, b: string, t: number) {
  const channels = [1, 3, 5].map(offset => Math.round(mix(
    parseInt(a.slice(offset, offset + 2), 16), parseInt(b.slice(offset, offset + 2), 16), t)));
  return `rgb(${channels.join(',')})`;
}

export function getSkyState(date: Date) {
  const hour = date.getHours() + date.getMinutes() / 60 + date.getSeconds() / 3600;
  const next = STOPS.findIndex(stop => stop.hour > hour);
  const a = STOPS[next - 1], b = STOPS[next];
  const linear = (hour - a.hour) / (b.hour - a.hour);
  const t = linear * linear * (3 - 2 * linear);
  const day = mix(a.day, b.day, t);
  const warmth = mix(a.warmth, b.warmth, t);
  return {
    hour, day, warmth,
    colors: [...a.colors.map((color, i) => mixColor(color, b.colors[i], t)), '#141414'],
    sunColor: mixColor('#ffe8a6', '#efa171', warmth),
  };
}

export type SkyState = ReturnType<typeof getSkyState>;

export function createSkyRenderer(context: CanvasRenderingContext2D) {
  const bodies = [false, true].map(() => ({ canvas: document.createElement('canvas'), stamp: '', extent: 0 }));
  return (width: number, height: number, scale: number, time: number, still: boolean, sky: SkyState) => {
    const size = Math.max(6, Math.round(scale * .048));
    const position = (sun: boolean) => {
      // Continue below the arc's horizon throughout dawn/dusk instead of
      // clamping a still-visible body at its rise/set position. Wrap each
      // path only while that body is completely invisible.
      const progress = sun ? (sky.hour - 6) / 12
        : (sky.hour < 12 ? sky.hour + 6 : sky.hour - 18) / 12;
      return { x: width * (.39 + progress * .4), y: height * (.34 - Math.sin(progress * Math.PI) * .17) };
    };

    for (const sun of [false, true]) {
      const opacity = sun ? sky.day : 1 - sky.day;
      if (opacity < .001) continue;
      const { x, y } = position(sun);
      const radius = scale * (sun ? .28 : .25);
      const cached = bodies[Number(sun)];
      const body = cached.canvas;
      const ink = body.getContext('2d')!;
      const key = `${size}:${Math.round(radius)}:${sun}:${sky.sunColor}`;
      if (cached.stamp !== key) {
        cached.stamp = key;
        const extent = cached.extent = Math.ceil(radius * 3.2);
        body.width = extent * 2;
        body.height = extent * 2;
        ink.scale(2, 2);
        ink.font = `${size}px Consolas, 'Liberation Mono', monospace`;
        ink.textAlign = 'center';
        ink.textBaseline = 'middle';
        ink.fillStyle = sun ? sky.sunColor : '#d8e4fc';
        const spacingX = size * .65, spacingY = size * .95;
        for (let row = -20; row <= 20; row++) {
          for (let column = -28; column <= 28; column++) {
            const px = column * spacingX, py = row * spacingY;
            const distance = Math.hypot(px, py) / radius;
            const seed = ((column * 73 + row * 137 + 6000) % 257) / 257;
            if (distance <= 1) {
              // Offset disc removes the dark side of the ASCII crescent.
              if (!sun && Math.hypot(px - radius * .43, py + radius * .24) < radius * .91) continue;
              ink.globalAlpha = .7 + seed * .3;
              const glyphs = sun ? ':*oO@' : '.:+%@';
              const tone = sun ? 1 - distance * .65 : .4 + seed * .6;
              ink.fillText(glyphs[Math.min(4, Math.floor(tone * 5))], extent / 2 + px, extent / 2 + py);
            } else if (sun && distance < 1.5 && distance > 1.18) {
              const angle = Math.atan2(py, px);
              if (Math.abs(Math.sin(angle * 8)) > .17) continue;
              ink.globalAlpha = .38;
              ink.fillText(distance > 1.4 ? '.' : '+', extent / 2 + px, extent / 2 + py);
            }
          }
        }
      }
      context.globalAlpha = opacity * .88;
      context.drawImage(body, x - cached.extent / 2, y - cached.extent / 2, cached.extent, cached.extent);
    }

    // Sparse deterministic stars, with slow individual scintillation.
    if (sky.day < 1) {
      context.font = `${size}px Consolas, 'Liberation Mono', monospace`;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillStyle = '#b5cce7';
      for (let i = 0; i < 23; i++) {
        const sx = width * (.2 + ((i * 73 + 19) % 251) / 251 * .71);
        const sy = height * (.07 + ((i * 47 + 11) % 137) / 137 * .44);
        const moon = position(false);
        if (Math.hypot(sx - moon.x, sy - moon.y) < scale * .4) continue;
        context.globalAlpha = (1 - sky.day) * (.28 + (still ? .35 : (Math.sin(time * .6 + i * 2.7) + 1) * .23));
        context.fillText(i % 6 === 0 ? '+' : '.', sx, sy);
      }
    }
    context.globalAlpha = 1;
    const sun = position(true), moon = position(false);
    return { x: mix(moon.x, sun.x, sky.day), y: mix(moon.y, sun.y, sky.day) };
  };
}
