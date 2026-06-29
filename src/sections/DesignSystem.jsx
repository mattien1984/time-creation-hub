import Reveal from '../components/Reveal';
import { DESIGN_SYSTEM } from '../data/brand';

export default function DesignSystem() {
  return (
    <section id="foundations" className="section wrap">
      <Reveal>
        <p className="eyebrow">Shared foundation</p>
        <h2 className="display" style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', margin: '16px 0 22px' }}>
          {DESIGN_SYSTEM.title}
        </h2>
        <p className="lead" style={{ maxWidth: '52ch' }}>{DESIGN_SYSTEM.intro}</p>
      </Reveal>

      <div className="ds__grid">
        {DESIGN_SYSTEM.elements.map((el, i) => (
          <Reveal as="div" key={el.name} className="ds__cell" delay={i * 90}>
            <span className="ds__num">0{i + 1}</span>
            <h3 className="ds__name">{el.name}</h3>
            <p className="body">{el.body}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="col-2" style={{ marginTop: 'clamp(56px,9vh,110px)' }}>
        <div>
          <p className="eyebrow">Circular Language</p>
          <h3 className="display" style={{ fontSize: 'clamp(1.8rem,3vw,2.6rem)', margin: '16px 0 0' }}>
            Time is circular,<br />not linear.
          </h3>
        </div>
        <p className="body">{DESIGN_SYSTEM.circle}</p>
      </Reveal>
    </section>
  );
}
