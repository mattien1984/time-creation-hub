import Reveal from '../components/Reveal';
import { LogoMark } from '../components/Logo';
import { UMBRELLA } from '../data/brand';
import { CREATOR, CLOSER } from '../data/story';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <Reveal>
          <p className="foot__closer">{CLOSER}</p>
        </Reveal>
        <Reveal className="foot__creator">
          <p className="eyebrow">Created by</p>
          <p className="foot__creator-name">{CREATOR.name}</p>
          <p className="foot__creator-title">{CREATOR.headline}</p>
          <p className="foot__creator-bio">{CREATOR.body}</p>
        </Reveal>
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
          <span>Existence · Time Creationist · Time Creation Project</span>
        </div>
      </div>
    </footer>
  );
}
