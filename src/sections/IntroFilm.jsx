// The homepage intro film — a scroll-scrubbed cinematic sequence.
// The logo's three rings open the story: they converge and glow (a full-bleed
// video fades in behind), three statements decode themselves letter by letter,
// the rings separate into the three brands, re-form the Time Creation lockup,
// and Rob's closer lands before the page releases into the doorways.
// All lines are sourced from story.js (the beat headlines) — one data source.

import { useEffect, useRef, useState } from 'react';
import GridField from '../components/GridField';
import { BEATS, DOORWAYS_BEAT } from '../data/story';
import { HUBS } from '../data/hubs';
import { asset } from '../lib/asset';

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const seg = (p, a, b) => clamp01((p - a) / (b - a));
const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

// ---- decoder text ----
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·—/<>*#+';
function scramble(text, lock) {
  const n = text.length;
  const locked = Math.round(lock * n);
  let out = '';
  for (let i = 0; i < n; i += 1) {
    const ch = text[i];
    out += i < locked || ch === ' ' ? ch : CHARS[(Math.random() * CHARS.length) | 0];
  }
  return out;
}

// lock/opacity curve for one decoder beat: scramble in → hold clean → unwind
function beatState(p, [a, b]) {
  const u = seg(p, a, b);
  if (u <= 0 || u >= 1) return { on: false, lock: 0, opacity: 0 };
  let lock;
  if (u < 0.45) lock = u / 0.45;
  else if (u < 0.8) lock = 1;
  else lock = 1 - (u - 0.8) / 0.2;
  const opacity = clamp01(Math.min(u / 0.05, (1 - u) / 0.05, 1));
  return { on: true, lock: clamp01(lock), opacity, scrambling: lock < 1 };
}

// ---- timeline (progress 0..1 over the film's scroll run) ----
const T = {
  glow: [0.045, 0.1],
  video: [0.07, 0.14],
  beats: [
    [0.12, 0.26],
    [0.27, 0.41],
    [0.42, 0.56],
  ],
  separate: [0.58, 0.7],
  labels: [0.64, 0.7],
  labelsOut: [0.71, 0.75],
  reunite: [0.74, 0.84],
  same: [0.78, 0.88],
  sameOut: [0.87, 0.9],
  closer: [0.9, 0.96],
};

// The mark's exact ring geometry (viewBox 41.4, center 20.70 / 20.92).
const MARK_SIZE = 164;
const UNIT = MARK_SIZE / 41.4;
const RINGS = [
  // ring index → converged offset (px) and brand when separated
  { dx: 0, dy: (18.39 - 20.92) * UNIT, brand: 'existence', spread: 0 },
  { dx: (18.39 - 20.7) * UNIT, dy: (22.19 - 20.92) * UNIT, brand: 'time-creationism', spread: -1 },
  { dx: (23.01 - 20.7) * UNIT, dy: (22.19 - 20.92) * UNIT, brand: 'time-creation-project', spread: 1 },
];
const wordFor = (slug) => (slug === 'existence' ? 'existence' : HUBS[slug].identity.name);

