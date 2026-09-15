import Reveal from '../components/Reveal';
import Logo from '../components/Logo';
import DownloadButton from '../components/DownloadButton';
import { VERTICALS } from '../data/brand';

const wordOf = (v) => (v.id === 'existence' ? 'existence' : v.name);

// per-brand logo sizing: the ring mark renders at the SAME size for all three;
// only the wordmark treatment differs (lowercase "existence" runs larger).
const LOGO = {
  'existence': { markSize: 30, fontSize: '1.25rem', wordScale: 1.75 },
  'time-creationism': { markSize: 30, fontSize: '1.25rem', wordScale: 1 },
  'time-creation-project': { markSize: 30, fontSize: '1.25rem', wordScale: 1 },
};
const PHOTO = {};

export default function Positioning() {
  return (
    <section className="ch wrap" id="positioning">
      <Reveal className="ch__head">
        <span className="ch__kicker">Positioning</span>
      </Reveal>
      <Reveal>
        <h2 className="ch__title">One principle,<br />three expressions.</h2>
        <p className="ch__lede">A belief, an instrument, and a foundation — each with its own role, all authoring the same idea of time.</p>
      </Reveal>

      <Reveal className="pos__grid" delay={120}>
        {VERTICALS.map((v) => (
          <div className="pos__card" key={v.id}>
            <div className="pos__photo">
              <img
                src={v.photo}
                alt={`${v.name} — ${v.shape}`}
                loading="lazy"
                style={PHOTO[v.id]}
              />
              <span className="role">{v.role}</span>
            </div>
            <Logo word={wordOf(v)} {...LOGO[v.id]} />
            <p className="pos__statement">{v.statement}</p>
            <div className="dl-row">
              <DownloadButton file={v.logo} label="Logo (SVG)" />
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
