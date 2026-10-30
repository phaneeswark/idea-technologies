// 3D version of the Idea Technologies logo, built with Three.js.
// The orange badge, the white "iDEA" letters and the italic "Technologies"
// wordmark are all real extruded, beveled geometry lit by an environment map.
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import boldFontJson from 'three/examples/fonts/helvetiker_bold.typeface.json';

const BRAND = 0xf98b3a;
const font = new FontLoader().parse(boldFontJson);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const easeOutBack = (t) => {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const clamp01 = (v) => Math.min(1, Math.max(0, v));

// Italic slant applied to geometry: x' = x + k * y
function shear(geo, k) {
  const m = new THREE.Matrix4().set(1, k, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  geo.applyMatrix4(m);
  return geo;
}

function glyphAdvance(ch, size) {
  const g = font.data.glyphs[ch] || font.data.glyphs['?'];
  return (g.ha * size) / font.data.resolution;
}

// Build a word as separate per-letter meshes so letters can animate on their own.
function buildWord(text, { size, depth, bevel, italic = 0, material, tracking = 0 }) {
  const group = new THREE.Group();
  let x = 0;
  for (const ch of text) {
    if (ch === ' ') { x += glyphAdvance(' ', size); continue; }
    const geo = new TextGeometry(ch, {
      font, size, depth,
      curveSegments: 10,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel * 0.6,
      bevelSegments: 5,
    });
    if (italic) shear(geo, italic);
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.x = x;
    mesh.userData.homeX = x;
    group.add(mesh);
    x += glyphAdvance(ch, size) + tracking;
  }
  group.userData.width = x - tracking;
  return group;
}

function roundedRect(w, h, r) {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function shadowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grd.addColorStop(0, 'rgba(0,0,0,0.55)');
  grd.addColorStop(0.5, 'rgba(0,0,0,0.18)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const PRESETS = {
  gloss: {
    env: 0.6,
    badge: { color: 0xf2741e, roughness: 0.32, metalness: 0.05, clearcoat: 0.7, clearcoatRoughness: 0.12 },
    letters: { color: 0xffffff, roughness: 0.18, metalness: 0.0, clearcoat: 1, clearcoatRoughness: 0.05 },
  },
  metal: {
    env: 1.6,
    badge: { color: 0xffa25c, roughness: 0.26, metalness: 0.9, clearcoat: 0.6, clearcoatRoughness: 0.1 },
    letters: { color: 0xffffff, roughness: 0.14, metalness: 1, clearcoat: 1, clearcoatRoughness: 0.02 },
  },
  glass: {
    env: 1.0,
    badge: { color: 0xffa25a, roughness: 0.05, metalness: 0, transmission: 0.92, thickness: 0.9, ior: 1.45, clearcoat: 1, attenuationColor: new THREE.Color(BRAND), attenuationDistance: 1.2 },
    letters: { color: 0xffffff, roughness: 0.1, metalness: 0, clearcoat: 1, emissive: 0xffffff, emissiveIntensity: 0.25 },
  },
  matte: {
    env: 0.8,
    badge: { color: 0xf2741e, roughness: 0.75, metalness: 0, clearcoat: 0 },
    letters: { color: 0xfafafa, roughness: 0.7, metalness: 0, clearcoat: 0 },
  },
};

const WORDMARK = {
  dark: { color: 0xf6f7fa, roughness: 0.25, metalness: 0.3, clearcoat: 1, clearcoatRoughness: 0.08 },
  light: { color: 0x3b3736, roughness: 0.3, metalness: 0.25, clearcoat: 1, clearcoatRoughness: 0.1 },
};

/**
 * Mount the 3D logo into a container element.
 * options:
 *   theme: 'dark' | 'light'
 *   preset: 'gloss' | 'metal' | 'glass' | 'matte'
 *   interactive: 'tilt' (follows pointer) | 'orbit' (drag to rotate)
 *   particles: boolean, orbiting particle ring
 *   wordmark: boolean, include "Technologies"
 *   intro: boolean, play the build-in animation
 */
export function createLogo3D(container, options = {}) {
  const opts = {
    theme: 'dark', preset: 'gloss', interactive: 'tilt',
    particles: true, wordmark: true, intro: true, autoRotate: false, margin: 1.12,
    ...options,
  };

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 0.92;
  renderer.domElement.className = 'logo3d-canvas';
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.6;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);

  // Lights: a key light, an orange rim, and a moving "glint" light that sweeps the face.
  const key = new THREE.DirectionalLight(0xffffff, 1.25);
  key.position.set(-4, 6, 8);
  scene.add(key);
  const rim = new THREE.PointLight(BRAND, 40, 30);
  rim.position.set(6, 2, -4);
  scene.add(rim);
  const glint = new THREE.PointLight(0xffffff, 0, 12);
  glint.position.set(-8, 1, 3);
  scene.add(glint);
  scene.add(new THREE.HemisphereLight(0xbfd4ff, 0x2a1a10, 0.35));

  // ---------- Logo geometry ----------
  const root = new THREE.Group();     // receives pointer tilt
  const logo = new THREE.Group();     // centered logo
  root.add(logo);
  scene.add(root);

  const badgeMat = new THREE.MeshPhysicalMaterial();
  const letterMat = new THREE.MeshPhysicalMaterial();
  const wordMat = new THREE.MeshPhysicalMaterial();

  // "iDEA": a taller italic "i" followed by "DEA"
  const capSize = 1.0;
  const iWord = buildWord('i', { size: capSize * 1.32, depth: 0.22, bevel: 0.035, italic: 0.28, material: letterMat });
  const deaWord = buildWord('DEA', { size: capSize, depth: 0.22, bevel: 0.035, material: letterMat, tracking: 0.04 });
  const ideaGroup = new THREE.Group();
  ideaGroup.add(iWord, deaWord);
  deaWord.position.x = iWord.userData.width + 0.3;
  const ideaWidth = deaWord.position.x + deaWord.userData.width;

  const padX = 0.62, padY = 0.5;
  const badgeW = ideaWidth + padX * 2;
  const badgeH = capSize + padY * 2;
  const badgeDepth = 0.42;
  const badgeBevel = 0.09;
  const badgeGeo = new THREE.ExtrudeGeometry(roundedRect(badgeW, badgeH, 0.42), {
    depth: badgeDepth, bevelEnabled: true, bevelThickness: badgeBevel, bevelSize: badgeBevel,
    bevelSegments: 8, curveSegments: 24,
  });
  badgeGeo.translate(0, 0, -badgeDepth / 2);
  const badge = new THREE.Mesh(badgeGeo, badgeMat);

  const badgeGroup = new THREE.Group();
  badgeGroup.add(badge);
  ideaGroup.position.set(-ideaWidth / 2 - 0.05, -capSize / 2, badgeDepth / 2 + badgeBevel - 0.02);
  badgeGroup.add(ideaGroup);
  logo.add(badgeGroup);

  // "Technologies" wordmark, italic, beside the badge
  let word = null;
  let totalW = badgeW;
  if (opts.wordmark) {
    word = buildWord('Technologies', { size: 1.02, depth: 0.28, bevel: 0.03, italic: 0.22, material: wordMat, tracking: 0.0 });
    const gap = 0.55;
    word.position.set(badgeW / 2 + gap, -0.5, -0.06);
    logo.add(word);
    totalW = badgeW + gap + word.userData.width;
  }
  // center everything
  badgeGroup.position.x = -totalW / 2 + badgeW / 2;
  if (word) word.position.x += badgeGroup.position.x;

  // Soft contact shadow
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(totalW * 1.25, 2.2),
    new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false, opacity: 0.6 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -badgeH / 2 - 0.75;
  root.add(shadow);

  // Orbiting particle ring
  let particles = null;
  if (opts.particles) {
    const count = 420;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c1 = new THREE.Color(BRAND), c2 = new THREE.Color(0x7aa7ff), c3 = new THREE.Color(0xffffff);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = totalW * 0.62 + (Math.random() - 0.5) * 1.4;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.9;
      pos[i * 3 + 2] = Math.sin(a) * r * 0.42;
      const c = [c1, c2, c3][i % 3];
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    particles = new THREE.Points(g, new THREE.PointsMaterial({
      size: 0.045, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false,
      blending: THREE.AdditiveBlending,
    }));
    particles.rotation.x = 0.18;
    root.add(particles);
  }

  // ---------- Materials ----------
  function applyMaterial(mat, props) {
    // reset optional physical props before applying a preset
    Object.assign(mat, {
      transmission: 0, thickness: 0, ior: 1.5, emissiveIntensity: 0,
      attenuationDistance: Infinity,
    });
    mat.emissive.set(0x000000);
    mat.attenuationColor.set(0xffffff);
    for (const [k, v] of Object.entries(props)) {
      if (k === 'color' || k === 'emissive') mat[k].set(v);
      else if (k === 'attenuationColor') mat.attenuationColor.copy(v);
      else mat[k] = v;
    }
    mat.needsUpdate = true;
  }
  function setPreset(name) {
    const p = PRESETS[name] || PRESETS.gloss;
    opts.preset = name;
    scene.environmentIntensity = p.env ?? 0.6;
    applyMaterial(badgeMat, p.badge);
    applyMaterial(letterMat, p.letters);
    if (name === 'metal') applyMaterial(wordMat, { color: opts.theme === 'dark' ? 0xffffff : 0x5a5554, roughness: 0.18, metalness: 1, clearcoat: 1 });
    else applyMaterial(wordMat, WORDMARK[opts.theme]);
  }
  function setTheme(theme) {
    opts.theme = theme;
    shadow.material.opacity = theme === 'dark' ? 0.75 : 0.35;
    setPreset(opts.preset);
  }
  setTheme(opts.theme);

  // ---------- Camera fit ----------
  function fit() {
    const w = container.clientWidth || 1, h = container.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const needW = (totalW * opts.margin) / 2;
    const needH = ((badgeH + 0.8) * opts.margin) / 2;
    const distW = needW / (Math.tan(vFov / 2) * camera.aspect);
    const distH = needH / Math.tan(vFov / 2);
    const dist = Math.max(distW, distH) + 1.2;
    camera.position.set(0, 0.55, dist);
    camera.lookAt(0, -0.1, 0);
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(fit);
  ro.observe(container);
  fit();

  // ---------- Interaction ----------
  let controls = null;
  const pointer = { x: 0, y: 0 };
  const onPointer = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (opts.interactive === 'orbit') {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 40;
    controls.autoRotateSpeed = 1.6;
    controls.autoRotate = opts.autoRotate;
  } else {
    window.addEventListener('pointermove', onPointer, { passive: true });
  }

  // ---------- Intro animation ----------
  const letters = [...iWord.children, ...deaWord.children];
  const wordLetters = word ? [...word.children] : [];
  const playIntro = opts.intro && !reducedMotion;
  let introStart = performance.now();

  function introFrame(now) {
    const t = (now - introStart) / 1000;
    // badge pops and spins in
    const tb = clamp01(t / 1.1);
    const s = playIntro ? Math.max(0.0001, easeOutBack(tb)) : 1;
    badge.scale.setScalar(s);
    badgeGroup.rotation.y = playIntro ? (1 - easeOutCubic(tb)) * -1.6 : 0;
    // iDEA letters drop onto the badge
    letters.forEach((m, i) => {
      const tl = clamp01((t - 0.55 - i * 0.09) / 0.55);
      const e = playIntro ? easeOutBack(tl) : 1;
      m.position.z = (1 - e) * 2.2;
      m.scale.setScalar(Math.max(0.0001, e));
    });
    // Technologies letters rise in a wave
    wordLetters.forEach((m, i) => {
      const tl = clamp01((t - 0.9 - i * 0.05) / 0.6);
      const e = playIntro ? easeOutCubic(tl) : 1;
      m.position.y = (1 - e) * -1.4;
      m.position.x = m.userData.homeX;
      m.scale.setScalar(Math.max(0.0001, e));
    });
    return t;
  }

  // ---------- Loop ----------
  let raf = 0, running = false, visible = true;
  const clock = new THREE.Clock();
  function frame(now) {
    raf = requestAnimationFrame(frame);
    const t = clock.getElapsedTime();
    const it = introFrame(now);

    if (!reducedMotion) {
      logo.position.y = Math.sin(t * 0.9) * 0.07;
      // glint sweep every ~6 s
      const sweep = ((t + 2) % 6) / 6;
      glint.position.x = -9 + sweep * 18;
      glint.intensity = it > 1.5 ? Math.sin(sweep * Math.PI) * 26 : 0;
      if (particles) particles.rotation.y = t * 0.08;
      // gentle wave through the wordmark after the intro
      if (it > 2.2) wordLetters.forEach((m, i) => { m.position.y = Math.sin(t * 2 - i * 0.45) * 0.035; });
    }

    if (controls) {
      controls.update();
    } else {
      const tx = reducedMotion ? 0 : pointer.y * 0.18;
      const ty = reducedMotion ? 0 : pointer.x * 0.42 + Math.sin(t * 0.4) * 0.05;
      root.rotation.x += (tx - root.rotation.x) * 0.06;
      root.rotation.y += (ty - root.rotation.y) * 0.06;
    }
    renderer.render(scene, camera);
  }
  function start() { if (!running && visible) { running = true; clock.start(); raf = requestAnimationFrame(frame); } }
  function stop() { running = false; cancelAnimationFrame(raf); }

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visible && !document.hidden ? start() : stop();
  });
  io.observe(container);
  const onVis = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVis);
  start();

  return {
    setTheme,
    setPreset,
    setAutoRotate(v) { if (controls) controls.autoRotate = v; },
    replay() { introStart = performance.now(); },
    resetView() { if (controls) { controls.reset(); fit(); } },
    // Render a high-resolution transparent PNG of the current view.
    exportPNG(width = 3200) {
      const w = container.clientWidth, h = container.clientHeight;
      const ratio = renderer.getPixelRatio();
      renderer.setPixelRatio(1);
      renderer.setSize(width, Math.round((width * h) / w), false);
      renderer.render(scene, camera);
      const url = renderer.domElement.toDataURL('image/png');
      renderer.setPixelRatio(ratio);
      renderer.setSize(w, h, false);
      renderer.render(scene, camera);
      return url;
    },
    dispose() {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onPointer);
      controls?.dispose();
      scene.traverse((o) => {
        o.geometry?.dispose();
        if (o.material) [].concat(o.material).forEach((m) => { m.map?.dispose(); m.dispose(); });
      });
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
