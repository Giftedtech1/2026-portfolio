import React, { useEffect, useRef } from 'react';
import { ArrowDownRight, ArrowRight, Github, Linkedin, MapPin, Terminal } from 'lucide-react';
import { waapi, animate, stagger, splitText } from 'animejs';
import { useMagneticHover } from '../hooks/useMagneticHover';

const Hero = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  const primaryCTARef = useMagneticHover({ strength: 0.25 });
  const secondaryCTARef = useMagneticHover({ strength: 0.2 });

  const hasRun = useRef(false);

  useEffect(() => {
    // Guard against React StrictMode double-invocation in dev:
    // StrictMode mounts → unmounts → remounts, which would call splitText twice
    // on the same element after revert(), breaking the char array.
    if (hasRun.current) return;
    hasRun.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const content = contentRef.current;
    if (!headline || !subtitle || !content) return;

    let headlineAnim = null;
    let headlineSplitter = null;
    let subAnim = null;
    let contentAnim = null;
    const timeouts = [];


    // ── Phase 1: looping splitText char animation on the headline ────────────
    try {
      headlineSplitter = splitText(headline, { words: false, chars: true });
      const chars = headlineSplitter.chars || [];

      if (chars.length > 0) {
        // Ensure proper display, spacing and high-contrast color for each character
        const totalChars = chars.length;
        chars.forEach((c, idx) => {
          c.style.display = 'inline-block';
          if (c.textContent === ' ' || c.innerHTML === '&nbsp;') {
            c.style.width = '0.32em';
          }
          // Gradient color transition across characters: Ice blue -> Sky cyan -> Soft indigo
          const ratio = idx / Math.max(totalChars - 1, 1);
          if (ratio < 0.4) {
            c.style.color = '#C1E8FF';
          } else if (ratio < 0.75) {
            c.style.color = '#7DD3FC';
          } else {
            c.style.color = '#A5B4FC';
          }
        });

        headlineAnim = animate(chars, {
          // Property keyframes — bounce up and return
          y: [
            { to: '-2.75rem', ease: 'outExpo',   duration: 600 },
            { to: 0,          ease: 'outBounce', duration: 800, delay: 100 },
          ],
          // Property-specific: full spin from -1 turn
          rotate: {
            from: '-1turn',
            delay: 0,
          },
          delay: stagger(50),
          ease: 'inOutCirc',
          loopDelay: 1000,
          loop: true,
        });
      }
    } catch (e) {
      console.error('Headline anime.js error:', e);
    }

    // ── Phase 2: subtitle smooth entrance ────────────────────────────────────
    subAnim = animate(subtitle, {
      opacity:    [0, 1],
      translateY: [16, 0],
      duration:   600,
      delay:      250,
      ease:       'outExpo',
    });

    // ── Phase 3: badges + CTAs + tech-strip entrance ────────────────────────
    const contentItems = content.querySelectorAll('.hero-content-item');
    contentAnim = animate(contentItems, {
      opacity:    [0, 1],
      translateY: [18, 0],
      delay:      stagger(70, { start: 350 }),
      duration:   650,
      ease:       'outExpo',
    });

    return () => {
      hasRun.current = false;
      try {
        headlineAnim?.pause?.();
        subAnim?.pause?.();
        contentAnim?.pause?.();
        headlineSplitter?.revert?.();
        if (subtitle) {
          subtitle.style.opacity = '1';
          subtitle.style.transform = 'none';
        }
        contentItems.forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      } catch {
        // cleanup safe
      }
    };
  }, []);

  // Tech stack items with individual accent colors
  const techStack = [
    { label: 'React',       color: '#61DAFB', bg: 'rgba(97,218,251,0.08)',  border: 'rgba(97,218,251,0.25)'  },
    { label: 'TypeScript',  color: '#3B82F6', bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.25)'  },
    { label: 'Next.js',     color: '#ffffff', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.15)' },
    { label: 'Tailwind',    color: '#38BDF8', bg: 'rgba(56,189,248,0.08)',  border: 'rgba(56,189,248,0.25)'  },
    { label: 'Supabase',    color: '#3ECF8E', bg: 'rgba(62,207,142,0.08)',  border: 'rgba(62,207,142,0.25)'  },
    { label: 'Docker',      color: '#2496ED', bg: 'rgba(36,150,237,0.08)',  border: 'rgba(36,150,237,0.25)'  },
    { label: 'Kubernetes',  color: '#326CE5', bg: 'rgba(50,108,229,0.08)',  border: 'rgba(50,108,229,0.25)'  },
    { label: 'AWS',         color: '#FF9900', bg: 'rgba(255,153,0,0.08)',   border: 'rgba(255,153,0,0.25)'   },
    { label: 'Azure',       color: '#0078D4', bg: 'rgba(0,120,212,0.08)',   border: 'rgba(0,120,212,0.25)'   },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-40 md:pb-32 bg-[#021024] bg-grid overflow-hidden border-b border-[#052659]"
    >
      {/* Depth vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#021024]/60 to-[#021024] pointer-events-none" />

      {/* Scan line */}
      <div className="scan-line" />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 relative z-10">

        {/* ── Badges ─────────────────────────────────────── */}
        <div ref={contentRef}>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8 text-xs font-mono hero-content-item">

            {/* Name badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-[#C1E8FF]"
              style={{
                background: 'rgba(5,38,89,0.7)',
                border: '1px solid rgba(84,131,179,0.3)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: '#38BDF8' }}
              />
              <span>Ogunleye Precious · Giftedtech</span>
            </div>

            {/* Location badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#021024] border border-[#052659] text-[#7DA0CA]">
              <MapPin size={12} style={{ color: '#38BDF8' }} />
              <span>Lagos, Nigeria</span>
            </div>

            {/* Available badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[#C1E8FF]"
              style={{
                background: 'rgba(62,207,142,0.08)',
                border: '1px solid rgba(62,207,142,0.25)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#3ECF8E]" />
              <span style={{ color: '#3ECF8E' }}>Available for work</span>
            </div>
          </div>

          {/* ── Headline — animated via splitText ──────────── */}
          <div className="max-w-4xl mb-5 sm:mb-6 pt-4 sm:pt-6">
            <h1
              ref={headlineRef}
              id="hero-headline"
              className="text-[clamp(2.4rem,9vw,5rem)] font-bold tracking-tight leading-[1.15] sm:leading-[1.1]"
              aria-label="Building useful products for the web."
              style={{
                color: '#C1E8FF',
                letterSpacing: '-0.02em',
              }}
            >
              Building useful products for the web.
            </h1>

            {/* ── Subtitle — animated via splitText words ──── */}
            <p
              ref={subtitleRef}
              className="mt-5 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl font-normal"
              style={{ color: '#94A3B8' }}
            >
              Frontend / Full-Stack Developer building modern web applications,
              digital products, and user-focused experiences with{' '}
              <span style={{ color: '#61DAFB', fontWeight: 500 }}>React</span>,{' '}
              <span style={{ color: '#3B82F6', fontWeight: 500 }}>TypeScript</span>, and robust architectures.
            </p>
          </div>

          {/* ── CTA Buttons ─────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-1 hero-content-item">
            {/* Primary — gradient */}
            <a
              ref={primaryCTARef}
              href="#work"
              id="hero-view-work-btn"
              className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 rounded-md text-sm font-mono font-semibold transition-all shadow-lg w-full sm:w-auto"
              style={{
                background: 'linear-gradient(135deg, #38BDF8 0%, #818CF8 100%)',
                color: '#021024',
                boxShadow: '0 4px 20px rgba(56,189,248,0.25), 0 2px 8px rgba(129,140,248,0.20)',
                willChange: 'transform',
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 28px rgba(56,189,248,0.38), 0 3px 12px rgba(129,140,248,0.30)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(56,189,248,0.25), 0 2px 8px rgba(129,140,248,0.20)'; }}
            >
              <span>View my work</span>
              <ArrowDownRight size={16} />
            </a>

            {/* Secondary — ghost */}
            <a
              ref={secondaryCTARef}
              href="#contact"
              id="hero-contact-btn"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-md text-sm font-mono font-medium transition-all w-full sm:w-auto"
              style={{
                color: '#C1E8FF',
                background: 'rgba(5,38,89,0.5)',
                border: '1px solid rgba(99,102,241,0.40)',
                willChange: 'transform',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(129,140,248,0.65)';
                e.currentTarget.style.background = 'rgba(99,102,241,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.40)';
                e.currentTarget.style.background = 'rgba(5,38,89,0.5)';
              }}
            >
              <span>Get in touch</span>
              <ArrowRight size={15} />
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-2 sm:pt-0 sm:ml-2">
              <a
                href="https://github.com/Giftedtech1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] flex-1 sm:flex-initial px-3.5 py-2 rounded-md text-xs font-mono transition-all"
                style={{
                  color: '#94A3B8',
                  background: 'rgba(5,38,89,0.30)',
                  border: '1px solid rgba(84,131,179,0.22)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#C1E8FF';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                  e.currentTarget.style.background = 'rgba(30,30,40,0.55)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#94A3B8';
                  e.currentTarget.style.borderColor = 'rgba(84,131,179,0.22)';
                  e.currentTarget.style.background = 'rgba(5,38,89,0.30)';
                }}
                aria-label="GitHub Profile"
              >
                <Github size={15} />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/giftedtech-precious-a46421249"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] flex-1 sm:flex-initial px-3.5 py-2 rounded-md text-xs font-mono transition-all"
                style={{
                  color: '#94A3B8',
                  background: 'rgba(5,38,89,0.30)',
                  border: '1px solid rgba(84,131,179,0.22)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#0A66C2';
                  e.currentTarget.style.borderColor = 'rgba(10,102,194,0.45)';
                  e.currentTarget.style.background = 'rgba(10,102,194,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = '#94A3B8';
                  e.currentTarget.style.borderColor = 'rgba(84,131,179,0.22)';
                  e.currentTarget.style.background = 'rgba(5,38,89,0.30)';
                }}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={15} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* ── Tech Strip ──────────────────────────────────── */}
          <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t hero-content-item" style={{ borderColor: 'rgba(84,131,179,0.18)' }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs font-mono font-medium mr-1" style={{ color: '#7DA0CA' }}>
                  <Terminal size={13} style={{ color: '#38BDF8' }} />
                  Core Stack:
                </span>
                {techStack.map(({ label, color, bg, border }) => (
                  <span
                    key={label}
                    className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-mono font-medium"
                    style={{ color, background: bg, border: `1px solid ${border}` }}
                  >
                    {label}
                  </span>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
