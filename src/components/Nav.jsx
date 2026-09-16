import { NavLink, Link, useLocation } from 'react-router-dom';
import { LogoMark } from './Logo';
import { HUBS, HUB_ORDER } from '../data/hubs';

const link = ({ isActive }) => (isActive ? 'is-active' : undefined);

// Charlie's outline sections, in page order; the Who label is per-brand.
const sectionsFor = (hub) => [
  ['What It Is', 'what-it-is'],
  ['What It Believes', 'beliefs'],
  [hub.who.label, 'who'],
  ['How It Sounds', 'sounds'],
  ['How It Looks', 'looks'],
  ['Its Role in the Universe', 'universe'],
];

export default function Nav() {
  // The homepage plays the film chromeless; the nav bar (links only, upper
  // right) fades in once the film reaches its end state — the film toggles
  // a `film-end` class on <body>.
  const { pathname } = useLocation();
  const filmPage = pathname === '/';
  return (
    <nav className={`nav${filmPage ? ' nav--film' : ''}`}>
      {!filmPage && (
        <NavLink to="/" className="nav__mark" aria-label="Time Creation — home">
          <LogoMark size={22} stroke={2} />
        </NavLink>
      )}
      <div className="nav__links">
        {HUB_ORDER.map((slug) => {
          const hub = HUBS[slug];
          return (
            <div className="nav__item" key={slug}>
              <NavLink to={hub.route} className={link}>{hub.identity.name}</NavLink>
              <div className="nav__menu">
                <div className="nav__menu-panel">
                  {sectionsFor(hub).map(([label, id]) => (
                    <Link key={id} to={`${hub.route}#${id}`}>{label}</Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        <span className="nav__sep" aria-hidden="true" />
        <NavLink to="/system" className={link}>Design System</NavLink>
        <NavLink to="/glossary" className={link}>Glossary</NavLink>
        <NavLink to="/library" className={link}>Library</NavLink>
      </div>
    </nav>
  );
}
