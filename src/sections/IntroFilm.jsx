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
import { BEATS } from '../data/story';
import { HUBS } from '../data/hubs';
import { asset } from '../lib/asset';

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const seg = (p, a, b) => clamp01((p - a) / (b - a));
const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

// ---- decoder text ----
// Classic decode: locked prefix, a small churning window of ~6 characters at
// the lock point, and the untyped remainder held invisible (real characters at
// opacity 0) so the line never reflows while it decodes.
// Digits, not letters — it's time the lines resolve out of.
const CHARS = '0123456789:';
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
  glow: [0.05, 0.11],
  video: [0.08, 0.16],
  beats: [
    [0.14, 0.32],
    [0.34, 0.52],
  ],
  markDrop: [0.53, 0.565], // mark settles to center before the universe line opens
  separate: [0.56, 0.68],
  split: [0.7, 0.76], // single ring → the brand's three-ring mark, in place
  word: [0.77, 0.83], // wordmark reveal beside the formed mark
  universeIn: [0.565, 0.61],
  universeLock: [0.585, 0.66],
  // Final act: the universe line hands off to short nav copy, the logos
  // glide onto their centered photography cards (the buttons), and the
  // shared row — Design · Glossary · Assets — appears beneath.
  universeOut: [0.85, 0.89],
  entities: [0.87, 0.94],
  buttons: [0.92, 0.97],
};
const SCRAMBLE_WINDOWS = T.beats;
const SHARED_LINKS = [
  { label: 'Design System', to: '/system' },
  { label: 'Glossary of Terms', to: '/glossary' },
  { label: 'Brand Assets', to: '/library' },
];

const videoOpacityAt = (p) =>
  (0.06 + 0.29 * ease(seg(p, ...T.video))) * (1 - 0.68 * ease(seg(p, 0.56, 0.64)));

// The mark's exact ring geometry (viewBox 41.4, center 20.70 / 20.92).
const MARK_SIZE = 164;
const UNIT = MARK_SIZE / 41.4;
const RINGS = [
  // ring index → converged offset (px) and brand when separated.
  // Separated order (left → right): existence, Time Creationist, TCP.
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
  // the Time Creationist lockup (1135×155) — same mark path as the others
  'time-creationism': { W: 1135, H: 155, cx: 78.5, cy: 77, wu: 1135 / 155 },
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
        (SCRAMBLE_WINDOWS.some((w) => beatState(p, w).scrambling) ||
          (p > T.universeIn[0] && p < T.universeLock[1])) &&
        now - lastTick > 45;
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

  const lines = [
    // Beat 1 breaks between its two sentences.
    BEATS[0].headline.replace('time. ', 'time.\n'),
    BEATS[1].headline,
    BEATS[2].headline, // the universe
  ];
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
  const universeLock = ease(seg(p, ...T.universeLock));
  const entT = ease(seg(p, ...T.entities));
  const btnOp = seg(p, ...T.buttons);
  const live = wordT > 0.9; // the formed logos are clickable from formation on
  // Entity-card geometry: three centered photography cards the logos land
  // on, and a same-sized imageless row beneath — two full rows of cards,
  // so height also caps the card size (nav copy above needs ~30vh).
  const cardW = Math.min(0.28 * vw, 400, (0.58 * vh - 18) / 2 / 0.62);
  const cardH = cardW * 0.62;
  const cardGap = Math.max(14, 0.018 * vw);
  const rowSplit = cardH / 2 + 9; // half the vertical gap between the two rows
  const blockCenter = Math.max(10, 0.055 * vh); // block sits slightly below stage center
  const cardY = blockCenter - rowSplit;
  const btnH = cardH; // same size as the image buttons
  const btnY = blockCenter + rowSplit;
  // The lockup lands dead-center on its card.
  const landY = cardY;
  // Where each lockup's mark center lands when centered on its card.
  const entityMarkX = {};
  LOCKUP_ROW.forEach((slug, i) => {
    const cx = (i - 1) * (cardW + cardGap);
    entityMarkX[slug] = cx - (LOCKUPS[slug].wu * lockupH) / 2 + (78.5 / 155) * lockupH;
  });
  const cue = 1 - seg(p, 0.005, 0.03);

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
          src={asset('/assets/video/intro-102245707.mp4')}
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

        {/* final act — the three entity cards (photography buttons) the
            logos land on, plus the shared row beneath */}
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
        {btnOp > 0.001 &&
          SHARED_LINKS.map((s, i) => {
            const cx = (i - 1) * (cardW + cardGap);
            return (
              <Link
                key={s.label}
                className={`film__shared-btn${btnOp > 0.5 ? ' is-live' : ''}`}
                to={s.to}
                tabIndex={btnOp > 0.5 ? 0 : -1}
                style={{
                  width: cardW,
                  height: btnH,
                  opacity: btnOp,
                  transform: `translate(calc(-50% + ${cx}px), calc(-50% + ${btnY}px))`,
                }}
              >
                {s.label}
              </Link>
            );
          })}

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
              <ScrambleText text={lines[i]} lock={b.lock} />
            </p>
          );
        })}

        {/* 03 — the universe headline, above the brands */}
        {universeOp > 0.001 && (
          <p className="film__line film__line--universe" style={{ opacity: universeOp }}>
            <ScrambleText text={lines[2]} lock={universeLock} />
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
