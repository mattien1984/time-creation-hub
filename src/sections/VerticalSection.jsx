import Reveal from '../components/Reveal';
import GridField from '../components/GridField';

export default function VerticalSection({ v, index }) {
  return (
    <section id={v.id} className="vert-wrap">
      {/* Full-bleed hero */}
      <div className="vert">
        <div className="vert__bg">
          <img className="vert__photo" src={v.photo} alt={`${v.name} — ${v.shape}`} loading="lazy" />
          <div className="vert__scrim" />
          <div className="vert__scrim-b" />
          <GridField
            className="vert__grid"
            kind={v.gridKind}
            color="rgba(255,255,255,0.22)"
            opacity={0.7}
          />
        </div>

        <div className="wrap vert__inner">
          <Reveal>
            <div className="vert__role">
              <span className="pip" style={{ background: v.accent }} />
              <span>{v.role}</span>
            </div>
            <img
              className="vert__logo"
              src={v.logo}
              alt={`${v.name} logo`}
              style={v.logoScale && v.logoScale !== 1 ? { height: `calc(clamp(34px, 4vw, 50px) * ${v.logoScale})` } : undefined}
            />
            <h2 className="display vert__name">{v.name}</h2>
            <p className="lead vert__statement">{v.statement}</p>
            <div className="vert__facts">
              <span className="fact">Grid · <b>{v.gridTitle}</b></span>
              <span className="fact">Shape · <b style={{ textTransform: 'capitalize' }}>{v.shape}</b></span>
              <span className="fact">Role · <b>{v.role}</b></span>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Grid-identity deep dive */}
      <div className="section section--tight wrap">
        <div className="vdeep">
          <Reveal className="vdeep__visual">
            <GridField className="gf" kind={v.gridKind} color="rgba(255,255,255,0.5)" />
            <div
              style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(80% 80% at 50% 50%, ${v.accent}22, transparent 70%)`,
              }}
            />
          </Reveal>
          <Reveal delay={120}>
            <p className="vdeep__kicker">{v.gridName}</p>
            <h3 className="vdeep__title">{v.gridTitle}</h3>
            <p className="body" style={{ marginBottom: 24 }}>{v.gridBody}</p>
            <p className="body" style={{ color: 'var(--faint)', fontStyle: 'italic', fontFamily: 'var(--serif)' }}>
              {v.shapeNote}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
