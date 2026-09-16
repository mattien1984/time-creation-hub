import Reveal from '../components/Reveal';
import { LogoMark } from '../components/Logo';
import { CREATOR } from '../data/story';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <Reveal className="foot__col">
            <LogoMark size={52} stroke={1.4} />
            <span className="foot__meta">Unified Brand System · Internal use only</span>
          </Reveal>
          <Reveal className="foot__col foot__col--right">
            <div className="foot__credit">
              <p className="eyebrow">Created by</p>
              <p className="foot__creator-name">{CREATOR.name}</p>
            </div>
            <span className="foot__meta">© 2026</span>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}
