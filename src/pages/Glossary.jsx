import { useEffect } from 'react';
import Reveal from '../components/Reveal';
import Footer from '../sections/Footer';
import { GLOSSARY, LIVE_BRANDS, slugifyTerm } from '../data/glossary';

export default function Glossary() {
  // Existence-only for now (LIVE_BRANDS in glossary.js); no filter tabs
  // until more brands' terms go live.
  const terms = GLOSSARY
    .filter((t) => LIVE_BRANDS.includes(t.brand))
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
        <h1 className="display">Glossary</h1>
      </header>

      <section className="wrap glossary">
        <dl className="glossary__list">
          {terms.map((t) => (
            <Reveal key={t.term} className="glossary__entry">
              <dt id={slugifyTerm(t.term)}>
                <a href={`#${slugifyTerm(t.term)}`} className="glossary__anchor" aria-label={`Link to ${t.term}`}>#</a>
                {t.term}
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
