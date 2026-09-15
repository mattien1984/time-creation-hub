import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import IntroFilm from '../sections/IntroFilm';
import Footer from '../sections/Footer';
import { DOORWAYS_BEAT } from '../data/story';
import { HUBS, HUB_ORDER } from '../data/hubs';

export default function Story() {
  return (
    <main>
      <IntroFilm />

      <section className="ch wrap doorways" id="doorways">
        <Reveal>
          <p className="eyebrow">{DOORWAYS_BEAT.num} · {DOORWAYS_BEAT.title}</p>
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
                  <img
                    className="door__logo"
                    src={h.identity.logo}
                    alt={h.identity.name}
                    style={{ '--logo-scale': h.identity.logoScale }}
                  />
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
