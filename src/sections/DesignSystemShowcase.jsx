import Reveal from '../components/Reveal';
import Logo, { LogoMark } from '../components/Logo';
import PosterMarquee from '../components/PosterMarquee';
import { DESIGN_SYSTEM, VERTICALS, POSTERS } from '../data/brand';
import { asset } from '../lib/asset';

// One row per brand, in order: Existence · Time Creationism · Time Creation Project
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
const wordOf = (v) => (v.id === 'existence' ? 'existence' : v.name);

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
              <img src={ARCH_GRID[v.id]} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(60% 50% at 50% 42%, ${v.accent}33, transparent 70%)` }} />
              <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                <LogoMark size={84} stroke={1.2} />
              </div>
            </div>
            <Logo word={wordOf(v)} markSize={24} fontSize="1.05rem" wordScale={v.id === 'existence' ? 1.5 : 1} />
            <div className="ds__elements">
              {DESIGN_SYSTEM.elements.map((el) => (
                <div className="ds__el" key={el.name}>
                  <span className="k">{el.name}</span>
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
