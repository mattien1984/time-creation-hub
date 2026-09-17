// The brand hub template — Charlie's outline as a clean accordion:
// every section collapses to a ruled row (number · title · circled +) and
// expands on click; nav-dropdown deep links auto-expand their section.
// What It Is · What We Believe (TC carries the 5–10 core-belief list) ·
// Who It Comes From / It's For / We Serve · How It Sounds · How It Looks ·
// Its Role in the Universe (the Layers of Time, this brand's plane lit).

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { LogoMark } from '../components/Logo';
import GridField from '../components/GridField';
import Footer from '../sections/Footer';
import { HUBS, HUB_ORDER } from '../data/hubs';
import { POSTERS } from '../data/brand';
import { asset } from '../lib/asset';

const SECTION_IDS = ['what-it-is', 'beliefs', 'who', 'sounds', 'looks', 'universe'];

function AccordionSection({ id, title, open, onToggle, children }) {
  return (
    <section className={`acc${open ? ' is-open' : ''}`} id={id}>
      <button type="button" className="acc__head" onClick={onToggle} aria-expanded={open}>
        <h2 className="acc__title">{title}</h2>
        <span className="acc__toggle" aria-hidden="true">
          <span className="acc__plus" />
        </span>
      </button>
      <div className="acc__body">
        <div className="acc__clip">
          <div className="acc__content">{children}</div>
        </div>
      </div>
    </section>
  );
}

// The Layers of Time planes, top to bottom — how the entity configures
// into the whole (same vectors as the design page's exploded scene).
const PLANES = [
  { id: 'existence', src: '/assets/grids/arch-block.svg' },
  { id: 'time-creationism', src: '/assets/grids/arch-fabric.svg' },
  { id: 'time-creation-project', src: '/assets/grids/arch-foundation.svg' },
];

