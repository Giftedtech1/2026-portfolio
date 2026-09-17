import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import InteractiveLab from './components/InteractiveLab';
import GithubSection from './components/GithubSection';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CallButton from './components/CallButton';

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
    return () => document.removeEventListener('click', handleAnchorClick);
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
          <Projects />
          <Experience />
          <Skills />
          <InteractiveLab />
          <GithubSection />
          <About />
          <Contact />
        </main>

        <Footer />
        {/* WebCallHub floating call button — fixed, bottom-right */}
        <CallButton />
      </div>
    </ReactLenis>
  );
}

export default App;
