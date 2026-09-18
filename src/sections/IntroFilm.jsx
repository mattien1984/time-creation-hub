// The homepage intro film — a scroll-scrubbed cinematic sequence.
// The logo's three rings open the story: they converge and glow (a full-bleed
// video fades in behind), two statements decode themselves letter by letter,
// then the rings separate into the three brands and split into their FULL
// logos — where the film ends. The three logos are the doorways: clickable,
// linking out to each brand's page (per Charlie's structure — the visual
// "lands with them splitting off into the three sections you can click on").
// Ring stroke 1.45 (viewBox units) measured off the real lockup exports
// (5.45u in the 155u mark box); the creator credit + closer live in the
// Footer. All lines are sourced from story.js — one data source.

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GridField from '../components/GridField';
import { BEATS, INTRO_LINES } from '../data/story';
import { HUBS } from '../data/hubs';
import { asset } from '../lib/asset';

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const seg = (p, a, b) => clamp01((p - a) / (b - a));
const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

// ---- decoder text ----
// Slot-based decode: layout is owned by the TARGET characters —
// every glyph renders in the serif from frame one (opacity-toggled inside a
// fixed-advance slot), so the centered, balanced wrap is computed once per
// text and the line never moves a subpixel while it decodes. The churn is
// dim Roobert Semi Mono digits drawn as out-of-flow overlays in the next ≤3
// unresolved slots of the CURRENT word: the decode edge never crosses a
// space, and a word's last two characters resolve together so a stem never
// shows a single welded digit. Each slot rerolls on its own 70–115ms
// time-quantized clock through a per-slot shuffled digit sequence (never the
// same glyph twice in a row, identical on every visit), resolves at its own
// staggered threshold through a two-layer micro-crossfade, and a 340ms floor
// settles any slot a slow continuous scroll would otherwise hold churning
// forever — scrubbing backward still un-resolves. Digits, not letters —
// it's time the lines resolve out of.
const CHARS = '0123456789:';
const CHURN_WINDOW = 3; // the decode front is an edge, not a field
const CHURN_LIFE = 340; // ms a slot may churn on screen before it settles

// Deterministic per-slot randomness (mulberry32) — no Math.random in render;
// the film decodes identically on every visit.
const mulberry32 = (seed) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const hashText = (s) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i += 1) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
};

// The line's static skeleton: words (atomic, wrap as units) of fixed-advance
// character slots, whitespace passed through between them. Built once per
// text via useMemo.
function buildPlan(text) {
  const seedBase = hashText(text);
  const tokens = [];
  let idx = 0;
  for (const part of text.split(/(\s+)/)) {
    if (!part) continue;
    if (/\s/.test(part[0])) {
      tokens.push({ sep: part, key: `s${idx}` });
      idx += part.length;
      continue;
    }
    const slots = [];
    for (const ch of part) {
      const rand = mulberry32(seedBase ^ Math.imul(idx + 1, 0x9e3779b9));
      const jitter = rand();
      // shuffled digit sequence — 11 distinct glyphs, so consecutive
      // rerolls can never show the same digit twice
      const seq = CHARS.split('');
      for (let a = seq.length - 1; a > 0; a -= 1) {
        const b = (rand() * (a + 1)) | 0;
        [seq[a], seq[b]] = [seq[b], seq[a]];
      }
      slots.push({
        ch,
        idx,
        // Staggered thresholds: monotonic L→R (index gap 1 > jitter spread
        // 0.65), max n−0.3 so lock=1 always fully resolves, min 0.05 so
        // lock=0 shows a clean unresolved cluster.
        threshold: idx + 0.05 + 0.65 * jitter,
        settle: Math.round(20 + 55 * jitter), // per-slot resolve delay (ms)
        period: 70 + Math.round(45 * rand()), // per-slot reroll clock (ms)
        phase: Math.round(1000 * rand()),
        seq: seq.join(''),
        last: '', // frozen final digit — dissolves under the arriving serif
        pair: null,
      });
      idx += 1;
    }
    // Word-tail pairing: a resolved stem never strands a single digit —
    // the final two characters of a word land as one event.
    if (slots.length >= 2) {
      const a2 = slots[slots.length - 2];
      const b2 = slots[slots.length - 1];
      b2.threshold = a2.threshold + 0.001;
      b2.settle = a2.settle + 30;
      a2.pair = b2;
    }
    tokens.push({ slots, key: `w${slots[0].idx}` });
  }
  return { tokens, n: text.length };
}