export default function BrandHub({ slug }) {
  const hub = HUBS[slug];
  const v = hub.identity;
  const siblings = HUB_ORDER.filter((s) => s !== slug);
  const assets = {
    posters: (POSTERS[v.id] || []).slice(0, 4),
  };

  const [openIds, setOpenIds] = useState(() => new Set());
  const toggle = (id) =>
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // A #section deep link (e.g. from the nav dropdowns) expands its section.
  const { hash } = useLocation();
  useEffect(() => {
    const id = hash.slice(1);
    if (SECTION_IDS.includes(id)) {
      setOpenIds((prev) => new Set(prev).add(id));
    }
  }, [hash]);

  const sections = [
    {
      id: 'what-it-is',
      title: 'What It Is',
      body: (
        <>
          <p className="acc__lead">{hub.whatItIs.headline}</p>
          {hub.whatItIs.paragraphs.map((p, i) => (
            <p key={i} className="body hub__statement">{p}</p>
          ))}
          {hub.whatItIs.showPositioning !== false && (
            <>
              <p className="hub__oneliner">{hub.positioning.oneLiner}</p>
              <p className="body">{hub.positioning.boilerplate}</p>
            </>
          )}
        </>
      ),
    },
    {
      id: 'beliefs',
      title: 'What We Believe',
      body: hub.beliefs.list ? (
        <>
          {/* pairs (lead + support) render unnumbered: bold lead, regular
              sub (ruled Sep 17); plain lists keep the numbered serif look */}
          {hub.beliefs.list.some((b) => b.support) ? (
            <div className="hub__pairs">
              {hub.beliefs.list.map((b) => (
                <div key={b.text} className="hub__pair">
                  <p className="hub__pair-lead">{b.text}</p>
                  {b.support && <p className="hub__pair-sub">{b.support}</p>}
                </div>
              ))}
            </div>
          ) : (
            <ol className="hub__beliefs">
              {hub.beliefs.list.map((b) => (
                <li key={b.text}>
                  {b.text}
                  {b.sacred && <span className="hub__belief-mark" title="Rob Dyrdek — verbatim">◆</span>}
                </li>
              ))}
            </ol>
          )}
          {hub.beliefs.list.some((b) => b.sacred) && (
            <p className="hub__syslink">◆ = Rob Dyrdek’s own words, verbatim. Draft curation — pending his sign-off.</p>
          )}
        </>
      ) : (
        hub.beliefs.copy.map((p, i) => (
          <p key={i} className="body hub__statement">{p}</p>
        ))
      ),
    },
    {
      id: 'who',
      title: hub.who.label,
      body: (
        <>
          {(hub.who.paragraphs || [hub.who.body]).map((p, i) => (
            <p key={i} className="body hub__statement">{p}</p>
          ))}
          {hub.who.sub && (
            <>
              <h3 className="hub__h3">{hub.who.sub.title}</h3>
              {hub.who.sub.paragraphs.map((p, i) => (
                <p key={i} className="body hub__statement">{p}</p>
              ))}
            </>
          )}
        </>
      ),
    },
    {
      id: 'sounds',
      title: 'How It Sounds',
      body: (
        <>
          {hub.voice.persona &&
            hub.voice.persona.map((p, i) => (
              <p key={i} className="body hub__statement">{p}</p>
            ))}
          {hub.voice.traits && (
            <div className="hub__pairs">
              {hub.voice.traits.map((t) => (
                <div key={t.text} className="hub__pair">
                  <p className="hub__pair-lead">{t.text}</p>
                  <p className="hub__pair-sub">{t.support}</p>
                </div>
              ))}
            </div>
          )}
          {hub.voice.principles && (
            <ul className="hub__voice">
              {hub.voice.principles.map((p) => <li key={p}>{p}</li>)}
            </ul>
          )}
          {hub.voice.examples && hub.voice.examples.length > 0 && (
            <div className="hub__voice-examples">
              {hub.voice.examples.map((e) => <blockquote key={e}>{e}</blockquote>)}
            </div>
          )}
        </>
      ),
    },
    {
      id: 'looks',
      title: 'How It Looks',
      body: (
        <>
          {/* the brand's visual story in brief + the four poster cards;
              the full identity breakdown lives on the design page */}
          <p className="body hub__statement">{hub.visualStory}</p>
          {assets.posters.length > 0 && (
            <div className="hub__posters">
              {assets.posters.map((p) => <img key={p} src={p} alt="" loading="lazy" />)}
            </div>
          )}
          <p className="hub__syslink">
            <Link to="/system">See more →</Link>
          </p>
        </>
      ),
    },
    {
      id: 'universe',
      title: 'Its Role in the Universe',
      body: (
        <>
          <p className="body hub__statement">{hub.universeRole}</p>
          {/* the design page's exploded Layers of Time, miniaturized: this
              brand's plane lit and called out, the other two placed but
              dimmed — beside the three brand cards, siblings at 75% */}
          <div className="hub__arch">
            <div className="hub__arch-left">
              <div className="hub__arch-stage" aria-hidden="true">
                <div className="hub__arch-scene">
                  {PLANES.map((pl, i) => (
                    <div
                      key={pl.id}
                      className={`hub__arch-plane${pl.id === v.id ? ' is-active' : ''}`}
                      style={{ transform: `translateZ(${(1 - i) * 90}px)` }}
                    >
                      <img src={asset(pl.src)} alt="" draggable="false" />
                    </div>
                  ))}
                </div>
              </div>
              <ul className="hub__arch-legend">
                {HUB_ORDER.map((s) => (
                  <li key={s} className={s === slug ? 'is-active' : ''}>
                    <span className="hub__arch-tick" aria-hidden="true" />
                    <span>{HUBS[s].identity.name}</span>
                    <em>{HUBS[s].roleLabel}</em>
                    {s === slug && <strong className="hub__arch-here">you are here</strong>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hub__arch-cards">
              {HUB_ORDER.map((s) => {
                const h = HUBS[s];
                return (
                  <Link
                    key={s}
                    to={h.route}
                    className={`hub__arch-card${s === slug ? ' is-current' : ''}`}
                    aria-label={h.identity.name}
                  >
                    <img className="hub__arch-card-bg" src={h.identity.photo} alt="" loading="lazy" />
                    <img
                      className="hub__arch-card-lockup"
                      src={h.identity.logo}
                      alt=""
                      style={{ '--logo-scale': h.identity.logoScale }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      ),
    },
  ];

  const light = hub.theme.mode === 'light';

  return (
    <main
      className={`hub hub--${v.id}${light ? ' hub--light' : ''}`}
      style={{ '--hub-accent': hub.accent }}
    >
      {/* Hero — the hub wears its own skin: each brand's own grid language
          rendered procedurally (TC layers its wave wash beneath the fabric) */}
      <header className="hub__hero">
        <div className="hub__hero-field" aria-hidden="true">
          {hub.theme.wash && (
            <img className="hub__hero-wave" src={asset(hub.theme.wash)} alt="" />
          )}
          {hub.theme.heroPhoto && (
            <img className="hub__hero-photo" src={v.photo} alt="" />
          )}
          <GridField
            kind={v.gridKind}
            color={light ? 'rgba(14, 23, 22, 0.55)' : 'rgba(255, 255, 255, 0.4)'}
            opacity={light ? 0.2 : v.id === 'existence' ? 0.18 : 0.3}
            style={
              v.id === 'existence'
                ? {
                    // fades out at the bottom, matching the hero photo
                    WebkitMaskImage: 'linear-gradient(180deg, #000 35%, transparent 100%)',
                    maskImage: 'linear-gradient(180deg, #000 35%, transparent 100%)',
                  }
                : undefined
            }
          />
        </div>
        <div className="wrap hub__hero-row">
          <Reveal>
            <p className="hub__role">{hub.roleLabel}</p>
            <div className="hub__logo">
              <img src={v.logo} alt={`${v.name} logo`} style={{ '--logo-scale': v.logoScale }} />
            </div>
            <p className="hub__tagline">{hub.tagline}</p>
          </Reveal>
        </div>
      </header>

      <div className="wrap hub__accordion">
        {sections.map((s) => (
          <AccordionSection
            key={s.id}
            id={s.id}
            title={s.title}
            open={openIds.has(s.id)}
            onToggle={() => toggle(s.id)}
          >
            {s.body}
          </AccordionSection>
        ))}
      </div>

      {/* full-bleed photography band — the brand's world, treated per theme */}
      {hub.theme.band !== false && (
        <div className="hub__band" aria-hidden="true">
          <img src={v.photo} alt="" loading="lazy" />
        </div>
      )}

      {/* Cross-links — the sibling brands as photo cards (home-intro style),
          plus a flat card back to the universe's end state */}
      <section className="hub__cross wrap">
        {siblings.map((s) => {
          const sv = HUBS[s].identity;
          return (
            <Link key={s} to={HUBS[s].route} className="hub__cross-photo" aria-label={sv.name}>
              <img className="hub__cross-bg" src={sv.photo} alt="" loading="lazy" />
              <img
                className="hub__cross-lockup"
                src={sv.logo}
                alt=""
                style={{ '--logo-scale': sv.logoScale }}
              />
            </Link>
          );
        })}
        <Link to="/#end" className="hub__cross-photo hub__cross-photo--flat">
          <span className="hub__cross-mark" aria-hidden="true">
            {/* stroke 1.45 = the lockup-measured ring weight (see IntroFilm) */}
            <LogoMark size={400} stroke={1.45} />
          </span>
          <span className="hub__cross-flat-label">The Universe</span>
        </Link>
      </section>

      <Footer gridKind={v.gridKind} />
    </main>
  );
}
