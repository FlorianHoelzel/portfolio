// A projected cloud surface, with spring displacement for each ASCII particle.
// Cached glyph sprites keep font rasterization out of the animation loop.
const GLYPHS = '.:+=*ox%#@';
const COLORS = ['#405c78', '#6386aa', '#8eafd1', '#b9cdf0', '#dfecff'];
const PUFFS = [
  { x: -.85, y: .2, z: .1, radius: .42 },
  { x: -.5, y: -.04, z: -.16, radius: .52 },
  { x: -.12, y: -.3, z: .2, radius: .58 },
  { x: .42, y: -.13, z: -.12, radius: .56 },
  { x: .88, y: .21, z: .1, radius: .42 },
  { x: .1, y: .28, z: .26, radius: .65 },
];

export interface CloudPointer {
  x: number;
  y: number;
  strength: number;
  tiltX: number;
  tiltY: number;
}

export function createAsciiCloudRenderer(context: CanvasRenderingContext2D) {
  const particles = PUFFS.flatMap((puff, puffIndex) => Array.from({ length: 260 }, (_, index) => {
    const y = 1 - 2 * (index + .5) / 260;
    const ring = Math.sqrt(1 - y * y);
    const angle = index * Math.PI * (3 - Math.sqrt(5));
    const x = Math.cos(angle) * ring;
    const z = Math.sin(angle) * ring;
    return { x: puff.x + x * puff.radius, y: puff.y + y * puff.radius, z: puff.z + z * puff.radius,
      nx: x, ny: y, nz: z, puffIndex, index, dx: 0, dy: 0, vx: 0, vy: 0 };
  }).filter(particle => !PUFFS.some((puff, index) => index !== particle.puffIndex &&
    Math.hypot(particle.x - puff.x, particle.y - puff.y, particle.z - puff.z) < puff.radius * .96)));

  let atlas: HTMLCanvasElement;
  let fontSize = 0;
  let tile = 0;
  const prepareGlyphs = (size: number) => {
    if (fontSize === size) return;
    fontSize = size;
    tile = Math.ceil(size * 2);
    atlas = document.createElement('canvas');
    atlas.width = tile * GLYPHS.length * 2;
    atlas.height = tile * COLORS.length * 2;
    const ink = atlas.getContext('2d')!;
    ink.scale(2, 2);
    ink.font = `${size}px Consolas, 'Liberation Mono', monospace`;
    ink.textAlign = 'center';
    ink.textBaseline = 'middle';
    COLORS.forEach((color, row) => {
      ink.fillStyle = color;
      Array.from(GLYPHS).forEach((glyph, column) => ink.fillText(glyph, (column + .5) * tile, (row + .5) * tile));
    });
  };

  return (width: number, height: number, time: number, pointer: CloudPointer, delta: number, still: boolean) => {
    if (!width || !height) return;
    context.clearRect(0, 0, width, height);
    const compact = width < 500;
    prepareGlyphs(compact ? 8 : 10);
    const yaw = Math.sin(time * .48) * .42 + pointer.tiltX * .65;
    const pitch = Math.sin(time * .34) * .14 - pointer.tiltY * .35;
    const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
    const scale = Math.min(width / 3.25, (height - 70) / (compact ? 1.9 : 1.55));
    const arrival = still ? 0 : Math.exp(-time * 2.4);
    const radius = compact ? 65 : 105;
    const step = Math.min(delta, 1 / 30);
    const damping = Math.exp(-7 * step);

    for (const particle of particles) {
      // Rolling lobes make the silhouette visibly breathe even without a cursor.
      const wave = Math.sin(time * 1.25 + particle.puffIndex * 1.4);
      const px = particle.x + particle.nx * wave * .055;
      const py = particle.y + Math.sin(time * .9 + particle.x * 2.5) * .075;
      const pz = particle.z + particle.nz * wave * .055;
      const rx = px * cy + pz * sy;
      const rz = pz * cy - px * sy;
      const ry = py * cp - rz * sp;
      const depth = py * sp + rz * cp;
      const perspective = 3.5 / (3.5 - depth);
      const spread = 1 + arrival * .4;
      const x = width * .53 + rx * scale * perspective * spread + Math.sin(time * .5) * 12;
      const y = height * .46 + ry * scale * perspective * spread * (compact ? .82 : .68);
      const dx = x - pointer.x, dy = y - pointer.y;
      const distance = Math.hypot(dx, dy);
      // Twist the existing surface rather than evacuating a circle around the cursor.
      // The Gaussian falloff has no hard boundary, and displacement tends to zero
      // at the center so characters continue to occupy the hovered region.
      const proximity = Math.exp(-distance * distance / (radius * radius * .65)) * pointer.strength;
      const twist = proximity * (.42 + Math.sin(time * .9) * .1) * (.8 + particle.nz * .2);
      const ripple = Math.sin(distance / radius * 5 - time * 2) * proximity * .035;
      const cosine = Math.cos(twist), sine = Math.sin(twist);
      const targetX = (dx * cosine - dy * sine) * (1 + ripple) - dx;
      const targetY = (dx * sine + dy * cosine) * (1 + ripple) - dy;
      if (!still) {
        particle.vx = (particle.vx + (targetX - particle.dx) * 110 * step) * damping;
        particle.vy = (particle.vy + (targetY - particle.dy) * 110 * step) * damping;
        particle.dx += particle.vx * step;
        particle.dy += particle.vy * step;
      }
      const normalZ = particle.nz * cy - particle.nx * sy;
      const light = Math.max(0, Math.min(1, .45 + normalZ * .3 - particle.ny * .25));
      const shade = Math.min(4, Math.floor(light * 5 + proximity));
      const glyph = Math.min(GLYPHS.length - 1, Math.floor(light * (GLYPHS.length - 1)));
      const drawY = y + particle.dy;
      const edgeFade = Math.max(0, Math.min(1, drawY / 30, (height - 55 - drawY) / 25));
      context.globalAlpha = Math.max(.18, Math.min(1, .55 + depth * .4 + proximity * .35)) * edgeFade;
      const size = tile * (.8 + perspective * .2);
      context.drawImage(atlas, glyph * tile * 2, shade * tile * 2, tile * 2, tile * 2,
        x + particle.dx - size / 2, y + particle.dy - size / 2, size, size);
    }
    context.globalAlpha = 1;
  };
}
