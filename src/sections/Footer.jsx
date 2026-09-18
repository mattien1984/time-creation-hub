import Reveal from '../components/Reveal';
import { LogoMark } from '../components/Logo';
import GridField from '../components/GridField';
import { CREATOR } from '../data/story';

// gridKind: the brand's grid language rises from the footer's bottom edge —
// hub pages pass theirs (block/fabric/foundation); default is the umbrella
// fabric. glow=false drops the Sunrise gradient (the homepage footer sits
// under the bio's own bloom — no second color wash).
export default function Footer({ gridKind = 'fabric', glow = true }) {
  return (
    <footer className={`foot${glow ? '' : ' foot--noglow'}`}>
      <div className="foot__gridfield" aria-hidden="true">
        <GridField kind={gridKind} color="rgba(255,255,255,0.4)" />
      </div>
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
