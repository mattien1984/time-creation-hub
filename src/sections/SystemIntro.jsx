import Reveal from '../components/Reveal';
import GridField from '../components/GridField';
import { UMBRELLA, VERTICALS } from '../data/brand';

export default function SystemIntro() {
  return (
    <section id="system" className="section wrap">
      <Reveal className="sys__head">
        <p className="eyebrow">One principle, three expressions</p>
        <p className="lead" style={{ marginTop: 24 }}>{UMBRELLA.intro}</p>
      </Reveal>

      <Reveal className="sys__triad" delay={120}>
        {VERTICALS.map((v, i) => (
          <a key={v.id} href={`#${v.id}`} className="triad__cell">
            <GridField
              className="grid-mini"
              kind={v.gridKind}
              color="rgba(255,255,255,0.16)"
            />
            <span className="triad__index">0{i + 1}</span>
            <span className="triad__role" style={{ color: v.accent }}>{v.role}</span>
            <h3 className="triad__name">{v.name}</h3>
            <p className="triad__line">{v.statement.split('—')[0].trim()}.</p>
          </a>
        ))}
      </Reveal>
    </section>
  );
}
