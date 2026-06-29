import Reveal from '../components/Reveal';
import { LogoMark } from '../components/Logo';
import { UMBRELLA } from '../data/brand';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <Reveal className="foot__top">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24 }}>
            <LogoMark size={52} stroke={1.4} />
            <div>
              <div className="foot__big">Time Creation</div>
            </div>
          </div>
          <p className="foot__mission">{UMBRELLA.mission}</p>
        </Reveal>
        <div className="foot__bottom">
          <span>Unified Brand System · Internal use only</span>
          <span>Existence · Time Creationism · Time Creation Project</span>
        </div>
      </div>
    </footer>
  );
}
