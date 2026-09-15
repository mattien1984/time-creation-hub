import { useEffect, useRef } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigationType } from 'react-router-dom';
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

// The active Lenis instance (null when reduced-motion disables it). Route
// changes must scroll through Lenis: a plain window.scrollTo is ignored and
// reverted while a smooth-scroll animation is still in flight.
let lenisInstance = null;

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType();
  const firstLoad = useRef(true);
  useEffect(() => {
    const isFirst = firstLoad.current;
    firstLoad.current = false;
    // The initial navigation is typed POP too — a cold load (incl. the GH
    // Pages 404 redirect) must still honor its #hash, because the browser's
    // native fragment scroll fires before React has rendered the target.
    // Real back/forward is left alone so the reading position restores;
    // same-page anchor clicks are handled by Lenis (anchors: true).
    if (navType === 'POP' && !isFirst) return;
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (isFirst && !target) return;
    if (lenisInstance) {
      lenisInstance.scrollTo(target ?? 0, { immediate: true });
    } else if (target) {
      target.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, navType]);
  return null;
}

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ duration: 1.0, smoothWheel: true, anchors: true });
    lenisInstance = lenis;
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
      lenisInstance = null;
    };
  }, []);

  return (
    <>
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Story />} />
        <Route path="/system" element={<System />} />
        <Route path="/existence" element={<BrandHub key="existence" slug="existence" />} />
        <Route path="/time-creationism" element={<BrandHub key="time-creationism" slug="time-creationism" />} />
        <Route path="/time-creation-project" element={<BrandHub key="time-creation-project" slug="time-creation-project" />} />
        <Route path="/tcp" element={<Navigate to="/time-creation-project" replace />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/library" element={<Library />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
