// The homepage — the film IS the page: it ends on the three entity cards
// and the Resources panel, releases into the creator bio (the full Rob
// Dyrdek About, expandable), then the footer (closer + creator credit).

import IntroFilm from '../sections/IntroFilm';
import RobBio from '../sections/RobBio';
import Footer from '../sections/Footer';

export default function Story() {
  return (
    <main>
      <IntroFilm />
      <RobBio />
      <Footer />
    </main>
  );
}
