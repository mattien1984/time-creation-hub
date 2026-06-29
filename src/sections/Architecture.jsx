import Reveal from '../components/Reveal';
import GridField from '../components/GridField';
import { ARCHITECTURE } from '../data/brand';

const KINDS = { Existence: 'block', 'Time Creationism': 'fabric', 'Time Creation Project': 'foundation' };

export default function Architecture() {
  return (
    <section id="architecture" className="section wrap">
      <Reveal className="arch__head">
        <p className="eyebrow">{ARCHITECTURE.title}</p>
        <h2 className="display" style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', margin: '18px 0 22px' }}>
          {ARCHITECTURE.name}
        </h2>
        <p className="body">{ARCHITECTURE.intro}</p>
      </Reveal>

      <div className="arch__stack">
        {ARCHITECTURE.layers.map((l, i) => (
          <Reveal as="div" key={l.vertical} className="arch__layer" delay={i * 110}>
            <GridField
              className="grid-mini"
              kind={KINDS[l.vertical]}
              color="rgba(255,255,255,0.14)"
            />
            <div>
              <span className="pos">{l.position}</span>
              <h4>{l.vertical}</h4>
              <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--faint)' }}>
                {l.label}
              </span>
            </div>
            <p className="body">{l.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