// Static fallback for prefers-reduced-motion: the lines, plainly.
function StaticIntro({ lines }) {
  return (
    <section className="film film--static">
      <div className="wrap">
        <svg width={MARK_SIZE / 1.6} height={MARK_SIZE / 1.6} viewBox="0 0 41.4 41.4" aria-hidden="true">
          {RINGS.map((r, i) => (
            <circle key={i} cx={20.7 + r.dx / UNIT} cy={20.92 + r.dy / UNIT} r={17.68} fill="none" stroke="#fff" strokeWidth={0.7} />
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
  const [reduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [, setFrame] = useState(0);
  const pRef = useRef(0);
  const [vw, setVw] = useState(() => window.innerWidth);

  useEffect(() => {
    if (reduced) return undefined;
    let raf;
    let lastTick = 0;
    const readP = () => {
      // DEV escape hatch: window.__filmP freezes the film at a progress value
      // so states can be screenshot-tested without scrolling.
      if (import.meta.env.DEV && typeof window.__filmP === 'number') return window.__filmP;
      const el = ref.current;
      if (!el) return pRef.current;
      const rect = el.getBoundingClientRect();
      const run = rect.height - window.innerHeight;
      return clamp01(run > 0 ? -rect.top / run : 0);
    };
    const update = (now) => {
      const p = readP();
      const moved = Math.abs(p - pRef.current) > 0.0004;
      const scrambling =
        T.beats.some((w) => beatState(p, w).scrambling) && now - lastTick > 45;
      if (moved || scrambling) {
        pRef.current = p;
        lastTick = now;
        setFrame((f) => f + 1);
      }
    };
    // Native scroll events keep the film scrubbed even where rAF is throttled
    // (hidden/background tabs); the rAF loop keeps the decoder churning.
    const onScroll = () => update(performance.now());
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      update(now);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [reduced]);

  const lines = [
    BEATS[0].headline,
    BEATS[1].headline,
    BEATS[2].headline,
    BEATS[3].headline,
    BEATS[4].headline,
    DOORWAYS_BEAT.headline,
  ];
  if (reduced) return <StaticIntro lines={lines} />;

  const p = pRef.current;

  // ---- derived state ----
  const spread = clamp01(
    1 - ease(seg(p, 0, 0.07)) + ease(seg(p, ...T.separate)) - ease(seg(p, ...T.reunite))
  );
  const S = Math.min(vw * 0.3, 330); // separation distance
  // When separated, rings must fit three-abreast: cap the separated scale so
  // a ring's radius stays under ~42% of the spacing (narrow viewports).
  const sepScale = Math.min(1.12, (S * 0.42) / (17.68 * UNIT));
  const markYvh = -14 * (1 - ease(seg(p, 0.56, 0.62))) - 8 * ease(seg(p, ...T.reunite));
  const glow = (1 - spread) * ease(seg(p, ...T.glow)) * (1 - 0.45 * seg(p, 0.94, 1));
  const video =
    0.35 *
    ease(seg(p, ...T.video)) *
    (1 - 0.68 * (ease(seg(p, 0.56, 0.64)) - ease(seg(p, 0.76, 0.84)))) *
    (1 - 0.5 * seg(p, 0.92, 0.99));
  const labels = ease(seg(p, ...T.labels)) * (1 - seg(p, ...T.labelsOut));
  const universe = beatState(p, [T.separate[0] - 0.02, T.labelsOut[1] + 0.02]);
  const same = ease(seg(p, ...T.same)) * (1 - seg(p, T.sameOut[0], T.sameOut[1] + 0.02));
  const wordmark = ease(seg(p, 0.8, 0.86));
  const closer = ease(seg(p, ...T.closer));
  const cue = 1 - seg(p, 0.005, 0.03);

  return (
    <section className="film" ref={ref} id="top">
      <div className="film__stage">
        <div className="film__grid">
          <GridField kind="fabric" color="rgba(255,255,255,0.4)" opacity={0.16 * (1 - 0.5 * video / 0.35)} />
        </div>

        <video
          className="film__video"
          style={{ opacity: video }}
          src={asset('/assets/video/intro-temp.mp4')}
          muted
          loop
          autoPlay
          playsInline
          preload="auto"
          aria-hidden="true"
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

        {/* the three rings of the mark */}
        {RINGS.map((r, i) => {
          const hub = HUBS[r.brand];
          const x = r.dx * (1 - spread) + r.spread * S * spread;
          const yPx = r.dy * (1 - spread);
          const yVh = markYvh * (1 - spread);
          const tinted = spread > 0.55 && p > 0.2;
          return (
            <svg
              key={r.brand}
              className="film__ring"
              width={MARK_SIZE}
              height={MARK_SIZE}
              viewBox="0 0 41.4 41.4"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${yPx}px + ${yVh}vh)) scale(${1 + (sepScale - 1) * spread})`,
                filter: glow > 0.02 ? `drop-shadow(0 0 ${14 * glow}px rgba(250,171,53,${0.55 * glow}))` : 'none',
              }}
              aria-hidden="true"
            >
              <circle
                cx="20.7"
                cy="20.7"
                r="17.68"
                fill="none"
                stroke={tinted ? hub.accent : '#ffffff'}
                strokeWidth="0.55"
                style={{ transition: 'stroke 0.45s ease' }}
              />
            </svg>
          );
        })}

        {/* labels under the separated rings */}
        {RINGS.map((r) => {
          const hub = HUBS[r.brand];
          return (
            <div
              key={`label-${r.brand}`}
              className="film__ring-label"
              style={{
                opacity: labels,
                transform: `translate(calc(-50% + ${r.spread * S}px), ${(MARK_SIZE / 2) * sepScale + 30}px)`,
              }}
            >
              <span className="film__ring-word">{wordFor(r.brand)}</span>
              <span className="film__ring-role" style={{ color: hub.accent }}>
                {hub.roleLabel}
              </span>
            </div>
          );
        })}

        {/* decoder beats 01–03 */}
        {T.beats.map((w, i) => {
          const b = beatState(p, w);
          if (!b.on) return null;
          return (
            <p key={i} className="film__line" style={{ opacity: b.opacity }}>
              {scramble(lines[i], b.lock)}
            </p>
          );
        })}

        {/* 04 — the universe headline, above the separated rings */}
        {universe.on && (
          <p className="film__line film__line--universe" style={{ opacity: universe.opacity }}>
            {scramble(lines[3], universe.lock)}
          </p>
        )}

        {/* 05 — reunion: wordmark + "Same coordinates..." */}
        <div
          className="film__lockup"
          style={{ opacity: wordmark, transform: `translate(-50%, calc(${markYvh}vh + ${MARK_SIZE / 2 + 22}px))` }}
        >
          Time Creation
        </div>
        <p className="film__line film__line--quiet" style={{ opacity: same }}>
          {lines[4]}
        </p>

        {/* 06 — the closer */}
        <p className="film__line film__line--closer" style={{ opacity: closer }}>
          {lines[5]}
        </p>

        <div className="film__cue" style={{ opacity: cue }}>
          <span>The story</span>
          <span className="film__cue-line" />
        </div>
      </div>
    </section>
  );
}
