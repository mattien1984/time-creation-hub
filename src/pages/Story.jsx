// The homepage — the film IS the page: it ends on the three entity cards
// and the shared row (Design · Glossary · Assets), then releases into the
// footer (closer + creator credit). No separate doorways section.

import IntroFilm from '../sections/IntroFilm';
import Footer from '../sections/Footer';

export default function Story() {
  return (
    <main>
      <IntroFilm />
      <Footer />
    </main>
  );
}
