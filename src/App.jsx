import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import Nav from './components/Nav';
import Story from './pages/Story';
import System from './pages/System';
import BrandHub from './pages/BrandHub';
import Glossary from './pages/Glossary';
import Library from './pages/Library';

import './sections/sections.css';
import './sections/chapters.css';
import './pages/pages.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

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
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Story />} />
        <Route path="/system" element={<System />} />
        <Route path="/existence" element={<BrandHub slug="existence" />} />
        <Route path="/time-creationism" element={<BrandHub slug="time-creationism" />} />
        <Route path="/time-creation-project" element={<BrandHub slug="time-creation-project" />} />
        <Route path="/tcp" element={<Navigate to="/time-creation-project" replace />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/library" element={<Library />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