function ScrambleText({ text, lock }) {
  const plan = useMemo(() => buildPlan(text), [text]);
  // Render-phase bookkeeping for the time floor — safe here: renders are
  // driven by the parent's rAF loop, every mutation is idempotent per
  // timestamp (StrictMode double-render produces identical results), and
  // the refs reset with the component when a beat unmounts.
  const stampsRef = useRef(new Map()); // slot idx → first time it churned
  const forcedRef = useRef(new Set()); // slots resolved by the time floor
  const prevFRef = useRef(0);

  const now = performance.now();
  const F = clamp01(lock) * plan.n; // decode front, in slots
  const stamps = stampsRef.current;
  const forced = forcedRef.current;

  // Scrubbing backward hands characters back to the churn.
  if (F < prevFRef.current - 0.5) {
    forced.forEach((i) => { if (i >= F) forced.delete(i); });
    stamps.forEach((_, i) => { if (i >= F) stamps.delete(i); });
  }
  prevFRef.current = F;

  const isResolved = (s) => s.threshold <= F || forced.has(s.idx);

  // The churn window: the next ≤3 unresolved slots of the current word —
  // the decode edge never crosses a space, and the window shrinks with the
  // word's remainder.
  let churn = null;
  if (F < plan.n) {
    for (const tok of plan.tokens) {
      if (!tok.slots) continue;
      const open = tok.slots.filter((s) => !isResolved(s));
      if (open.length) {
        churn = open.slice(0, CHURN_WINDOW);
        break;
      }
    }
  }
  // Time floor: a slot that has churned on screen ≥ CHURN_LIFE settles even
  // under a slow continuous scroll (the case the idle settle never catches,
  // because any drift keeps `moved` true) — no half-decoded purgatory. The
  // scrub and the idle settle still drive the front; this only caps how
  // long any one slot may flicker.
  if (churn) {
    for (const s of churn) {
      if (!stamps.has(s.idx)) stamps.set(s.idx, now);
      else if (now - stamps.get(s.idx) > CHURN_LIFE) {
        forced.add(s.idx);
        if (s.pair) forced.add(s.pair.idx); // keep word tails paired
      }
    }
    churn = churn.filter((s) => !forced.has(s.idx));
  }
  const churnSet = churn && churn.length ? new Set(churn.map((s) => s.idx)) : null;

  return (
    <>
      {plan.tokens.map((tok) => {
        if (tok.sep != null) return <span key={tok.key}>{tok.sep}</span>;
        return (
          <span key={tok.key} className="film__word">
            {tok.slots.map((s) => {
              const res = isResolved(s);
              const on = !res && churnSet != null && churnSet.has(s.idx);
              if (on) {
                // Per-slot quantized clock: the digit advances every
                // `period` ms no matter how often React renders — 60–120Hz
                // scrub renders between beats diff to zero DOM writes.
                const tick = Math.floor((now + s.phase) / s.period);
                s.last = s.seq[tick % s.seq.length];
              }
              return (
                <span
                  key={s.idx}
                  className={`film__slot${res ? ' is-resolved' : on ? ' is-churn' : ''}`}
                  style={{ '--settle': `${s.settle}ms` }}
                >
                  <span className="film__char">{s.ch}</span>
                  <span className="film__churn" aria-hidden="true">{s.last}</span>
                </span>
              );
            })}
          </span>
        );
      })}
    </>
  );
}

// One lock curve for every decode in the film — fast off the line, easing
// into stillness.
const lockEase = (t) => 1 - (1 - t) * (1 - t) * (1 - t);

