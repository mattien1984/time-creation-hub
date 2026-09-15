import { useEffect, useState } from 'react';
import Reveal from '../components/Reveal';
import Footer from '../sections/Footer';
import { GLOSSARY, slugifyTerm } from '../data/glossary';
import { HUBS } from '../data/hubs';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'umbrella', label: 'Time Creation' },
  { id: 'time-creationism', label: 'Creationism' },
  { id: 'existence', label: 'Existence' },
];

const accentFor = (brand) => HUBS[brand]?.accent || '#FAAB35';

export default function Glossary() {
  const [filter, setFilter] = useState('all');
  const terms = GLOSSARY
    .filter((t) => filter === 'all' || t.brand === filter)
    .sort((a, b) => a.term.localeCompare(b.term));

  // Honor #term deep links once content is on the page.
  useEffect(() => {
    if (!window.location.hash) return;
    const el = document.getElementById(window.location.hash.slice(1));
    if (el) el.scrollIntoView();
  }, []);

  return (
    <main>
      <header className="page-head wrap">
        <p className="eyebrow">Shared</p>
        <h1 className="display">Glossary</h1>
        <p className="body">
          The language of the universe — every term, defined once, linkable forever.
        </p>
        <div className="glossary__filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`glossary__filter${filter === f.id ? ' is-active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <section className="wrap glossary">
        <dl className="glossary__list">
          {terms.map((t) => (
            <Reveal key={t.term} className="glossary__entry">
              <dt id={slugifyTerm(t.term)}>
                <a href={`#${slugifyTerm(t.term)}`} className="glossary__anchor" aria-label={`Link to ${t.term}`}>#</a>
                {t.term}
                <span className="glossary__brand" style={{ '--term-accent': accentFor(t.brand) }}>
                  {t.brand === 'umbrella' ? 'Time Creation' : HUBS[t.brand]?.identity.name}
                </span>
              </dt>
              <dd>{t.definition}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      <Footer />
    </main>
  );
}
