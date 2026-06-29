import { LogoMark } from './Logo';

export default function Nav() {
  return (
    <nav className="nav">
      <a href="#top" className="nav__mark">
        <LogoMark size={22} stroke={2} />
        <span>Time Creation</span>
      </a>
      <div className="nav__links">
        <a href="#positioning">Positioning</a>
        <a href="#color">Color</a>
        <a href="#architecture-scene">Architecture</a>
        <a href="#shape">Shape</a>
        <a href="#design-system">System</a>
      </div>
    </nav>
  );
}
