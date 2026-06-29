import { useEffect } from 'react';
import Lenis from 'lenis';

import Nav from './components/Nav';
import CinematicIntro from './sections/CinematicIntro';
import Positioning from './sections/Positioning';
import ColorChapter from './sections/ColorChapter';
import ArchitectureScene from './sections/ArchitectureScene';
import ShapeChapter from './sections/ShapeChapter';
import GraphicElement from './sections/GraphicElement';
import DesignSystemShowcase from './sections/DesignSystemShowcase';
import Footer from './sections/Footer';

import './sections/sections.css';
import './sections/chapters.css';

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.0, smoothWheel: true });
    if (import.meta.env.DEV) window.lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <CinematicIntro />
        <Positioning />
        <ColorChapter />
        <ArchitectureScene />
        <ShapeChapter />
        <GraphicElement vid="existence" num="05" />
        <GraphicElement vid="time-creationism" num="06" />
        <GraphicElement vid="time-creation-project" num="07" />
        <DesignSystemShowcase />
      </main>
      <Footer />
    </>
  );
}
