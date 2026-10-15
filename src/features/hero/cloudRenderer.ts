import { createSkyRenderer, getSkyState, type SkyState } from './livingSky';

// A softly merged cumulus volume, shaded into ASCII cells rather than loose points.
const TONES = '.:;=+*x%#@';
const CORRUPTION = '01[]{}<>/\\?!_$%#';
const GLYPHS = TONES + CORRUPTION;
const BILLOWS = [
  { x: -1.03, y: .12, z: .03, radius: .36 },
  { x: -.75, y: .02, z: -.05, radius: .42 },
  { x: -.4, y: -.19, z: .02, radius: .57 },
  { x: .49, y: -.2, z: -.04, radius: .49 },
  { x: .98, y: .15, z: .03, radius: .34 },
  { x: -.57, y: .24, z: .1, radius: .44 },
  { x: .04, y: .25, z: .13, radius: .5 },
  { x: .66, y: .25, z: .08, radius: .39 },
];

export interface CloudPointer {
  strokes: { x0: number; y0: number; x1: number; y1: number }[];
}

// Smooth union joins the billows without drawing independent spherical rims.
function cloudDistance(x: number, y: number, z: number) {
  let distance = 10;
  for (const billow of BILLOWS) {
    const next = Math.hypot(x - billow.x, y - billow.y, z - billow.z) - billow.radius;
    const blend = Math.max(.12 - Math.abs(distance - next), 0) / .12;
    distance = Math.min(distance, next) - blend * blend * .12 * .25;
  }
  // The cloud's shared base is flatter than its sunlit crown.
  return Math.max(distance, y - .56);
}

interface CloudCell {
  x: number; y: number; z: number; light: number; edge: number;
  nx: number; ny: number; nz: number;
  seed: number; row: number; dx: number; dy: number; vx: number; vy: number; corruption: number;
}