// lock/opacity for one decoder beat: entrance first (opacity completes at
// u = 0.045), decode second (lock runs u = 0.05 → 0.30, eased out) → long
// clean hold → fade. The line's first frame is a dim mono digit cluster,
// fully present, THEN the front moves — a clean downbeat instead of
// decoding mid-fade-in.
function beatState(p, [a, b]) {
  const u = seg(p, a, b);
  if (u <= 0 || u >= 1) return { on: false, lock: 0, opacity: 0 };
  const lock = lockEase(seg(u, 0.05, 0.3));
  const opacity = clamp01(Math.min(u / 0.045, (1 - u) / 0.08, 1));
  return { on: true, lock, opacity, scrambling: lock < 1 };
}

// ---- timeline (progress 0..1 over the film's scroll run) ----
// Four decoder beats (received intro copy, Sep 17).
// Separation act: the mark's rings break apart horizontally to ±S, then IN
// PLACE each single ring splits into its brand's three-ring mark (shrinking
// to lockup scale) and the wordmark fades in beside it — the full logos,
// side by side. The reunion merges each mark back to a single ring and
// pulls them home to re-form the umbrella mark.
const T = {
  glow: [0.05, 0.11],
  video: [0.08, 0.16],
  beats: [
    [0.12, 0.225],
    [0.235, 0.34],
    [0.35, 0.435],
    [0.445, 0.53],
  ],
  markDrop: [0.53, 0.565], // mark settles to center before the universe line opens
  separate: [0.56, 0.68],
  split: [0.7, 0.76], // single ring → the brand's three-ring mark, in place
  word: [0.77, 0.83], // wordmark reveal beside the formed mark
  universeIn: [0.565, 0.61],
  universeLock: [0.585, 0.66],
  // Final act: the logos glide onto their photography cards under a
  // "Brands" header; a hairline divider hands off to the "Resources"
  // panel — one bordered container with three icon rows, so the shared
  // links read as one site-level object, not per-brand children.
  universeOut: [0.85, 0.89],
  entities: [0.87, 0.94],
  buttons: [0.92, 0.97],
};
const SCRAMBLE_WINDOWS = T.beats;
const SHARED_LINKS = [
  { label: 'Design System', to: '/system', icon: 'layers' },
  { label: 'Glossary of Terms', to: '/glossary', icon: 'book' },
  { label: 'Brand Assets', to: '/library', icon: 'folder' },
];
// Minimal line icons for the Resources rows — stacked layers, open
// book, folder — in the same thin-stroke voice as the rings.
const RESOURCE_ICONS = {
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="m3 12.5 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 6.2C10.4 4.8 8.3 4 6 4c-1 0-2 .13-3 .4V20c1-.27 2-.4 3-.4 2.3 0 4.4.8 6 2.2 1.6-1.4 3.7-2.2 6-2.2 1 0 2 .13 3 .4V4.4C20 4.13 19 4 18 4c-2.3 0-4.4.8-6 2.2Z" />
      <path d="M12 6.2v15.6" />
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7a2 2 0 0 1 2-2h4.2l2 2.3H19a2 2 0 0 1 2 2v8.7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    </svg>
  ),
};

const videoOpacityAt = (p) =>
  (0.06 + 0.29 * ease(seg(p, ...T.video))) * (1 - 0.68 * ease(seg(p, 0.56, 0.64)));

// The mark's exact ring geometry (viewBox 41.4, center 20.70 / 20.92).
const MARK_SIZE = 164;
const UNIT = MARK_SIZE / 41.4;
const RINGS = [
  // ring index → converged offset (px) and brand when separated.
  // Separated order (left → right): existence, Time Creationism, TCP.
  { dx: 0, dy: (18.39 - 20.92) * UNIT, brand: 'existence', spread: -1 },
  { dx: (18.39 - 20.7) * UNIT, dy: (22.19 - 20.92) * UNIT, brand: 'time-creationism', spread: 0 },
  { dx: (23.01 - 20.7) * UNIT, dy: (22.19 - 20.92) * UNIT, brand: 'time-creation-project', spread: 1 },
];
// Full lockup geometry, measured off the SVG exports (canvas alpha-scan):
// every mark is a 157×154 composite ending at x=157; cx/cy = mark center in
// svg units. The film draws the mark itself (three circles splitting apart),
// so the lockup image is clipped to show ONLY the wordmark (x > 160).
// wu = rendered width per 1px of lockupH (all marks share the 155u ring, so
// TCP's width normalizes to /155 too despite its taller 219u box).
const LOCKUPS = {
  existence: { W: 832, H: 155, cx: 78.5, cy: 77, wu: 832 / 155 },
  // the Time Creationism lockup (1201×155) — same mark path as the others
  'time-creationism': { W: 1201, H: 155, cx: 78.5, cy: 77, wu: 1201 / 155 },
  'time-creation-project': { W: 891, H: 219, cx: 78.5, cy: 88, wu: 891 / 155 },
};
const LOCKUP_ROW = ['existence', 'time-creationism', 'time-creation-project'];
// Ring outer diameter is 140 units of a 155-unit lockup height.
const LOCKUP_RING_RATIO = 140 / 155;
// The mark's ring offsets from its own center, in viewBox units — each
// brand's single ring splits along these into the three-ring mark.
const SPLIT_OFFSETS = [
  [0, 18.39 - 20.92],
  [18.39 - 20.7, 22.19 - 20.92],
  [23.01 - 20.7, 22.19 - 20.92],
];

