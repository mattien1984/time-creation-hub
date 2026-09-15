import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Footer from '../sections/Footer';
import { HUBS, HUB_ORDER } from '../data/hubs';
import { glossaryForBrand, slugifyTerm } from '../data/glossary';
import { DOWNLOADS, POSTERS } from '../data/brand';

function Section({ id, kicker, title, children }) {
  return (
    <section className="hub__section wrap" id={id}>
      <Reveal>
        <p className="eyebrow eyebrow--accent">{kicker}</p>
        {title && <h2 className="hub__h2">{title}</h2>}
      </Reveal>
      {children}
    </section>
  );
}

export default function BrandHub({ slug }) {
  const hub = HUBS[slug];
  const v = hub.identity;
  const terms = glossaryForBrand(slug);
  const siblings = HUB_ORDER.filter((s) => s !== slug);
  const assets = {
    logo: DOWNLOADS.logos.find((d) => d.name.startsWith(v.name)),
    grid: DOWNLOADS.grids.find((d) => d.note.startsWith(v.name)),
    posters: (POSTERS[slug] || []).slice(0, 4),
  };

  return (
    <main className="hub" style={{ '--hub-accent': hub.accent }}>
      {/* Hero — the hub wears its own skin */}
      <header className="hub__hero" style={{ '--hub-grid': `url(${v.grid})` }}>
        <div className="wrap">
          <Reveal>
            <p className="hub__role">{hub.roleLabel}</p>
            <div className="hub__logo">
              <img src={v.logo} alt={`${v.name} logo`} style={{ '--logo-scale': v.logoScale }} />
            </div>
            <p className="hub__tagline">{hub.tagline}</p>
          </Reveal>
        </div>
      </header>

      {/* Story */}
      <Section id="story" kicker="Story" title={hub.story.headline}>
        {hub.story.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 40}><p className="body hub__statement">{p}</p></Reveal>
        ))}
      </Section>

      {/* Role in the universe — "you are here" */}
      <Section id="universe" kicker="Role in the universe">
        <Reveal>
          <p className="body">{hub.universeRole}</p>
          <div className="hub__locator" aria-label="Position in the Time Creation universe">
            {HUB_ORDER.map((s) => (
              <Link
                key={s}
                to={`/${s}`}
                className={`hub__locator-node${s === slug ? ' is-here' : ''}`}
                style={{ '--node-accent': HUBS[s].accent }}
              >
                <span className="n">{HUBS[s].identity.name}</span>
                <span className="r">{HUBS[s].roleLabel}</span>
                {s === slug && <span className="here">you are here</span>}
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Audience & persona */}
      <Section id="persona" kicker="Audience & persona">
        <Reveal><p className="body">{hub.persona.body}</p></Reveal>
      </Section>

      {/* Voice & tone */}
      <Section id="voice" kicker="Voice & tone">
        <Reveal>
          <ul className="hub__voice">
            {hub.voice.principles.map((p) => <li key={p}>{p}</li>)}
          </ul>
          {hub.voice.examples.length > 0 && (
            <div className="hub__voice-examples">
              {hub.voice.examples.map((e) => <blockquote key={e}>{e}</blockquote>)}
            </div>
          )}
        </Reveal>
      </Section>

      {/* Positioning & messaging */}
      <Section id="positioning" kicker="Positioning & messaging">
        <Reveal>
          <p className="hub__oneliner">{hub.positioning.oneLiner}</p>
          <p className="body">{hub.positioning.boilerplate}</p>
        </Reveal>
      </Section>

      {/* Visual identity capsule */}
      <Section id="identity" kicker="Visual identity" title={v.gridTitle}>
        <div className="hub__identity">
          <Reveal className="hub__identity-cell">
            <img className="hub__grid-thumb" src={v.grid} alt={v.gridName} />
            <p className="body">{v.gridBody}</p>
          </Reveal>
          <Reveal className="hub__identity-cell" delay={60}>
            <img className="hub__shape" src={v.photo} alt={`${v.name} — ${v.shape}`} />
            <p className="body">{v.shapeNote}</p>
          </Reveal>
        </div>
        <Reveal><p className="body hub__colornote">{v.colorNote}</p></Reveal>
        <Reveal>
          <p className="hub__syslink">
            For the comparative logic — how this identity sits beside its siblings —
            see <Link to="/system">the design system</Link>.
          </p>
        </Reveal>
      </Section>

      {/* Glossary — omits itself when the brand has no terms */}
      {terms.length > 0 && (
        <Section id="glossary" kicker="Glossary" title={`${v.name} terms`}>
          <dl className="hub__glossary">
            {terms.map((t) => (
              <Reveal key={t.term}>
                <dt id={slugifyTerm(t.term)}>{t.term}</dt>
                <dd>{t.definition}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal>
            <p className="hub__syslink">
              All terms across the universe live in <Link to="/glossary">the glossary</Link>.
            </p>
          </Reveal>
        </Section>
      )}

      {/* Assets */}
      <Section id="assets" kicker="Assets" title={`${v.name} assets`}>
        <Reveal>
          <div className="hub__assets">
            {[assets.logo, assets.grid].filter(Boolean).map((d) => (
              <a key={d.file} className="hub__asset" href={d.file} download>
                <img src={d.file} alt={d.name} />
                <span>{d.name} · {d.kind}</span>
              </a>
            ))}
          </div>
          {assets.posters.length > 0 && (
            <div className="hub__posters">
              {assets.posters.map((p) => <img key={p} src={p} alt="" loading="lazy" />)}
            </div>
          )}
          <p className="hub__syslink">
            Everything else is in <Link to="/library">the asset library</Link>.
          </p>
        </Reveal>
      </Section>

      {/* Cross-links */}
      <section className="hub__cross wrap">
        {siblings.map((s) => (
          <Link key={s} to={`/${s}`} className="hub__cross-card" style={{ '--door-accent': HUBS[s].accent }}>
            <span className="door__role">{HUBS[s].roleLabel}</span>
            <span className="door__name">{HUBS[s].identity.name}</span>
          </Link>
        ))}
        <Link to="/" className="hub__cross-card hub__cross-card--up">
          <span className="door__role">Up</span>
          <span className="door__name">The Universe</span>
        </Link>
      </section>

      <Footer />
    </main>
  );
}
