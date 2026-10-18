import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';
import { animate, stagger } from 'animejs';

/** Thin scroll-progress bar at bottom of navbar */
const ScrollProgressBar = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#052659]/50">
      <div
        ref={barRef}
        className="h-full bg-[#5483B3] transition-none"
        style={{ width: '0%' }}
      />
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility: close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        if (toggleBtnRef.current) toggleBtnRef.current.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Subtle entrance slide-in without ever hiding the navbar if interrupted
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const nav = navRef.current;
    if (!nav) return;

    animate(nav, {
      translateY: [-10, 0],
      duration: 600,
      ease: 'outExpo',
    });
  }, []);

  // Animate mobile menu items when opened (without hardcoding opacity: 0 in JSX)
  useEffect(() => {
    if (!isOpen) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const links = document.querySelectorAll('.mobile-nav-link');
    if (links.length > 0) {
      animate(links, {
        opacity: [0.3, 1],
        translateX: [-10, 0],
        delay: stagger(35),
        duration: 300,
        ease: 'outCubic',
      });
    }
  }, [isOpen]);

  const desktopNavLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Labs', href: '#interactive-lab' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const mobileNavLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Labs', href: '#interactive-lab' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200"
      style={{ opacity: 1 }}
    >
      <div
        className={`w-full transition-all duration-300 relative ${scrolled || isOpen
            ? 'bg-[#021024]/98 backdrop-blur-md border-b border-[#052659]'
            : 'bg-[#021024]/90 backdrop-blur-sm border-b border-[#052659]/50'
          }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand - Always visible */}
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 group py-1"
            aria-label="Giftedtech Homepage"
          >
            <span className="font-mono text-base sm:text-lg tracking-tight text-[#C1E8FF] font-bold group-hover:text-white transition-colors">
              Giftedtech<span className="text-[#5483B3] hidden sm:inline">.dev</span>
            </span>

          </a>

          {/* Desktop Nav Items - Visible on md and larger */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Primary Navigation">
            {desktopNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-[#7DA0CA] hover:text-[#C1E8FF] transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#5483B3] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop External Links & CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/Giftedtech1"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-[#7DA0CA] hover:text-[#C1E8FF] transition-colors rounded hover:bg-[#052659]"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/giftedtech-precious-a46421249"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-[#7DA0CA] hover:text-[#C1E8FF] transition-colors rounded hover:bg-[#052659]"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#contact"
              className="ml-2 px-3.5 py-1.5 rounded-sm text-sm font-medium text-[#C1E8FF] bg-[#052659] border border-[#5483B3]/40 hover:border-[#7DA0CA] hover:bg-[#083375] transition-all min-h-[36px] inline-flex items-center"
            >
              Get in touch
            </a>
          </div>

          {/* Mobile Clean Hamburger Button - Min 44x44px touch target */}
          <button
            ref={toggleBtnRef}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden min-w-[44px] min-h-[44px] -mr-2 flex items-center justify-center text-[#7DA0CA] hover:text-[#C1E8FF] focus:outline-none focus:ring-1 focus:ring-[#5483B3] rounded transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          >
            {isOpen ? <X size={22} className="text-[#C1E8FF]" /> : <Menu size={22} />}
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <ScrollProgressBar />
      </div>

      {/* Mobile Menu Dropdown - Fully rendered, always visible when isOpen */}
      {isOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="md:hidden bg-[#021024] border-b border-[#052659] px-5 py-6 shadow-2xl transition-all"
        >
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            {mobileNavLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="mobile-nav-link flex items-center min-h-[44px] px-3 py-2 rounded font-medium text-base text-[#C1E8FF] hover:bg-[#052659]/60 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social & Contact Strip in Mobile Menu */}
          <div className="mt-6 pt-5 border-t border-[#052659] space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <a
                href="https://github.com/Giftedtech1"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="mobile-nav-link flex items-center justify-center gap-2 min-h-[44px] px-3 py-2 rounded text-sm text-[#7DA0CA] hover:text-[#C1E8FF] bg-[#052659]/40 border border-[#5483B3]/25 hover:border-[#7DA0CA]/50 transition-colors"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/giftedtech-precious-a46421249"
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="mobile-nav-link flex items-center justify-center gap-2 min-h-[44px] px-3 py-2 rounded text-sm text-[#7DA0CA] hover:text-[#C1E8FF] bg-[#052659]/40 border border-[#5483B3]/25 hover:border-[#7DA0CA]/50 transition-colors"
              >
                <Linkedin size={16} />
                <span>LinkedIn</span>
              </a>
            </div>

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mobile-nav-link flex items-center justify-center w-full min-h-[44px] px-4 py-2.5 rounded font-semibold text-sm text-[#021024] bg-[#C1E8FF] hover:bg-white transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
