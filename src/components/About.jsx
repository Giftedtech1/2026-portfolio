import React, { useRef, useEffect } from 'react';
import { FileDown, Terminal, MapPin } from 'lucide-react';
import { animate, stagger } from 'animejs';
import { useAnimeCardTilt } from '../hooks/useAnimeCardTilt';
import { useMagneticHover } from '../hooks/useMagneticHover';
import ScrollReveal from './ScrollReveal';

const principles = [
  {
    title: "Product-Driven Engineering",
    description: "Writing code is the mechanism; solving real problems for actual users is the goal. I prioritize sensible user flows, fast response cycles, and pragmatic architectures."
  },
  {
    title: "Performance by Default",
    description: "Especially across emerging markets like Nigeria, lightweight bundles, eager asset optimization, and resilient offline handling make or break the user experience."
  },
  {
    title: "Maintainability & Clean Contracts",
    description: "I structure component trees and API interfaces with clarity and consistency, so codebases remain straightforward to extend and maintain over time."
  }
];

const About = () => {
  const panelRef = useAnimeCardTilt({ maxTilt: 4, scale: 1.01, perspective: 1400 });
  const cvRef = useMagneticHover({ strength: 0.2 });
  const principlesRef = useRef(null);

  useEffect(() => {
    const list = principlesRef.current;
    if (!list) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const items = list.querySelectorAll('.principle-item');
    items.forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(16px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate(items, {
            opacity: [0, 1],
            translateX: [16, 0],
            delay: stagger(100, { start: 200 }),
            duration: 700,
            ease: 'outExpo',
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 sm:py-24 md:py-32 bg-[#021024] border-b border-[#052659]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">

        {/* Section Header */}
        <ScrollReveal direction="up" distance={24} delayStep={80} duration={700} ease="outExpo" threshold={0.3}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#052659]">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#C1E8FF] tracking-tight reveal-item">
                About & Philosophy
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-[#7DA0CA] mt-3 md:mt-0 max-w-md reveal-item">
              Product engineer focused on modern web standards, resilient architectures, and real-world utility.
            </p>
          </div>
        </ScrollReveal>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Main Narrative */}
          <ScrollReveal direction="up" distance={32} delayStep={100} duration={800} ease="outExpo" threshold={0.15} className="lg:col-span-7">
            <div className="space-y-5 sm:space-y-6 text-sm sm:text-base md:text-lg text-[#7DA0CA] font-normal leading-relaxed reveal-item">
              <p>
                I am <span className="text-[#C1E8FF] font-semibold">Ogunleye Precious</span> (known across the engineering community as <span className="text-[#C1E8FF] font-mono font-medium">Giftedtech</span>). I am a frontend and full-stack developer based in Lagos, Nigeria, dedicated to building software that works reliably in production.
              </p>

              <p className="reveal-item">
                My background centers on modern frontend engineering with React, JavaScript, and TypeScript, extending seamlessly into backend integrations with Supabase, Firebase, cloud infrastructure (AWS, Azure, Docker, Kubernetes), and REST APIs.
              </p>

              <p className="reveal-item">
                Rather than viewing code in a vacuum, I approach software with product thinking: What does the user need? How does the interface respond on a mobile device under varying network conditions? What architectural decisions make this platform simple to scale tomorrow?
              </p>

              <p className="reveal-item">
                From architecting multi-party marketplaces like Hand2Hand to building educational platforms and luxury e-commerce storefronts like Kambili Scents, I thrive on taking products from concept to deployment with meticulous attention to detail.
              </p>

              {/* Resume CTA */}
              <div className="pt-4 sm:pt-6 reveal-item">
                <a
                  ref={cvRef}
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2.5 min-h-[44px] px-5 py-2.5 rounded text-xs font-mono font-medium text-[#C1E8FF] bg-[#052659] border border-[#5483B3]/40 hover:border-[#7DA0CA] hover:bg-[#083375] transition-colors w-full sm:w-auto"
                  style={{ willChange: 'transform' }}
                >
                  <FileDown size={16} />
                  <span>Download Curriculum Vitae (PDF)</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Engineering Principles */}
          <div className="lg:col-span-5">
            <div
              ref={panelRef}
              className="rounded-lg bg-[#052659]/30 border border-[#5483B3]/25 p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6"
              style={{ willChange: 'transform' }}
            >
              <div className="flex items-center gap-2 text-xs font-mono text-[#5483B3] uppercase tracking-wider pb-3 border-b border-[#052659]">
                <Terminal size={14} className="text-[#7DA0CA]" />
                <span>Core Principles</span>
              </div>

              <div ref={principlesRef} className="space-y-5 sm:space-y-6">
                {principles.map((p, idx) => (
                  <div key={idx} className="principle-item">
                    <h4 className="text-xs sm:text-sm font-mono font-semibold text-[#C1E8FF] mb-1.5 flex items-center gap-2">
                      <span className="text-[#5483B3]">0{idx + 1}.</span>
                      {p.title}
                    </h4>
                    <p className="text-xs text-[#7DA0CA] leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#052659] flex items-center justify-between text-[11px] font-mono text-[#7DA0CA]">
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-[#5483B3]" />
                  Lagos, Nigeria
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
