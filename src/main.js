import './styles.css';
import { pages, searchIndex } from './pages.js';
import { services, company, dir } from './data.js';
import { icon } from './icons.js';
import { createNetworkBackground } from './background.js';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const app = $('#app');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The 3D module (Three.js) is loaded on demand so the first paint stays fast.
let logoModule = null;
const loadLogo = () => (logoModule ??= import('./logo3d.js'));
let activeLogo = null;

/* ---------------- Theme ---------------- */
const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } },
};
function currentTheme() { return document.documentElement.dataset.theme; }
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  $('meta[name="theme-color"]').setAttribute('content', t === 'dark' ? '#070B14' : '#F7F7F9');
  $$('[data-theme-toggle]').forEach((b) => {
    b.innerHTML = icon(t === 'dark' ? 'sun' : 'moon');
    b.setAttribute('aria-label', `Switch to ${t === 'dark' ? 'light' : 'dark'} theme`);
  });
  bg?.refreshColors();
  activeLogo?.setTheme(t);
}
function toggleTheme() {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  store.set('theme', next);
  applyTheme(next);
}
const initialTheme = store.get('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
document.documentElement.dataset.theme = initialTheme;
const bg = createNetworkBackground($('#bg-net'));
applyTheme(initialTheme);

/* ---------------- Toast ---------------- */
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.innerHTML = `${icon('check')} ${msg}`;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}
async function copyText(text) {
  try { await navigator.clipboard.writeText(text); } catch {
    const ta = Object.assign(document.createElement('textarea'), { value: text });
    document.body.append(ta); ta.select(); document.execCommand('copy'); ta.remove();
  }
  toast(`Copied ${text}`);
}

/* ---------------- Router ---------------- */
const routes = {
  '/': 'home', '/company': 'company', '/about': 'company', '/services': 'services', '/clients': 'clients',
  '/dir': 'dir', '/careers': 'careers', '/contact': 'contact', '/legal': 'legal',
};
function parseHash() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [pathAndQuery, anchor] = raw.split('#');
  const [path, query] = pathAndQuery.split('?');
  return { path: path || '/', anchor, params: new URLSearchParams(query || '') };
}

let firstRender = true;
const pageCleanups = []; // run when leaving a page (timers, listeners)
async function render() {
  const { path, anchor, params } = parseHash();
  const key = routes[path] || 'notFound';
  const page = pages[key];

  if (!firstRender && !reduced) {
    app.classList.add('leaving');
    await new Promise((r) => setTimeout(r, 180));
  }
  activeLogo?.dispose();
  activeLogo = null;
  pageCleanups.splice(0).forEach((fn) => fn());

  app.innerHTML = page.render();
  document.title = page.title;
  app.classList.remove('leaving');
  app.classList.add('entering');
  requestAnimationFrame(() => requestAnimationFrame(() => app.classList.remove('entering')));

  $$('.nav a[data-route]').forEach((a) => a.classList.toggle('active', a.dataset.route === key));
  closeMobileNav();

  if (anchor) setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
  else window.scrollTo({ top: 0, behavior: firstRender ? 'auto' : 'instant' });

  initPage(key, params);
  firstRender = false;
  app.focus({ preventScroll: true });
}
window.addEventListener('hashchange', render);

/* ---------------- Per-page features ---------------- */
function initPage(key, params) {
  initReveals();
  initCounters();
  initTilt();
  initMagnetic();

  $$('[data-logo-carousel]').forEach(initLogoCarousel);

  if (key === 'home') {
    const stage = $('[data-logo3d]');
    loadLogo().then(({ createLogo3D }) => {
      if (!stage.isConnected) return;
      activeLogo = createLogo3D(stage, { theme: currentTheme(), interactive: 'tilt' });
      stage.classList.add('ready');
    });
  }
  if (key === 'clients') initClientFilter();
  if (key === 'dir') initRoleSearch();
  if (key === 'contact') initContactForm(params);
}

