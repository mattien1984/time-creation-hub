import Reveal from '../components/Reveal';
import { DESIGN_SYSTEM } from '../data/brand';

// The 8 circle-language compositions (recreated crisp on black to match the
// Figma "Circle Language" card grid).
const CARDS = [
  [{ x: 42, y: 78, r: 24 }, { x: 42, y: 78, r: 13 }],
  [{ x: 34, y: 52, r: 40 }, { x: 68, y: 82, r: 40 }],
  [{ x: 52, y: 38, r: 44 }, { x: 50, y: 104, r: 56 }],
  [{ x: 82, y: 48, r: 46 }, { x: 82, y: 92, r: 46 }],
  [{ x: 14, y: 122, r: 72 }],
  [{ x: 50, y: 150, r: 58 }, { x: 50, y: 150, r: 42 }, { x: 50, y: 150, r: 26 }],
  [{ x: 74, y: 64, r: 9 }, { x: 74, y: 64, r: 17 }, { x: 74, y: 64, r: 25 }, { x: 74, y: 64, r: 33 }],
  [{ x: 92, y: 112, r: 56 }, { x: 58, y: 122, r: 40 }],
];

function CircleCard({ circles }) {
  return (
    <div className="circ-card">
      <svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {circles.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={c.r} fill="none" stroke="#fff" strokeWidth="0.4" opacity="0.5" />
        ))}
      </svg>
    </div>
  );
}

export default function ShapeChapter() {
  return (
    <section className="ch wrap" id="shape">
      <Reveal className="ch__head">
        <span className="ch__kicker">Shape</span>
      </Reveal>
      <Reveal className="ge2">
        <div className="ge2__text">
          <h2 className="ch__title">The circle.</h2>
          <p className="ch__lede"><span className="ch__shared">Shared across all three.</span></p>
        </div>
        <p className="ge2__body">{DESIGN_SYSTEM.circle}</p>
      </Reveal>
      <Reveal className="circ-cards" delay={120}>
        {CARDS.map((c, i) => <CircleCard key={i} circles={c} />)}
      </Reveal>
    </section>
  );
}
