// The homepage intro film — a scroll-scrubbed cinematic sequence.
// The logo's three rings open the story: they converge and glow (a full-bleed
// video fades in behind), two statements decode themselves letter by letter,
// the rings separate into the three brands, re-form the Time Creation lockup,
// and Rob's closer lands before the page releases into the doorways.
// Ring stroke 1.45 (viewBox units) measured off the real lockup exports
// (5.45u in the 155u mark box); the creator credit lives in the Footer.
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
// Two decoder beats (the creator credit lives in the footer now).
// Separation act: the mark's rings break apart horizontally to ±S, then IN
// PLACE each single ring splits into its brand's three-ring mark (shrinking
// to lockup scale) and the wordmark fades in beside it — the full logos,
// side by side. The reunion merges each mark back to a single ring and
// pulls them home to re-form the umbrella mark.
const T = {
  glow: [0.045, 0.1],
  video: [0.07, 0.14],
  beats: [
    [0.12, 0.28],
    [0.3, 0.46],
  ],
  markDrop: [0.465, 0.495], // mark settles to center before the universe line opens
  separate: [0.49, 0.6],
  split: [0.615, 0.655], // single ring → the brand's three-ring mark, in place
  splitBack: [0.755, 0.785],
  word: [0.66, 0.695], // wordmark reveal beside the formed mark
  wordOut: [0.745, 0.775],
  universe: [0.495, 0.75],
  reunite: [0.78, 0.87],
  same: [0.8, 0.88],
  sameOut: [0.87, 0.895], // fully out before the closer opens
  closer: [0.895, 0.965],
};
const SCRAMBLE_WINDOWS = [...T.beats, T.universe];

const videoOpacityAt = (p) =>
  0.35 *
  ease(seg(p, ...T.video)) *
  (1 - 0.68 * (ease(seg(p, 0.49, 0.56)) - ease(seg(p, 0.78, 0.85)))) *
  (1 - 0.5 * seg(p, 0.93, 0.985));

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
    BEATS[2].headline, // the universe
    BEATS[3].headline, // same coordinates
    DOORWAYS_BEAT.headline, // the closer
  ];
  // Constant props — never re-render the full-viewport pattern per frame.
  const gridField = useMemo(
    () => <GridField kind="fabric" color="rgba(255,255,255,0.4)" />,
    []
  );
  if (reduced) return <StaticIntro lines={lines} />;

  const p = pRef.current;

  // ---- derived state ----
  const sepAmount = clamp01(
    1 - ease(seg(p, 0, 0.07)) + ease(seg(p, ...T.separate)) - ease(seg(p, ...T.reunite))
  );
  const S = Math.min(vw * 0.3, 330); // separation distance
  // In the ±S row, rings must fit three-abreast: cap the separated scale so
  // a ring's radius stays under ~42% of the spacing (narrow viewports).
  const sepScale = Math.min(1.12, (S * 0.42) / (17.68 * UNIT));
  // The formed logos compose as a true row: measured lockup widths, equal
  // gutters (1.5×h), the whole row centered on its total ink width. Rings
  // glide from the ±S grid to these mark positions as they split.
  const lockupH = Math.max(12, Math.min(64, 0.0421 * vw));
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
  const splitT = ease(seg(p, ...T.split)) - ease(seg(p, ...T.splitBack));
  const wordT = ease(seg(p, ...T.word)) * (1 - seg(p, ...T.wordOut));
  const markYvh = -14 * (1 - ease(seg(p, ...T.markDrop))) - 8 * ease(seg(p, ...T.reunite));
  const glow = (1 - sepAmount) * ease(seg(p, ...T.glow)) * (1 - 0.45 * seg(p, 0.93, 1));
  const video = videoOpacityAt(p);
  const universe = beatState(p, T.universe);
  const same = ease(seg(p, ...T.same)) * (1 - seg(p, ...T.sameOut));
  const wordmark = ease(seg(p, 0.82, 0.87));
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

        {/* the three rings of the mark — each splits into its brand's own
            three-ring mark, in place, when the split window opens */}
        {RINGS.map((r) => {
          // ±S grid while separated; glides to the composed row as it splits.
          const xSep = r.spread * S * (1 - splitT) + markXs[r.brand] * splitT;
          const x = r.dx * (1 - sepAmount) + xSep * sepAmount;
          const yPx = r.dy * (1 - sepAmount);
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
                    ? `drop-shadow(0 0 ${14 * glow}px rgba(250,171,53,${0.55 * glow}))`
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

        {/* the wordmarks — the lockup SVGs clipped past their mark, revealed
            beside each freshly formed three-ring mark */}
        {wordT > 0.001 &&
          RINGS.map((r) => {
            const lk = LOCKUPS[r.brand];
            return (
              <img
                key={`word-${r.brand}`}
                className="film__logo-img"
                src={HUBS[r.brand].identity.logo}
                alt=""
                style={{
                  height: (lockupH * lk.H) / 155,
                  opacity: wordT,
                  clipPath: `inset(0 0 0 ${((160 / lk.W) * 100).toFixed(2)}%)`,
                  transform: `translate(calc(${(-(lk.cx / lk.W) * 100).toFixed(2)}% + ${markXs[r.brand]}px), ${(-(lk.cy / lk.H) * 100).toFixed(2)}%)`,
                }}
              />
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

        {/* 03 — the universe headline, above the separated rings */}
        {universe.on && (
          <p className="film__line film__line--universe" style={{ opacity: universe.opacity }}>
            <ScrambleText text={lines[2]} lock={universe.lock} />
          </p>
        )}

        {/* 04 — reunion: wordmark + "Same coordinates..." */}
        <div
          className="film__lockup"
          style={{ opacity: wordmark, transform: `translate(-50%, calc(${markYvh}vh + ${MARK_SIZE / 2 + 22}px))` }}
        >
          Time Creation
        </div>
        <p className="film__line film__line--quiet" style={{ opacity: same }}>
          {lines[3]}
        </p>

        {/* 05 — the closer */}
        <p className="film__line film__line--closer" style={{ opacity: closer }}>
          {lines[4]}
        </p>

        <div className="film__cue" style={{ opacity: cue }}>
          <span>The story</span>
          <span className="film__cue-line" />
        </div>
      </div>
    </section>
  );
}
