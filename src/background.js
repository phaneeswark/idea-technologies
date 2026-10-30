// Full-page animated "network" background: drifting nodes linked by lines,
// gently pulled toward the pointer. Pauses when the tab is hidden.
export function createNetworkBackground(canvas) {
  const ctx = canvas.getContext('2d');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w = 0, h = 0, dpr = 1, nodes = [], raf = 0;
  const mouse = { x: -9999, y: -9999 };
  let colors = readColors();

  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    return {
      node: cs.getPropertyValue('--net-node').trim() || 'rgba(249,139,58,0.8)',
      line: cs.getPropertyValue('--net-line').trim() || '120,140,180',
      accent: cs.getPropertyValue('--net-accent').trim() || '249,139,58',
    };
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(110, (w * h) / 15000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.6,
      hot: Math.random() < 0.18,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const maxD = 140;
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      if (!reduced) {
        const dx = mouse.x - a.x, dy = mouse.y - a.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 200 * 200) { a.vx += dx * 0.00004; a.vy += dy * 0.00004; }
        a.vx *= 0.995; a.vy *= 0.995;
        a.x += a.vx; a.y += a.vy;
        if (a.x < -20) a.x = w + 20; if (a.x > w + 20) a.x = -20;
        if (a.y < -20) a.y = h + 20; if (a.y > h + 20) a.y = -20;
      }
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d = Math.hypot(dx, dy);
        if (d < maxD) {
          const o = (1 - d / maxD) * 0.35;
          ctx.strokeStyle = `rgba(${a.hot || b.hot ? colors.accent : colors.line},${o})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.fillStyle = a.hot ? `rgba(${colors.accent},0.9)` : colors.node;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    }
    // pointer halo
    if (mouse.x > -999) {
      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
      g.addColorStop(0, `rgba(${colors.accent},0.08)`);
      g.addColorStop(1, `rgba(${colors.accent},0)`);
      ctx.fillStyle = g; ctx.fillRect(mouse.x - 220, mouse.y - 220, 440, 440);
    }
  }

  function loop() { draw(); raf = requestAnimationFrame(loop); }

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    cancelAnimationFrame(raf);
    if (!document.hidden && !reduced) loop();
  });
  reduced ? draw() : loop();

  return { refreshColors() { colors = readColors(); if (reduced) draw(); } };
}
