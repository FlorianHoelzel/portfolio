// Project soft 3D puffs onto a character grid. All animation stays on the canvas.
const GLYPHS = '.,:;+=*ox%#@';
const PUFFS = [
  { x: -.85, y: .2, z: .1, radius: .42 },
  { x: -.5, y: -.04, z: -.16, radius: .52 },
  { x: -.12, y: -.3, z: .2, radius: .58 },
  { x: .42, y: -.13, z: -.12, radius: .56 },
  { x: .88, y: .21, z: .1, radius: .42 },
  { x: .1, y: .28, z: .26, radius: .65 },
];

export function drawAsciiCloud(context: CanvasRenderingContext2D, width: number, height: number, time: number, compact: boolean) {
  context.clearRect(0, 0, width, height);
  const columns = compact ? 64 : 100;
  const cellWidth = width / columns;
  const cellHeight = cellWidth * 1.6;
  const rows = Math.floor(height / cellHeight);
  const yaw = Math.sin(time * .14) * .28;
  const driftX = Math.sin(time * .1) * .08;
  const driftY = Math.sin(time * .19) * .04;
  const puffs = PUFFS.map((puff, index) => ({
    x: puff.x * Math.cos(yaw) + puff.z * Math.sin(yaw) + driftX,
    y: puff.y + Math.sin(time * .23 + index * 1.7) * .035 + driftY,
    radius: puff.radius * (1 + Math.sin(time * .21 + index) * .045),
  }));
  context.font = `${Math.max(7, cellWidth * 1.15)}px Consolas, 'Liberation Mono', monospace`;
  context.textBaseline = 'middle';
  context.textAlign = 'center';
  const colors = ['#53687d', '#647c94', '#7f9bb6', '#9cb5cb', '#b9cdf0'];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const x = (column / columns - .5) * 3.6;
      const y = (row / rows - .5) * 2.5;
      let density = 0;
      let light = 0;
      for (const puff of puffs) {
        const dx = (x - puff.x) / puff.radius;
        const dy = (y - puff.y) / puff.radius;
        const contribution = Math.exp(-(dx * dx + dy * dy) * 2.7);
        density += contribution;
        light += contribution * (-dy * .3 - dx * .14 + .48);
      }
      const grain = Math.sin(x * 14 + time * .35) * Math.sin(y * 17 - time * .23) * .07;
      const edge = Math.min(1, Math.max(0, (density + grain - .19) * 1.4));
      if (edge < .025) continue;
      const shade = Math.min(1, Math.max(0, light / Math.max(.01, density)));
      const ink = Math.min(.999, edge * (.28 + shade * .72));
      const character = GLYPHS[Math.floor(ink * GLYPHS.length)];
      context.fillStyle = colors[Math.min(colors.length - 1, Math.floor(shade * colors.length))];
      context.globalAlpha = Math.min(1, edge * 1.6);
      context.fillText(character, (column + .5) * cellWidth, (row + .5) * cellHeight);
    }
  }
  context.globalAlpha = 1;
}
