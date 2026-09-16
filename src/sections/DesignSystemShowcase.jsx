import Reveal from '../components/Reveal';
import Logo, { LogoMark } from '../components/Logo';
import PosterMarquee from '../components/PosterMarquee';
import { DESIGN_SYSTEM, VERTICALS, POSTERS, GRAPHIC } from '../data/brand';
import { asset } from '../lib/asset';

// One row per brand, in order: Existence · Time Creationist · Time Creation Project
const ROWS = [
  POSTERS['existence'],
  POSTERS['time-creationism'],
  POSTERS['time-creation-project'],
];

const ARCH_GRID = {
  'existence': asset('/assets/grids/arch-block.svg'),
  'time-creationism': asset('/assets/grids/arch-fabric.svg'),
  'time-creation-project': asset('/assets/grids/arch-foundation.svg'),
};

// Optional per-brand poster backgrounds — drop images at these paths and they
// render automatically beneath the grid/glow/ring stack (missing files no-op).
const POSTER_BG = {
  'existence': asset('/assets/posters/ds-bg/existence.jpg'),
  'time-creationism': asset('/assets/posters/ds-bg/time-creationism.jpg'),
  'time-creation-project': asset('/assets/posters/ds-bg/time-creation-project.jpg'),
};
const wordOf = (v) => (v.id === 'existence' ? 'existence' : v.name);

// The four system elements per brand. Color System and Circular Language are
// shared across all three; the signature graphic element and the grid layer
// are each brand's own (Time Block / Creation Color / Enlightenment Glare, and
// Grid / Fabric / Foundation of Time).
const stripThe = (s) => s.replace(/^The /, '');
const elementsOf = (v) => [
  { name: 'Color System', shared: true },
  { name: stripThe(GRAPHIC[v.id].element), shared: false },
  { name: stripThe(v.gridName), shared: false },
  { name: 'Circular Language', shared: true },
];

export default function DesignSystemShowcase() {
  return (
    <section className="ch wrap" id="design-system">
      <Reveal className="ch__head">
        <span className="ch__num">08</span>
        <span className="ch__kicker">The Design System</span>
      </Reveal>
      <Reveal>
        <h2 className="ch__title">One system,<br />three worlds.</h2>
        <p className="ch__lede">{DESIGN_SYSTEM.intro}</p>
      </Reveal>

      <Reveal className="ds" delay={120}>
        {VERTICALS.map((v) => (
          <div className="ds__col" key={v.id}>
            <div className="ds__poster">
              <img src={POSTER_BG[v.id]} alt="" onError={(e) => { e.currentTarget.hidden = true; }} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <img src={ARCH_GRID[v.id]} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(60% 50% at 50% 42%, ${v.accent}33, transparent 70%)` }} />
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                <LogoMark size={84} stroke={1.2} />
              </div>
            </div>
            <Logo word={wordOf(v)} markSize={24} fontSize="1.05rem" wordScale={v.id === 'existence' ? 1.5 : 1} />
            <div className="ds__elements">
              {elementsOf(v).map((el) => (
                <div className="ds__el" key={el.name}>
                  <span className="k">{el.name}</span>
                  {el.shared && <span className="ds__el-tag">shared</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Reveal>

      {/* Culmination — the whole system, applied, one row per brand */}
      <div className="ds__culmination">
        <Reveal className="gallery__label">
          <span className="t">The system, applied</span>
        </Reveal>
        {VERTICALS.map((v, idx) => (
          <div className="ds__marquee-row" key={v.id}>
            <PosterMarquee posters={ROWS[idx]} duration={ROWS[idx].length * 4.5} reverse={idx === 1} />
          </div>
        ))}
      </div>

      <Reveal className="ds__final">
        <p className="eyebrow" style={{ marginBottom: 18 }}>Time Creation</p>
        <h3 className="display">A life is not spent or found, but made.</h3>
      </Reveal>
    </section>
  );
}
