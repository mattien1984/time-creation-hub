import { NavLink, useLocation } from 'react-router-dom';
import { LogoMark } from './Logo';

const link = ({ isActive }) => (isActive ? 'is-active' : undefined);

export default function Nav() {
  // The homepage plays the film chromeless; the nav bar (links only, upper
  // right) fades in once the film reaches its end state — the film toggles
  // a `film-end` class on <body>.
  const { pathname } = useLocation();
  const filmPage = pathname === '/';
  return (
    <nav className={`nav${filmPage ? ' nav--film' : ''}`}>
      {!filmPage && (
        <NavLink to="/" className="nav__mark">
          <LogoMark size={22} stroke={2} />
          <span>Time Creation</span>
        </NavLink>
      )}
      <div className="nav__links">
        <NavLink to="/existence" className={link}>Existence</NavLink>
        <NavLink to="/time-creationist" className={link}>Creationist</NavLink>
        <NavLink to="/time-creation-project" className={link}>Project</NavLink>
        <span className="nav__sep" aria-hidden="true" />
        <NavLink to="/system" className={link}>System</NavLink>
        <NavLink to="/glossary" className={link}>Glossary</NavLink>
        <NavLink to="/library" className={link}>Library</NavLink>
      </div>
    </nav>
  );
}
