import GridField from '../components/GridField';
import CircleMark from '../components/CircleMark';
import { UMBRELLA } from '../data/brand';

export default function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero__grid">
        <GridField kind="fabric" color="rgba(255,255,255,0.4)" />
      </div>
      <div className="wrap hero__inner">
        <div className="hero__mark">
          <CircleMark size={76} />
        </div>
        <h1 className="display hero__title">
          Time<br />Creation
        </h1>
        <p className="lead hero__mission">{UMBRELLA.mission}</p>
        <p className="hero__sub">The unified brand system · Internal reference</p>
      </div>
      <div className="scroll-cue">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </header>
  );
}
