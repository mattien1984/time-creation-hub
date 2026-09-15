// The homepage intro film — a scroll-scrubbed cinematic sequence.
// The logo's three rings open the story: they converge and glow (a full-bleed
// video fades in behind), three statements decode themselves letter by letter,
// the rings separate into the three brands, re-form the Time Creation lockup,
// and Rob's closer lands before the page releases into the doorways.
// All lines are sourced from story.js (the beat headlines) — one data source.

import { useEffect, useMemo, useRef, useState } from 'react';
import GridField from '../components/GridField';
import { BEATS, DOORWAYS_BEAT } from '../data/story';
import { HUBS } from '../data/hubs';
import { asset } from '../lib/asset';

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const seg = (p, a, b) => clamp01((p - a) / (b - a));
const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

// ---- decoder text ----
// Classic decode: locked prefix, a small churning window of ~6 characters at
// the lock point, and the untyped remainder held invisible (real characters at
// opacity 0) so the line never reflows while it decodes.
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·—/<>*#+';
const SCRAMBLE_WINDOW = 6;
function ScrambleText({ text, lock }) {
  const n = text.length;
  const locked = Math.round(lock * n);
  const windowEnd = Math.min(locked + SCRAMBLE_WINDOW, n);
  let churn = '';
  for (let i = locked; i < windowEnd; i += 1) {
    const ch = text[i];
    churn += ch === ' ' || ch === '\n' ? ch : CHARS[(Math.random() * CHARS.length) | 0];
  }
  return (
    <>
      {text.slice(0, locked)}
      <span className="film__churn">{churn}</span>
      <span style={{ opacity: 0 }}>{text.slice(windowEnd)}</span>
    </>
  );
}

// lock/opacity curve for one decoder beat: quick decode → long clean hold → fade
function beatState(p, [a, b]) {
  const u = seg(p, a, b);
  if (u <= 0 || u >= 1) return { on: false, lock: 0, opacity: 0 };
  const lock = u < 0.28 ? u / 0.28 : 1;
  const opacity = clamp01(Math.min(u / 0.05, (1 - u) / 0.08, 1));
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
  markDrop: [0.555, 0.585], // mark settles to center before the universe line opens
  separate: [0.58, 0.7],
  universe: [0.585, 0.77],
  labels: [0.64, 0.7],
  labelsOut: [0.71, 0.75],
  reunite: [0.74, 0.84],
  same: [0.78, 0.88],
  sameOut: [0.87, 0.9], // fully out before the closer opens at 0.90
  closer: [0.9, 0.96],
};
const SCRAMBLE_WINDOWS = [...T.beats, T.universe];

const videoOpacityAt = (p) =>
  0.35 *
  ease(seg(p, ...T.video)) *
  (1 - 0.68 * (ease(seg(p, 0.56, 0.64)) - ease(seg(p, 0.76, 0.84)))) *
  (1 - 0.5 * seg(p, 0.92, 0.99));

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
  const stageRef = useRef(null);
  const videoRef = useRef(null);
  const activeRef = useRef(true);
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [, setFrame] = useState(0);
  const pRef = useRef(0);
  const [vw, setVw] = useState(() => window.innerWidth);

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
      const moved = Math.abs(p - pRef.current) > 0.0004;
      const scrambling =
        SCRAMBLE_WINDOWS.some((w) => beatState(p, w).scrambling) && now - lastTick > 45;
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
    const onResize = () => setVw(window.innerWidth);
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
    };
  }, [reduced]);

  const lines = [
    // Beat 1 breaks between its two sentences.
    BEATS[0].headline.replace('time. ', 'time.\n'),
    BEATS[1].headline,
    BEATS[2].headline,
    BEATS[3].headline,
    BEATS[4].headline,
    DOORWAYS_BEAT.headline,
  ];
  // Constant props — never re-render the full-viewport pattern per frame.
  const gridField = useMemo(
    () => <GridField kind="fabric" color="rgba(255,255,255,0.4)" />,
    []
  );
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
  const markYvh = -14 * (1 - ease(seg(p, ...T.markDrop))) - 8 * ease(seg(p, ...T.reunite));
  const glow = (1 - spread) * ease(seg(p, ...T.glow)) * (1 - 0.45 * seg(p, 0.94, 1));
  const video = videoOpacityAt(p);
  const labels = ease(seg(p, ...T.labels)) * (1 - seg(p, ...T.labelsOut));
  const universe = beatState(p, T.universe);
  const same = ease(seg(p, ...T.same)) * (1 - seg(p, ...T.sameOut));
  const wordmark = ease(seg(p, 0.8, 0.86));
  const closer = ease(seg(p, ...T.closer));
  const cue = 1 - seg(p, 0.005, 0.03);

  return (
    <section className="film" ref={ref} id="top">
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
          src={asset('/assets/video/intro-temp.mp4')}
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

        {/* the three rings of the mark */}
        {RINGS.map((r) => {
          const hub = HUBS[r.brand];
          const x = r.dx * (1 - spread) + r.spread * S * spread;
          const yPx = r.dy * (1 - spread);
          const yVh = markYvh * (1 - spread);
          const tinted = spread > 0.55 && p > 0.2;
          const pulsing = p < 0.06; // the opening rings breathe with a soft white glow
          return (
            <svg
              key={r.brand}
              className={`film__ring${pulsing ? ' film__ring--pulse' : ''}`}
              width={MARK_SIZE}
              height={MARK_SIZE}
              viewBox="0 0 41.4 41.4"
              style={{
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${yPx}px + ${yVh}vh)) scale(${1 + (sepScale - 1) * spread})`,
                filter: pulsing
                  ? undefined
                  : glow > 0.02
                    ? `drop-shadow(0 0 ${14 * glow}px rgba(250,171,53,${0.55 * glow}))`
                    : 'none',
              }}
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

        {/* labels under the separated rings — tracking the rings' animated x */}
        {RINGS.map((r) => {
          const hub = HUBS[r.brand];
          return (
            <div
              key={`label-${r.brand}`}
              className="film__ring-label"
              style={{
                opacity: labels,
                transform: `translate(calc(-50% + ${r.spread * S * spread}px), ${(MARK_SIZE / 2) * sepScale + 30}px)`,
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
              <ScrambleText text={lines[i]} lock={b.lock} />
            </p>
          );
        })}

        {/* 04 — the universe headline, above the separated rings */}
        {universe.on && (
          <p className="film__line film__line--universe" style={{ opacity: universe.opacity }}>
            <ScrambleText text={lines[3]} lock={universe.lock} />
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
