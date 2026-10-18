import React, { lazy, Suspense, useEffect, useState } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Everything below the fold is split into separate chunks so the first
// bundle only contains what's needed to paint the hero.
const Projects = lazy(() => import('./components/Projects'));
const Services = lazy(() => import('./components/Services'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const InteractiveLab = lazy(() => import('./components/InteractiveLab'));
const GithubSection = lazy(() => import('./components/GithubSection'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const CallButton = lazy(() => import('./components/CallButton'));

// Load the third-party call widget only after the page has loaded and the
// main thread is idle, so it never competes with the first paint.
function DeferredCallButton() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId;
    let timeoutId;
    const schedule = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(() => setReady(true), { timeout: 4000 });
      } else {
        timeoutId = window.setTimeout(() => setReady(true), 2500);
      }
    };

    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });

    return () => {
      window.removeEventListener('load', schedule);
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <CallButton />
    </Suspense>
  );
}

function SmoothScrollHandler() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      if (href === '#') {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 0.8 });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -64, duration: 0.8 });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Sections below the hero load lazily, so a deep link like /#contact
    // needs to wait for its target to exist before scrolling to it.
    let hashTimer;
    if (window.location.hash) {
      let tries = 0;
      const tryScroll = () => {
        const target = document.querySelector(window.location.hash);
        if (target) lenis.scrollTo(target, { offset: -64, immediate: true });
        else if (tries++ < 40) hashTimer = window.setTimeout(tryScroll, 100);
      };
      tryScroll();
    }

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      if (hashTimer) window.clearTimeout(hashTimer);
    };
  }, [lenis]);

  return null;
}

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <SmoothScrollHandler />
      <div className="min-h-screen bg-[#021024] text-[#C1E8FF] selection:bg-[#5483B3] selection:text-[#021024]">
        <Navbar />
        
        <main>
          <Hero />
          <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
            <Projects />
            <Services />
            <Experience />
            <Skills />
            <InteractiveLab />
            <GithubSection />
            <About />
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        {/* WebCallHub floating call button — fixed, bottom-right, loaded when idle */}
        <DeferredCallButton />
      </div>
    </ReactLenis>
  );
}

export default App;
