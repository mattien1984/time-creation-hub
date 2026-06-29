import { useEffect, useRef } from 'react';
import GridField from '../components/GridField';
import RingLogo3D from '../components/RingLogo3D';
import Logo from '../components/Logo';
import { UMBRELLA, VERTICALS } from '../data/brand';

export default function CinematicIntro() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const onScroll = () => {
      const p = Math.min(1, window.scrollY / (window.innerHeight * 0.75));
      if (el) el.style.setProperty('--p', p.toFixed(3));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header id="top" className="intro" ref={ref}>
      <div className="intro__grid">
        <GridField kind="fabric" color="rgba(255,255,255,0.4)" />
      </div>
      <div className="wrap intro__inner">
        <div className="intro__mark">
          <RingLogo3D size={170} duration={6.4} />
        </div>
        <div className="intro__text">
          <h1 className="display intro__title">Time Creation</h1>
          <p className="lead intro__mission">{UMBRELLA.mission}</p>
          <div className="intro__verts">
            {VERTICALS.map((v) => (
              <Logo
                key={v.id}
                word={v.id === 'existence' ? 'existence' : v.name}
                markSize={44}
                fontSize="1.9rem"
              />
            ))}
          </div>
        </div>
      </div>
      <a href="#system" className="scroll-cue">
        <span>The system</span>
        <span className="line" />
      </a>
    </header>
  );
}
