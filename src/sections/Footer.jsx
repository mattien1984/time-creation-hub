import Reveal from '../components/Reveal';
import { LogoMark } from '../components/Logo';
import { CREATOR } from '../data/story';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <Reveal className="foot__top">
          <LogoMark size={52} stroke={1.4} />
        </Reveal>
        <div className="foot__bottom">
          <span>Unified Brand System · Internal use only</span>
          <div className="foot__right">
            <span className="foot__credit">Created by {CREATOR.name}</span>
            <span>Existence · Time Creationist · Time Creation Project</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