export function createAsciiCloudRenderer(context: CanvasRenderingContext2D) {
  const particles: CloudCell[] = [];
  const drawSky = createSkyRenderer(context);
  // Raymarch only on initialization. The frame loop animates the sampled surface.
  for (let row = 0; row < 36; row++) {
    for (let column = 0; column < 89; column++) {
      const x = (column - 44) * .034;
      const y = -1.15 + row * .053;
      let z = 1.1;
      let hit = false;
      for (let step = 0; step < 36 && z > -.85; step++) {
        const distance = cloudDistance(x, y, z);
        if (distance < .008) { hit = true; break; }
        z -= Math.max(.008, distance * .85);
      }
      if (!hit) continue;
      const epsilon = .006;
      const nx = cloudDistance(x + epsilon, y, z) - cloudDistance(x - epsilon, y, z);
      const ny = cloudDistance(x, y + epsilon, z) - cloudDistance(x, y - epsilon, z);
      const nz = cloudDistance(x, y, z + epsilon) - cloudDistance(x, y, z - epsilon);
      const length = Math.hypot(nx, ny, nz) || 1;
      const diffuse = Math.max(0, (-nx * .38 - ny * .72 + nz * .58) / length);
      const occlusion = Math.max(0, Math.min(1, cloudDistance(x - .09, y - .15, z + .12) / .2));
      const light = Math.max(.12, Math.min(1, .22 + diffuse * .68 + occlusion * .1));
      const seed = ((column * 73 + row * 137) % 257) / 257;
      particles.push({ x, y, z, light, edge: Math.min(1, Math.max(.35, nz / length * 2.8)),
        nx: nx / length, ny: ny / length, nz: nz / length,
        seed, row, dx: 0, dy: 0, vx: 0, vy: 0, corruption: 0 });
    }
  }

  let atlas: HTMLCanvasElement;
  let fontSize = 0;
  let tile = 0;
  let colors: string[] = [];
  let paletteKey = '';
  const prepareGlyphs = (size: number, palette: string[]) => {
    const key = palette.join();
    if (fontSize === size && key === paletteKey) return;
    paletteKey = key;
    colors = palette;
    fontSize = size;
    tile = Math.ceil(size * 2);
    atlas = document.createElement('canvas');
    atlas.width = tile * GLYPHS.length * 2;
    atlas.height = tile * colors.length * 2;
    const ink = atlas.getContext('2d')!;
    ink.scale(2, 2);
    ink.font = `${size}px Consolas, 'Liberation Mono', monospace`;
    ink.textAlign = 'center';
    ink.textBaseline = 'middle';
    colors.forEach((color, row) => {
      ink.fillStyle = color;
      Array.from(GLYPHS).forEach((glyph, column) => ink.fillText(glyph, (column + .5) * tile, (row + .5) * tile));
    });
  };

  return (width: number, height: number, time: number, pointer: CloudPointer, delta: number, still: boolean,
    sky: SkyState = getSkyState(new Date())) => {
    if (!width || !height) return;
    context.clearRect(0, 0, width, height);
    const compact = width < 500;
    const scale = Math.min(width / 3.65, (height - 60) / 1.8);
    // Glyphs and cell spacing scale together, including on narrow mobile screens.
    prepareGlyphs(Math.max(6, Math.round(scale * .052)), sky.colors);
    const lightSource = drawSky(width, height, scale, time, still, sky);
    const lightX = (lightSource.x - width * .55) / scale;
    const lightY = (lightSource.y - height * .57) / scale;
    const step = Math.min(delta, .05);
    const damping = Math.exp(-2.5 * step);
    const radius = compact ? 40 : 62;
    const strokes = pointer.strokes.splice(0);
    const wind = still ? 0 : time;

    for (const particle of particles) {
      // Broad, shared currents preserve the cumulus shape; nothing rotates.
      const current = particle.x * 1.8 - wind * (.32 + sky.day * .16);
      const px = particle.x + Math.sin(current + particle.y * .7) * .035;
      const py = particle.y + Math.sin(current + particle.z * .8) * .04
        + Math.sin(particle.x * 3.3 - wind * .61) * .012;
      const x = width * .55 + px * scale;
      const y = height * .57 + py * scale;

      if (!still) {
        particle.corruption *= Math.exp(-.85 * step);
        for (const stroke of strokes) {
          const sx = stroke.x1 - stroke.x0, sy = stroke.y1 - stroke.y0;
          const length = Math.hypot(sx, sy);
          if (length < .5) continue;
          const along = Math.max(0, Math.min(1,
            ((x + particle.dx - stroke.x0) * sx + (y + particle.dy - stroke.y0) * sy) / (length * length)));
          const ox = x + particle.dx - stroke.x0 - sx * along;
          const oy = y + particle.dy - stroke.y0 - sy * along;
          const distance = Math.hypot(ox, oy);
          if (distance > radius * 2) continue;
          const influence = Math.exp(-distance * distance / (radius * radius)) * Math.min(length / 65, 1.4);
          const side = particle.seed > .5 ? 1 : -1;
          const outwardX = distance > 2 ? ox / distance : -sy / length * side;
          const outwardY = distance > 2 ? oy / distance : sx / length * side;
          const impulse = influence * (120 + particle.seed * 90);
          particle.vx += (outwardX * .85 + sx / length * .7) * impulse;
          particle.vy += (outwardY * .85 + sy / length * .7) * impulse;
          particle.corruption = Math.min(1, particle.corruption + influence * 1.5);
        }
        const speed = Math.hypot(particle.vx, particle.vy);
        if (speed > 380) { particle.vx *= 380 / speed; particle.vy *= 380 / speed; }
        const gathering = 1.25 + particle.seed * .35;
        particle.vx = (particle.vx - particle.dx * gathering * step) * damping;
        particle.vy = (particle.vy - particle.dy * gathering * step) * damping;
        particle.dx += particle.vx * step;
        particle.dy += particle.vy * step;
      }

      // Slow moving vapor texture modulates the actual surface lighting.
      const texture = Math.sin(particle.x * 7 + particle.y * 5 - wind * .38)
        * Math.sin(particle.y * 6 + particle.z * 3 + wind * .23) * .035;
      const lx = lightX - particle.x, ly = lightY - particle.y;
      const lightLength = Math.hypot(lx, ly, 1.8);
      const directional = Math.max(0, (particle.nx * lx + particle.ny * ly + particle.nz * 1.8) / lightLength);
      const light = Math.max(0, Math.min(1, particle.light * .5 + directional * .48 + .08 + texture));
      const dispersed = still ? 0 : Math.min(1, Math.hypot(particle.dx, particle.dy) / 100);
      const damage = still ? 0 : Math.max(particle.corruption, dispersed * .65);
      let shade = Math.min(4, Math.floor(light * 5));
      let glyph = Math.min(TONES.length - 1, Math.floor((.25 + light * .75) * (TONES.length - 1)));
      const mutation = Math.floor(wind * (8 + particle.seed * 4) + particle.seed * 47);
      const hash = Math.abs(Math.sin(mutation * 127.1 + particle.seed * 311.7));
      if (damage > .08 && hash < damage) {
        glyph = TONES.length + (mutation + Math.floor(particle.seed * 83)) % CORRUPTION.length;
        shade = Math.min(4, shade + 1);
      }
      const tear = damage > .15 && particle.row % 5 === 0
        ? Math.sin(Math.floor(wind * 9) + particle.row * 7) * damage * 12 : 0;
      const drawX = x + (still ? 0 : particle.dx) + tear;
      const drawY = y + (still ? 0 : particle.dy);
      const edgeFade = Math.max(0, Math.min(1, drawY / 24, (height - drawY) / 24, drawX / 24, (width - drawX) / 24));
      // Each vapor cell occludes the sky; scattered cells uncover the light behind it.
      context.clearRect(drawX - scale * .018, drawY - scale * .028, scale * .036, scale * .056);
      context.globalAlpha = (.74 + light * .26) * particle.edge * (1 - dispersed * .25) * edgeFade;
      const inverted = damage > .25 && particle.seed > .88 && hash < damage * .7;
      if (inverted) {
        context.fillStyle = colors[3];
        context.fillRect(drawX - fontSize * .35, drawY - fontSize * .52, fontSize * .7, fontSize * 1.04);
        shade = 5;
      }
      context.drawImage(atlas, glyph * tile * 2, shade * tile * 2, tile * 2, tile * 2,
        drawX - tile / 2, drawY - tile / 2, tile, tile);
    }
    context.globalAlpha = 1;
  };
}
