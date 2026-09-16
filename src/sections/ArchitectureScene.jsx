import { useEffect, useRef, useState } from 'react';
import Logo from '../components/Logo';
import DownloadButton from '../components/DownloadButton';
import { ARCHITECTURE, VERTICALS } from '../data/brand';
import { asset } from '../lib/asset';

// Exact top-down vectors exported from the Illustrator grid-language file.
const PLANES = [
  { key: 'top', src: asset('/assets/grids/arch-block.svg'), z: 150, vert: VERTICALS[0], layer: ARCHITECTURE.layers[0], word: 'existence' },
  { key: 'mid', src: asset('/assets/grids/arch-fabric.svg'), z: 0, vert: VERTICALS[1], layer: ARCHITECTURE.layers[1], word: 'Time Creationist' },
  { key: 'bot', src: asset('/assets/grids/arch-foundation.svg'), z: -150, vert: VERTICALS[2], layer: ARCHITECTURE.layers[2], word: 'Time Creation Project' },
];

// phase: 0 flat · 1 top · 2 mid · 3 bottom · 4 exploded
export default function ArchitectureScene() {
  const ref = useRef(null);
  const [phase, setPhase] = useState(0);
  const [hovered, setHovered] = useState(-1);
  const [rot, setRot] = useState({ x: 58, z: 45 });
  const [dragging, setDragging] = useState(false);
  const drag = useRef(null);

  const played = useRef(false);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let timers = [];
    const start = () => {
      if (reduce) { setPhase(4); return; }
      timers = [
        setTimeout(() => setPhase(1), 250),
        setTimeout(() => setPhase(2), 1050),
        setTimeout(() => setPhase(3), 1850),
        setTimeout(() => setPhase(4), 2650),
      ];
    };
    const maybeTrigger = () => {
      if (played.current) return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.85 && r.bottom > 80) {
        played.current = true;
        cleanup();
        start();
      }
    };
    // Poll each frame (robust against Lenis intercepting native scroll), with
    // input-event fallbacks in case rAF is throttled.
    const tick = () => {
      if (played.current) return;
      maybeTrigger();
      if (!played.current) raf = requestAnimationFrame(tick);
    };
    const evs = ['scroll', 'wheel', 'touchmove', 'resize'];
    const cleanup = () => {
      cancelAnimationFrame(raf);
      evs.forEach((e) => window.removeEventListener(e, maybeTrigger));
    };
    evs.forEach((e) => window.addEventListener(e, maybeTrigger, { passive: true }));
    raf = requestAnimationFrame(tick);
    return () => { cleanup(); timers.forEach(clearTimeout); };
  }, []);

  const exploded = phase >= 4;
  const activeIdx = phase >= 1 && phase <= 3 ? phase - 1 : -1;

  // Base opacities mirror the Illustrator hierarchy (block strong, fabric
  // medium, foundation faint) — all overlaid in the flat & exploded states.
  const BASE = exploded ? [1, 0.6, 0.92] : [1, 0.26, 0.5];

  const planeStyle = (i) => {
    let opacity;
    let glow = false;
    if (hovered !== -1) {
      // hover: spotlight the hovered layer, dim the rest
      opacity = hovered === i ? 1 : 0.16;
      glow = hovered === i;
    } else if (activeIdx !== -1) {
      // timed highlight sequence
      opacity = activeIdx === i ? 1 : 0.16;
      glow = activeIdx === i;
    } else {
      // flat (all overlaid) or exploded (all present)
      opacity = BASE[i];
    }
    return {
      opacity,
      transform: `translateZ(${exploded ? PLANES[i].z : 0}px)`,
      filter: glow ? 'drop-shadow(0 0 20px rgba(255,255,255,0.6))' : 'none',
    };
  };

  const layerOn = (i) =>
    hovered === i || (hovered === -1 && (activeIdx === i || (exploded && activeIdx === -1)));

  // Drag-to-rotate the exploded scene (turntable: vertical = tilt, horizontal = spin)
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const onDown = (e) => {
    if (!exploded) return;
    drag.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
  };
  const onMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    drag.current = { x: e.clientX, y: e.clientY };
    setRot((r) => ({ x: clamp(r.x - dy * 0.5, 12, 80), z: r.z + dx * 0.5 }));
  };
  const onUp = (e) => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
  };
  const sceneStyle = exploded
    ? { transform: `rotateX(${rot.x}deg) rotateZ(${rot.z}deg)` }
    : undefined;

  return (
    <section id="architecture-scene" className={`arch3d ${exploded ? 'is-exploded' : ''}`} ref={ref}>
      <div className="wrap arch3d__grid">
        {/* Copy + layer list */}
        <div>
          <p className="eyebrow">{ARCHITECTURE.title}</p>
          <h2 className="display arch3d__title">{ARCHITECTURE.name}</h2>
          <p className="body" style={{ maxWidth: '42ch' }}>{ARCHITECTURE.intro}</p>
          <div className="arch3d__layers">
            {PLANES.map((p, i) => (
              <div
                key={p.key}
                className={`arch3d__layer ${layerOn(i) ? 'on' : ''}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(-1)}
              >
                <div>
                  <Logo word={p.word} markSize={30} wordScale={p.word === 'existence' ? 1.5 : 1} />
                  <span className="sub">{p.layer.label} · {p.layer.position}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D stage */}
        <div
          className={`arch3d__stage ${exploded ? 'is-grabbable' : ''} ${dragging ? 'is-dragging' : ''}`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          data-lenis-prevent
        >
          <div className="arch3d__scene" style={sceneStyle}>
            {PLANES.map((p, i) => (
              <div key={p.key} className="plane" style={planeStyle(i)}>
                <img className="plane__art" src={p.src} alt="" draggable="false" />
              </div>
            ))}
          </div>
          <span className="arch3d__hint">drag to rotate</span>
        </div>
      </div>

      {/* Building creatively with the architecture — per brand */}
      <div className="wrap">
        <div className="archbuild">
          {PLANES.map((p) => (
            <div className="archbuild__cell" key={p.key}>
              <div className="archbuild__viz">
                <img className="plane__art" src={p.src} alt="" style={{ opacity: 0.9 }} />
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(70% 70% at 50% 50%, ${p.vert.accent}24, transparent 72%)` }} />
              </div>
              <Logo word={p.word} markSize={24} fontSize="1rem" wordScale={p.word === 'existence' ? 1.5 : 1} />
              <p className="note" style={{ marginTop: 8 }}>{p.layer.label} — {p.layer.body.split('.')[0]}.</p>
              <div className="dl-row">
                <DownloadButton file={p.src} label="Grid (SVG)" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
