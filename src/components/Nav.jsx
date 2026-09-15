import { NavLink } from 'react-router-dom';
import { LogoMark } from './Logo';

const link = ({ isActive }) => (isActive ? 'is-active' : undefined);

export default function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav__mark">
        <LogoMark size={22} stroke={2} />
        <span>Time Creation</span>
      </NavLink>
      <div className="nav__links">
        <NavLink to="/time-creationism" className={link}>Creationism</NavLink>
        <NavLink to="/existence" className={link}>Existence</NavLink>
        <NavLink to="/time-creation-project" className={link}>Project</NavLink>
        <span className="nav__sep" aria-hidden="true" />
        <NavLink to="/system" className={link}>System</NavLink>
        <NavLink to="/glossary" className={link}>Glossary</NavLink>
        <NavLink to="/library" className={link}>Library</NavLink>
      </div>
    </nav>
  );
}