function initReveals() {
  const els = $$('.reveal');
  if (reduced) { els.forEach((e) => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach((e) => io.observe(e));
}

function initCounters() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const el = en.target;
      const end = +el.dataset.count;
      const plain = 'plain' in el.dataset;
      const start = plain ? end - 60 : 0;
      const suffix = el.dataset.suffix || '';
      const dur = reduced ? 0 : 1600;
      const t0 = performance.now();
      const step = (now) => {
        const p = dur ? Math.min(1, (now - t0) / dur) : 1;
        const v = Math.round(start + (end - start) * (1 - Math.pow(1 - p, 4)));
        el.textContent = v + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  $$('[data-count]').forEach((e) => io.observe(e));
}

function initTilt() {
  if (reduced || !matchMedia('(hover: hover)').matches) return;
  $$('.tilt').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
      card.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
      card.style.setProperty('--mx', `${x * 100}%`);
      card.style.setProperty('--my', `${y * 100}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });
}

function initMagnetic() {
  if (reduced || !matchMedia('(hover: hover)').matches) return;
  $$('.magnetic').forEach((b) => {
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.15}px, ${(e.clientY - r.top - r.height / 2) * 0.25}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
}

// Client logo carousel: shows --per-view logos, advances one at a time in an
// endless loop, with dots, arrows, swipe, and pause on hover/focus.
function initLogoCarousel(root) {
  const viewport = $('.lc-viewport', root);
  const track = $('.lc-track', root);
  const originals = $$('.lc-slide', track);
  const dots = $$('[data-lc-dot]', root);
  const n = originals.length;
  // Clone the first slides onto the end so the loop wraps seamlessly.
  originals.slice(0, Math.min(n, 6)).forEach((s) => {
    const c = s.cloneNode(true);
    c.setAttribute('aria-hidden', 'true');
    $('img', c).alt = '';
    track.append(c);
  });

  let index = 0, timer = 0, paused = false;
  const perView = () => parseInt(getComputedStyle(root).getPropertyValue('--per-view'), 10) || 6;
  const slideW = () => viewport.clientWidth / perView();

  function go(i, animate = true) {
    track.style.transition = animate && !reduced ? 'transform .7s cubic-bezier(.2,.8,.2,1)' : 'none';
    track.style.transform = `translateX(${-i * slideW()}px)`;
    const active = ((i % n) + n) % n;
    dots.forEach((d, k) => {
      d.classList.toggle('active', k === active);
      k === active ? d.setAttribute('aria-current', 'true') : d.removeAttribute('aria-current');
    });
  }
  function jump(i) { index = i; go(index, false); void track.offsetWidth; } // reposition without animating
  function next() { if (index >= n) jump(index - n); index++; go(index); }
  function prev() { if (index <= 0) jump(index + n); index--; go(index); }
  track.addEventListener('transitionend', () => { if (index >= n) jump(index - n); });

  $('[data-lc-next]', root).addEventListener('click', () => { next(); restart(); });
  $('[data-lc-prev]', root).addEventListener('click', () => { prev(); restart(); });
  dots.forEach((d) => d.addEventListener('click', () => { index = +d.dataset.lcDot; go(index); restart(); }));

  // Swipe / drag
  let startX = null;
  viewport.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  viewport.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); restart(); }
  });

  // Autoplay
  function start() { if (!reduced && !timer) timer = setInterval(() => { if (!paused && !document.hidden) next(); }, 2600); }
  function stop() { clearInterval(timer); timer = 0; }
  function restart() { stop(); start(); }
  root.addEventListener('pointerenter', () => { paused = true; });
  root.addEventListener('pointerleave', () => { paused = false; });
  root.addEventListener('focusin', () => { paused = true; });
  root.addEventListener('focusout', () => { paused = false; });

  const onResize = () => go(index, false);
  window.addEventListener('resize', onResize);
  go(0, false);
  start();
  pageCleanups.push(() => { stop(); window.removeEventListener('resize', onResize); });
}

function initClientFilter() {
  let filter = 'all', q = '';
  const cards = $$('.client-card');
  const apply = () => {
    let shown = 0;
    cards.forEach((c) => {
      const ok = (filter === 'all' || c.dataset.type === filter) && c.dataset.name.includes(q);
      c.hidden = !ok;
      if (ok) shown++;
    });
    $('[data-client-empty]').hidden = shown > 0;
  };
  $$('.tab[data-filter]').forEach((t) => t.addEventListener('click', () => {
    $$('.tab[data-filter]').forEach((x) => { x.classList.remove('active'); x.setAttribute('aria-selected', 'false'); });
    t.classList.add('active'); t.setAttribute('aria-selected', 'true');
    filter = t.dataset.filter; apply();
  }));
  $('[data-client-search]').addEventListener('input', (e) => { q = e.target.value.trim().toLowerCase(); apply(); });
}

function initRoleSearch() {
  const roles = $$('[data-role-grid] .role');
  $('[data-role-search]').addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    roles.forEach((r) => { r.hidden = !r.dataset.name.includes(q); });
  });
}

function initContactForm(params) {
  const form = $('[data-contact-form]');
  const interest = params.get('interest');
  if (interest) {
    const map = { 'Staffing Solutions': 'Staff Augmentation' };
    const target = map[interest] || 'Application Development / Support';
    const box = $$('input[name="interest"]', form).find((i) => i.value === target);
    if (box) box.checked = true;
    form.message.value = `I'd like to discuss ${interest}.`;
  }
  const submitBtn = $('[data-submit]', form);
  const errorBox = $('.form-error', form);
  const success = $('.form-success', form);

  const showError = (msg) => {
    errorBox.innerHTML = msg;
    errorBox.hidden = false;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorBox.hidden = true;
    let ok = true;
    $$('[required]', form).forEach((f) => {
      const valid = f.value.trim() && (f.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value));
      f.closest('.field').classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    if (!ok) { toast('Please complete the required fields'); $('.invalid input', form)?.focus(); return; }

    const fd = new FormData(form);
    const val = (k) => (fd.get(k) || '').toString().trim();
    const picks = fd.getAll('interest');
    const subject = `Website inquiry${picks.length ? ' — ' + picks[0] : ''}`;

    // No form address yet: open the visitor's email app instead.
    if (!company.formEndpoint) {
      const lines = [`Name: ${val('name')}`];
      if (val('org')) lines.push(`Company/Agency: ${val('org')}`);
      lines.push(`Email: ${val('email')}`);
      if (val('phone')) lines.push(`Phone: ${val('phone')}`);
      if (picks.length) lines.push(`Interested in: ${picks.join(', ')}`);
      lines.push('', val('message'));
      window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      toast('Opening your email app…');
      return;
    }

    const label = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    try {
      // Sent as plain text so the browser makes a simple request that Google Apps Script accepts.
      const res = await fetch(company.formEndpoint, {
        method: 'POST',
        body: JSON.stringify({
          name: val('name'),
          org: val('org'),
          email: val('email'),
          phone: val('phone'),
          interests: picks.join(', '),
          message: val('message'),
          botcheck: Boolean(fd.get('botcheck')),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);

      $('[data-sent-name]', form).textContent = val('name') ? `, ${val('name').split(/\s+/)[0]}` : '';
      $('[data-sent-email]', form).textContent = val('email');
      success.hidden = false;
      form.classList.add('is-sent');
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      form.reset();
    } catch (err) {
      console.warn('Contact form failed:', err);
      showError(`Sorry, your message couldn’t be sent. Please email us at <a href="mailto:${company.email}?subject=${encodeURIComponent(subject)}">${company.email}</a> or call <a href="${company.phoneHref}">${company.phone}</a>.`);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = label;
    }
  });

  $('[data-send-another]', form).addEventListener('click', () => {
    form.classList.remove('is-sent');
    success.hidden = true;
    form.querySelector('input[name="name"]').focus();
  });
  $$('input, textarea', form).forEach((f) => f.addEventListener('input', () => f.closest('.field')?.classList.remove('invalid')));
}

/* ---------------- Global UI ---------------- */
// Service details modal
const modal = $('#service-modal');
function openService(id) {
  const s = services.find((x) => x.id === id);
  if (!s) return;
  $('.modal-body', modal).innerHTML = `
    <span class="icon-tile lg">${icon(s.icon)}</span>
    <h2>${s.title}</h2>
    <p class="muted">${s.long}</p>
    <ul class="checklist">${s.points.map((p) => `<li>${icon('check')} ${p}</li>`).join('')}</ul>
    <div class="hero-cta left">
      <a class="btn btn-primary" href="#/contact?interest=${encodeURIComponent(s.title)}" data-close>Start a conversation ${icon('arrow')}</a>
      <a class="btn btn-ghost" href="#/services#svc-${s.id}" data-close>All services</a>
    </div>`;
  modal.showModal();
}
modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target.closest('[data-close]')) modal.close();
});

// Delegated clicks
document.addEventListener('click', (e) => {
  const svc = e.target.closest('[data-service]');
  if (svc) { openService(svc.dataset.service); return; }
  const cp = e.target.closest('[data-copy]');
  if (cp) { copyText(cp.dataset.copy); return; }
  if (e.target.closest('[data-theme-toggle]')) { toggleTheme(); return; }
  if (e.target.closest('[data-palette-open]')) { openPalette(); return; }
  // in-page anchors (#why) shouldn't trigger the router
  const a = e.target.closest('a[href^="#"]');
  if (a && !a.getAttribute('href').startsWith('#/')) {
    e.preventDefault();
    document.getElementById(a.getAttribute('href').slice(1))?.scrollIntoView({ behavior: 'smooth' });
  }
});

// Header state, scroll progress, back-to-top
const header = $('.site-header');
const progress = $('#progress');
const toTop = $('#to-top');
function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  header.classList.toggle('scrolled', y > 20);
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  toTop.classList.toggle('show', y > 900);
}
window.addEventListener('scroll', onScroll, { passive: true });
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Mobile nav
const navToggle = $('[data-nav-toggle]');
function closeMobileNav() {
  document.body.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.innerHTML = icon('menu');
}
navToggle.addEventListener('click', () => {
  const open = !document.body.classList.contains('nav-open');
  document.body.classList.toggle('nav-open', open);
  navToggle.setAttribute('aria-expanded', open);
  navToggle.innerHTML = icon(open ? 'x' : 'menu');
});

/* ---------------- Command palette (Ctrl/Cmd + K) ---------------- */
const palette = $('#palette');
const pInput = $('#palette-input');
const pList = $('#palette-list');
const index = searchIndex();
let pResults = [], pActive = 0;

function renderPalette() {
  const q = pInput.value.trim().toLowerCase();
  const terms = q.split(/\s+/).filter(Boolean);
  pResults = index
    .map((it) => {
      const hay = `${it.label} ${it.kind}`.toLowerCase();
      if (!terms.every((t) => hay.includes(t))) return null;
      const score = it.label.toLowerCase().startsWith(q) ? 0 : it.kind === 'Page' ? 1 : 2;
      return { ...it, score };
    })
    .filter(Boolean)
    .sort((a, b) => a.score - b.score)
    .slice(0, q ? 12 : 9);
  pActive = Math.min(pActive, Math.max(0, pResults.length - 1));
  pList.innerHTML = pResults.length
    ? pResults.map((r, i) => `
      <li role="option" id="pal-${i}" aria-selected="${i === pActive}" class="${i === pActive ? 'active' : ''}" data-i="${i}">
        ${icon(r.icon)}<span>${r.label}</span><small>${r.kind}</small>
      </li>`).join('')
    : '<li class="none">No results</li>';
  pInput.setAttribute('aria-activedescendant', pResults.length ? `pal-${pActive}` : '');
}
function runPalette(i) {
  const r = pResults[i];
  if (!r) return;
  palette.close();
  if (r.action === 'theme') toggleTheme();
  else if (r.action === 'copy-contract') copyText(dir.contract);
  else if (r.external) window.open(r.href, '_blank', 'noopener');
  else if (r.href.startsWith('#')) {
    if (location.hash === r.href) render(); else location.hash = r.href;
  } else window.location.href = r.href;
}
function openPalette() {
  pInput.value = ''; pActive = 0; renderPalette();
  palette.showModal(); pInput.focus();
}
pInput.addEventListener('input', () => { pActive = 0; renderPalette(); });
pInput.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown') { e.preventDefault(); pActive = (pActive + 1) % Math.max(1, pResults.length); renderPalette(); }
  if (e.key === 'ArrowUp') { e.preventDefault(); pActive = (pActive - 1 + pResults.length) % Math.max(1, pResults.length); renderPalette(); }
  if (e.key === 'Enter') { e.preventDefault(); runPalette(pActive); }
});
pList.addEventListener('click', (e) => { const li = e.target.closest('[data-i]'); if (li) runPalette(+li.dataset.i); });
palette.addEventListener('click', (e) => { if (e.target === palette) palette.close(); });
document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette.open ? palette.close() : openPalette(); }
  if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName) && !palette.open) { e.preventDefault(); openPalette(); }
});
$('.kbd-hint').textContent = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K';

/* ---------------- Boot ---------------- */
$('#year').textContent = new Date().getFullYear();
navToggle.innerHTML = icon('menu');
$$('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
render().then(() => {
  onScroll();
  setTimeout(() => $('#loader')?.classList.add('done'), reduced ? 0 : 500);
});
