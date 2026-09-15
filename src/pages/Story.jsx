import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import CinematicIntro from '../sections/CinematicIntro';
import Footer from '../sections/Footer';
import { BEATS, DOORWAYS_BEAT } from '../data/story';
import { HUBS, HUB_ORDER } from '../data/hubs';

function Beat({ beat }) {
  return (
    <Reveal className="beat">
      <div className="beat__num">{beat.num}</div>
      <div className="beat__body">
        <p className="eyebrow">{beat.title}</p>
        <h2 className="beat__headline">{beat.headline}</h2>
        <p className="body">{beat.body}</p>
        {beat.flywheel && (
          <div className="beat__flywheel">
            <ol>
              {beat.flywheel.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="beat__flywheel-caption">{beat.flywheel.caption}</p>
          </div>
        )}
      </div>
    </Reveal>
  );
}

export default function Story() {
  return (
    <main>
      <CinematicIntro />

      <section className="ch wrap story-beats" id="story">
        {BEATS.map((b) => (
          <Beat key={b.num} beat={b} />
        ))}
      </section>

      <section className="ch wrap doorways" id="doorways">
        <Reveal>
          <p className="eyebrow">{DOORWAYS_BEAT.num} · {DOORWAYS_BEAT.title}</p>
          <h2 className="beat__headline">{DOORWAYS_BEAT.headline}</h2>
          <p className="body">{DOORWAYS_BEAT.body}</p>
        </Reveal>
        <div className="doorways__grid">
          {HUB_ORDER.map((slug) => {
            const h = HUBS[slug];
            return (
              <Reveal key={slug}>
                <Link
                  to={`/${slug}`}
                  className="door"
                  style={{ '--door-accent': h.accent }}
                >
                  <span className="door__role">{h.roleLabel}</span>
                  <span className="door__name">{h.identity.name}</span>
                  <span className="door__tag">{h.tagline}</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <div className="doorways__grid doorways__grid--shared">
          <Reveal>
            <Link to="/system" className="door door--shared">
              <span className="door__role">Shared</span>
              <span className="door__name">The Design System</span>
              <span className="door__tag">One mark, one palette, three densities — side by side.</span>
            </Link>
          </Reveal>
          <Reveal>
            <Link to="/glossary" className="door door--shared">
              <span className="door__role">Shared</span>
              <span className="door__name">Glossary</span>
              <span className="door__tag">Every term in the universe, defined.</span>
            </Link>
          </Reveal>
          <Reveal>
            <Link to="/library" className="door door--shared">
              <span className="door__role">Shared</span>
              <span className="door__name">Asset Library</span>
              <span className="door__tag">Every logo, color, and grid — ready to use.</span>
            </Link>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