// Static fallback for prefers-reduced-motion: the lines, plainly.
function StaticIntro({ lines }) {
  // The homepage nav gates on the film reaching its end; with the static
  // fallback there is no film, so the nav is simply on.
  useEffect(() => {
    document.body.classList.add('film-end');
    return () => document.body.classList.remove('film-end');
  }, []);
  return (
    <section className="film film--static">
      <div className="wrap">
        <svg width={MARK_SIZE / 1.6} height={MARK_SIZE / 1.6} viewBox="0 0 41.4 41.4" aria-hidden="true">
          {RINGS.map((r, i) => (
            <circle key={i} cx={20.7 + r.dx / UNIT} cy={20.92 + r.dy / UNIT} r={17.68} fill="none" stroke="#fff" strokeWidth={1.45} />
          ))}
        </svg>
        {lines.map((l) => (
          <p key={l} className="film__static-line">{l}</p>
        ))}
      </div>
    </section>
  );
}

export default function IntroFilm() {
  const ref = useRef(null);
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const activeRef = useRef(true);
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [, setFrame] = useState(0);
  const pRef = useRef(0);
  // 0..1 idle settle: parked mid-decode, this ramps up and resolves the
  // churn window to the real characters; scrubbing decays it back to 0.
  const idleLockRef = useRef(0);
  const [vp, setVp] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  const vw = vp.w;
  const vh = vp.h;

  // Track the OS reduced-motion setting live.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (reduced) return undefined;
    let raf;
    let lastTick = 0;
    let lastMove = 0;
    let lastNow = 0;
    const readP = () => {
      // DEV escape hatch: window.__filmP freezes the film at a progress value
      // so states can be screenshot-tested without scrolling.
      if (import.meta.env.DEV && typeof window.__filmP === 'number') return window.__filmP;
      const el = ref.current;
      const stage = stageRef.current;
      if (!el || !stage) return pRef.current;
      const rect = el.getBoundingClientRect();
      // Measure the run in the same CSS units the section is sized in (svh)
      // so iOS toolbar collapse doesn't re-map progress mid-scroll.
      const run = rect.height - stage.getBoundingClientRect().height;
      return clamp01(run > 0 ? -rect.top / run : 0);
    };
    const update = (now) => {
      const p = readP();
      const dt = Math.min(64, now - lastNow || 16);
      lastNow = now;
      const moved = Math.abs(p - pRef.current) > 0.0004;
      if (moved) lastMove = now;
      const inChurnWindow =
        SCRAMBLE_WINDOWS.some((w) => beatState(p, w).scrambling) ||
        (p > T.universeIn[0] && p < T.universeLock[1]);
      // The digit churn is scrub-driven: it re-rolls only while the user is
      // actually moving. Parked mid-decode, the idle lock ramps in (after a
      // short grace) and the line settles onto its real characters instead
      // of jittering forever; new movement hands control back to the scrub.
      if (moved) {
        idleLockRef.current = Math.max(0, idleLockRef.current - dt / 160);
      } else if (inChurnWindow && now - lastMove > 220) {
        idleLockRef.current = Math.min(1, idleLockRef.current + dt / 550);
      }
      const churning =
        inChurnWindow && (now - lastMove <= 220 || idleLockRef.current < 1);
      const scrambling = churning && now - lastTick > 45;
      if (moved || scrambling) {
        pRef.current = p;
        lastTick = now;
        setFrame((f) => f + 1);
      }
      // Keep the video paused whenever it is invisible.
      const vid = videoRef.current;
      if (vid) {
        const visible = activeRef.current && videoOpacityAt(p) > 0.02;
        if (visible && vid.paused) vid.play().catch(() => {});
        else if (!visible && !vid.paused) vid.pause();
      }
      // The site nav appears once the film reaches its end state
      // (hysteresis so it doesn't flicker at the threshold).
      if (p >= 0.9) document.body.classList.add('film-end');
      else if (p < 0.88) document.body.classList.remove('film-end');
    };
    // Native scroll events keep the film scrubbed even where rAF is throttled
    // (hidden/background tabs); the rAF loop keeps the decoder churning.
    const onScroll = () => update(performance.now());
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (activeRef.current) update(now);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    // Skip all per-frame work once the film is scrolled out of view.
    const io = new IntersectionObserver(([entry]) => {
      activeRef.current = entry.isIntersecting;
      update(performance.now());
    });
    if (ref.current) io.observe(ref.current);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      io.disconnect();
      document.body.classList.remove('film-end');
    };
  }, [reduced]);

  // Four intro beats (received copy, Sep 17) + the universe bridge line.
  const lines = [...INTRO_LINES, BEATS[2].headline];
  // Constant props — never re-render the full-viewport pattern per frame.
  const gridField = useMemo(
    () => <GridField kind="fabric" color="rgba(255,255,255,0.4)" />,
    []
  );
  if (reduced) return <StaticIntro lines={lines} />;

  const p = pRef.current;

  // ---- derived state ----
  const sepAmount = clamp01(1 - ease(seg(p, 0, 0.07)) + ease(seg(p, ...T.separate)));
  const S = Math.min(vw * 0.3, 330); // separation distance
  // In the ±S row, rings must fit three-abreast: cap the separated scale so
  // a ring's radius stays under ~42% of the spacing (narrow viewports).
  const sepScale = Math.min(1.12, (S * 0.42) / (17.68 * UNIT));
  // The formed logos compose as a true row: measured lockup widths, equal
  // gutters (1.5×h), the whole row centered on its total ink width. Rings
  // glide from the ±S grid to these mark positions as they split.
  const lockupH = Math.max(10, Math.min(32, 0.021 * vw));
  const gutter = 1.5 * lockupH;
  const rowWidths = LOCKUP_ROW.map((slug) => LOCKUPS[slug].wu * lockupH);
  const rowTotal = rowWidths[0] + rowWidths[1] + rowWidths[2] + 2 * gutter;
  const markXs = {};
  {
    let cursor = -rowTotal / 2;
    LOCKUP_ROW.forEach((slug, i) => {
      markXs[slug] = cursor + (78.5 / 155) * lockupH; // mark center within its lockup
      cursor += rowWidths[i] + gutter;
    });
  }
  const lockScale = (lockupH * LOCKUP_RING_RATIO) / ((2 * 17.68 + 1.45) * UNIT);
  const splitT = ease(seg(p, ...T.split));
  const wordT = ease(seg(p, ...T.word));
  const markYvh = -14 * (1 - ease(seg(p, ...T.markDrop)));
  const glow = (1 - sepAmount) * ease(seg(p, ...T.glow));
  const video = videoOpacityAt(p);
  // The universe line hands off to the nav copy for the final act.
  const universeOp = seg(p, ...T.universeIn) * (1 - seg(p, ...T.universeOut));
  const universeLock = lockEase(seg(p, ...T.universeLock));
  const entT = ease(seg(p, ...T.entities));
  const btnOp = seg(p, ...T.buttons);
  const live = wordT > 0.9; // the formed logos are clickable from formation on
  // End-frame geometry: a labeled two-section composition — "Brands"
  // header over the three photo cards, a hairline divider, then the
  // full-width "Resources" panel. Viewport height caps the card size.
  const headerH = 56; // "Brands" + subcopy
  const headerGap = 28;
  const divGapTop = 40; // cards → divider
  const divGapBottom = 32; // divider → panel
  const rowH = 66; // one Resources row
  const panelH = 3 * rowH;
  const chromeH = headerH + headerGap + divGapTop + 1 + divGapBottom + panelH;
  const cardW = Math.max(96, Math.min(0.29 * vw, 430, (0.8 * vh - chromeH) / 0.62));
  const cardH = cardW * 0.62;
  const cardGap = Math.max(14, 0.018 * vw);
  const rowW = 3 * cardW + 2 * cardGap;
  const blockH = chromeH + cardH;
  const blockCenter = Math.max(6, 0.02 * vh); // block sits a touch below stage center
  const blockTop = blockCenter - blockH / 2;
  const headerY = blockTop + headerH / 2;
  const cardY = blockTop + headerH + headerGap + cardH / 2;
  const dividerY = blockTop + headerH + headerGap + cardH + divGapTop;
  const panelY = dividerY + 1 + divGapBottom + panelH / 2;
  // The lockup lands dead-center on its card.
  const landY = cardY;
  // Where each lockup's mark center lands when centered on its card.
  const entityMarkX = {};
  LOCKUP_ROW.forEach((slug, i) => {
    const cx = (i - 1) * (cardW + cardGap);
    entityMarkX[slug] = cx - (LOCKUPS[slug].wu * lockupH) / 2 + (78.5 / 155) * lockupH;
  });
  const cue = 1 - seg(p, 0.005, 0.03);
  // Parked mid-decode → the churn settles onto the real characters.
  const idleE = ease(idleLockRef.current);

  return (
    <section className="film" ref={ref} id="top">
      {/* Deep-link target for the film's end state (the six cards): sits at
          the scroll position where progress reaches 1 with the stage still
          pinned — the nav mark links here. */}
      <div id="end" className="film__end-anchor" aria-hidden="true" />
      {/* The narrative as plain text for assistive tech; the stage is visual. */}
      <div className="sr-only">
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
      <div className="film__stage" ref={stageRef} aria-hidden="true">
        <div className="film__grid" style={{ opacity: 0.16 * (1 - 0.5 * (video / 0.35)) }}>
          {gridField}
        </div>

        <video
          ref={videoRef}
          className="film__video"
          style={{ opacity: video }}
          src={asset('/assets/video/intro-515931397.mp4')}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
        />
        <div className="film__veil" />

        {/* glow bloom behind the converged mark */}
        <div
          className="film__glow"
          style={{
            opacity: glow,
            transform: `translate(-50%, calc(-50% + ${markYvh}vh))`,
          }}
        />

        {/* the three rings of the mark — each splits into its brand's own
            three-ring mark, in place, when the split window opens */}
        {RINGS.map((r) => {
          // ±S grid while separated; glides to the composed row as it splits,
          // then onto its entity card in the final act.
          const xRow = r.spread * S * (1 - splitT) + markXs[r.brand] * splitT;
          const xSep = xRow * (1 - entT) + entityMarkX[r.brand] * entT;
          const x = r.dx * (1 - sepAmount) + xSep * sepAmount;
          const yPx = r.dy * (1 - sepAmount) + landY * entT * sepAmount;
          const yVh = markYvh * (1 - sepAmount);
          const scale = 1 + (sepScale + (lockScale - sepScale) * splitT - 1) * sepAmount;
          const pulsing = p < 0.06; // the opening rings breathe with a soft white glow
          return (
            <svg
              key={r.brand}
              className={`film__ring${pulsing ? ' film__ring--pulse' : ''}`}
              width={MARK_SIZE}
              height={MARK_SIZE}
              viewBox="0 0 41.4 41.4"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${yPx}px + ${yVh}vh)) scale(${scale})`,
                filter: pulsing
                  ? undefined
                  : glow > 0.02
                    ? `drop-shadow(0 0 ${14 * glow}px rgba(255,255,255,${0.5 * glow}))`
                    : 'none',
              }}
            >
              {SPLIT_OFFSETS.map(([ox, oy], i) => (
                <circle
                  key={i}
                  cx={20.7 + ox * splitT}
                  cy={20.7 + oy * splitT}
                  r="17.68"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.45"
                />
              ))}
            </svg>
          );
        })}

        {/* final act — the "Brands" header, the three entity cards
            (photography buttons) the logos land on, then the divider and
            the Resources panel */}
        {entT > 0.001 && (
          <div
            className="film__section-head"
            style={{
              width: rowW,
              opacity: entT,
              transform: `translate(-50%, calc(-50% + ${headerY}px))`,
            }}
          >
            <h2>Brands</h2>
            <p>Three perspectives. A shared horizon.</p>
          </div>
        )}
        {entT > 0.001 &&
          LOCKUP_ROW.map((slug, i) => {
            const hub = HUBS[slug];
            const cx = (i - 1) * (cardW + cardGap);
            return (
              <Link
                key={`card-${slug}`}
                className={`film__entity${entT > 0.5 ? ' is-live' : ''}`}
                to={hub.route}
                aria-label={hub.identity.name}
                tabIndex={entT > 0.5 ? 0 : -1}
                style={{
                  width: cardW,
                  height: cardH,
                  opacity: entT,
                  transform: `translate(calc(-50% + ${cx}px), calc(-50% + ${cardY}px))`,
                }}
              >
                <img src={hub.identity.photo} alt="" loading="lazy" />
              </Link>
            );
          })}
        {btnOp > 0.001 && (
          <div
            className="film__section-divider"
            style={{
              width: rowW,
              opacity: btnOp,
              transform: `translate(-50%, ${dividerY}px)`,
            }}
          />
        )}
        {btnOp > 0.001 && (
          <div
            className={`film__resources${btnOp > 0.5 ? ' is-live' : ''}`}
            style={{
              width: rowW,
              height: panelH,
              opacity: btnOp,
              transform: `translate(-50%, calc(-50% + ${panelY}px))`,
            }}
          >
            <div className="film__resources-head">
              <h2>Resources</h2>
              <p>Tools and reference.</p>
            </div>
            <div className="film__resources-rows">
              {SHARED_LINKS.map((s) => (
                <Link key={s.label} to={s.to} tabIndex={btnOp > 0.5 ? 0 : -1}>
                  {RESOURCE_ICONS[s.icon]}
                  <span>{s.label}</span>
                  <span className="film__resources-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* the wordmarks — the lockup SVGs clipped past their mark, revealed
            beside each freshly formed three-ring mark. At the end state each
            one is a live link into its brand's page. */}
        {wordT > 0.001 &&
          RINGS.map((r) => {
            const lk = LOCKUPS[r.brand];
            const hub = HUBS[r.brand];
            return (
              <Link
                key={`word-${r.brand}`}
                className={`film__logo-link${live ? ' is-live' : ''}`}
                to={hub.route}
                aria-label={hub.identity.name}
                tabIndex={live ? 0 : -1}
                style={{
                  height: (lockupH * lk.H) / 155,
                  opacity: wordT,
                  transform: `translate(calc(${(-(lk.cx / lk.W) * 100).toFixed(2)}% + ${markXs[r.brand] * (1 - entT) + entityMarkX[r.brand] * entT}px), calc(${(-(lk.cy / lk.H) * 100).toFixed(2)}% + ${landY * entT}px))`,
                }}
              >
                <img
                  src={hub.identity.logo}
                  alt=""
                  style={{ clipPath: `inset(0 0 0 ${((160 / lk.W) * 100).toFixed(2)}%)` }}
                />
              </Link>
            );
          })}

        {/* decoder beats 01–02 */}
        {T.beats.map((w, i) => {
          const b = beatState(p, w);
          if (!b.on) return null;
          return (
            <p key={i} className="film__line" style={{ opacity: b.opacity }}>
              <ScrambleText text={lines[i]} lock={b.lock + (1 - b.lock) * idleE} />
            </p>
          );
        })}

        {/* 03 — the universe headline, above the brands */}
        {universeOp > 0.001 && (
          <p className="film__line film__line--universe" style={{ opacity: universeOp }}>
            <ScrambleText text={lines[4]} lock={universeLock + (1 - universeLock) * idleE} />
          </p>
        )}

        <div className="film__cue" style={{ opacity: cue }}>
          <span>Continue</span>
          <span className="film__cue-line" />
        </div>
      </div>
    </section>
  );
}
