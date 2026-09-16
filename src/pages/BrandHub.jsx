// The brand hub template — Charlie's outline (Sep 15):
// What It Is · What It Believes (TC carries the 5–10 core-belief list; the
// others carry belief copy) · Who It Comes From / It's For / We Serve ·
// How It Sounds · How It Looks · and, at the bottom, Its Role in the
// Universe — the Layers of Time with this brand's plane lit, per "show how
// each entity configures into the whole at the bottom of each section."

import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import Footer from '../sections/Footer';
import { HUBS, HUB_ORDER } from '../data/hubs';
import { glossaryForBrand, slugifyTerm } from '../data/glossary';
import { DOWNLOADS, POSTERS } from '../data/brand';
import { asset } from '../lib/asset';

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

// The Layers of Time with this brand's plane lit — how the entity
// configures into the whole.
const PLANES = [
  { id: 'existence', src: '/assets/grids/arch-block.svg', label: 'the Existence Grid' },
  { id: 'time-creationism', src: '/assets/grids/arch-fabric.svg', label: 'the Fabric of Time' },
  { id: 'time-creation-project', src: '/assets/grids/arch-foundation.svg', label: 'the Foundation of Time' },
];
function HubLayers({ activeId }) {
  return (
    <div className="hub__layers" aria-hidden="true">
      {PLANES.map((pl, i) => (
        <img
          key={pl.id}
          src={asset(pl.src)}
          alt=""
          className={pl.id === activeId ? 'is-active' : ''}
          style={{ '--i': i }}
        />
      ))}
    </div>
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
    posters: (POSTERS[v.id] || []).slice(0, 4),
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

      {/* 01 — What It Is */}
      <Section id="what-it-is" kicker="01 · What It Is" title={hub.whatItIs.headline}>
        {hub.whatItIs.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 40}><p className="body hub__statement">{p}</p></Reveal>
        ))}
        <Reveal>
          <p className="hub__oneliner">{hub.positioning.oneLiner}</p>
          <p className="body">{hub.positioning.boilerplate}</p>
        </Reveal>
      </Section>

      {/* 02 — What It Believes */}
      <Section id="beliefs" kicker="02 · What It Believes">
        {hub.beliefs.list ? (
          <Reveal>
            <ol className="hub__beliefs">
              {hub.beliefs.list.map((b) => (
                <li key={b.text}>
                  {b.text}
                  {b.sacred && <span className="hub__belief-mark" title="Rob Dyrdek — verbatim">◆</span>}
                </li>
              ))}
            </ol>
            <p className="hub__syslink">◆ = Rob Dyrdek’s own words, verbatim. Draft curation — pending his sign-off.</p>
          </Reveal>
        ) : (
          hub.beliefs.copy.map((p, i) => (
            <Reveal key={i} delay={i * 40}><p className="body hub__statement">{p}</p></Reveal>
          ))
        )}
      </Section>

      {/* 03 — Who */}
      <Section id="who" kicker={`03 · ${hub.who.label}`}>
        <Reveal><p className="body">{hub.who.body}</p></Reveal>
      </Section>

      {/* 04 — How It Sounds */}
      <Section id="sounds" kicker="04 · How It Sounds">
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
        {terms.length > 0 && (
          <Reveal>
            <h3 className="hub__h3">The vocabulary</h3>
            <dl className="hub__glossary">
              {terms.map((t) => (
                <div key={t.term}>
                  <dt id={slugifyTerm(t.term)}>{t.term}</dt>
                  <dd>{t.definition}</dd>
                </div>
              ))}
            </dl>
            <p className="hub__syslink">
              All terms across the universe live in <Link to="/glossary">the glossary</Link>.
            </p>
          </Reveal>
        )}
      </Section>

      {/* 05 — How It Looks */}
      <Section id="looks" kicker="05 · How It Looks" title={v.gridTitle}>
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
            The comparative logic — how this identity sits beside its siblings — lives
            in <Link to="/system">the design system</Link>; everything downloadable is
            in <Link to="/library">the asset library</Link>.
          </p>
        </Reveal>
      </Section>

      {/* 06 — Its Role in the Universe (bottom, per Charlie) */}
      <Section id="universe" kicker="06 · Its Role in the Universe">
        <Reveal><p className="body">{hub.universeRole}</p></Reveal>
        <Reveal><HubLayers activeId={v.id} /></Reveal>
        <Reveal>
          <div className="hub__locator" aria-label="Position in the Time Creation universe">
            {HUB_ORDER.map((s) => (
              <Link
                key={s}
                to={HUBS[s].route}
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

      {/* Cross-links */}
      <section className="hub__cross wrap">
        {siblings.map((s) => (
          <Link key={s} to={HUBS[s].route} className="hub__cross-card" style={{ '--door-accent': HUBS[s].accent }}>
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
