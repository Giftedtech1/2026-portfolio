import React, { useRef, useEffect, useState } from 'react';
import { FileDown, Terminal } from 'lucide-react';
import { animate, stagger } from 'animejs';
import { useAnimeCardTilt } from '../hooks/useAnimeCardTilt';
import { useMagneticHover } from '../hooks/useMagneticHover';
import ScrollReveal from './ScrollReveal';
import VideoModal from './VideoModal';

import meImg from '../assets/me.jpeg';
import devVideo from '../assets/geometric-instagram-152-portrait-1080x1350.mp4';

const principles = [
  {
    title: "Built for phones and mobile data",
    description: "Most of your customers will find you on a phone, often on slow or expensive data. Every site I build loads fast and works well there first."
  },
  {
    title: "Made to be found on Google",
    description: "A website only helps if people can find it. I set up the basics properly from day one: page titles, speed, Google Business links and clean structure."
  },
  {
    title: "Easy for you to run",
    description: "Clear handover, simple updates, and support after launch, with a monthly care plan if you'd rather I handle everything."
  }
];

const About = () => {
  const panelRef = useAnimeCardTilt({ maxTilt: 4, scale: 1.01, perspective: 1400 });
  const cvRef = useMagneticHover({ strength: 0.2 });
  const principlesRef = useRef(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

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
                About me
              </h2>
            </div>
            <p className="text-sm text-[#7DA0CA] mt-3 md:mt-0 max-w-md reveal-item">
              A Lagos web developer who cares about one thing: your website bringing you business.
            </p>
          </div>
        </ScrollReveal>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Main Narrative Column */}
          <ScrollReveal direction="up" distance={32} delayStep={100} duration={800} ease="outExpo" threshold={0.15} className="lg:col-span-7">
            <div>
              {/* Developer Profile Header Badge */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-4 sm:p-5 rounded-sm bg-[#052659]/40 border border-[#5483B3]/30 mb-8 reveal-item">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-sm overflow-hidden border border-[#38BDF8]/40">
                  <img
                    src={meImg}
                    alt="Ogunleye Precious"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#021024]/60 to-transparent pointer-events-none" />
                </div>

                <div className="space-y-1.5 flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-[#C1E8FF]">
                    Ogunleye Precious <span className="text-sm text-[#7DA0CA] font-normal">(@Giftedtech)</span>
                  </h3>
                  <p className="text-sm text-[#7DA0CA]">
                    Web Developer, Lagos
                  </p>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="space-y-5 sm:space-y-6 text-sm sm:text-base md:text-lg text-[#7DA0CA] font-normal leading-relaxed reveal-item">
                <p>
                  I am <span className="text-[#C1E8FF] font-semibold">Ogunleye Precious</span> (known across the tech community as <span className="text-[#C1E8FF] font-medium">Giftedtech</span>). I build websites, online stores and web apps for businesses in Lagos, across Nigeria and abroad.
                </p>

                <p className="reveal-item">
                  I handle everything from design to launch, so you deal with one person who understands both how your site looks and how it works. I use modern tools (React, Next.js, Supabase), which means your site is fast, secure and easy to grow later.
                </p>

                <p className="reveal-item">
                  Before I build anything, I ask what your customers need to do on your site (book, buy, call, or message you) and design everything around making that easy.
                </p>

                <p className="reveal-item">
                  I've built a school website for Little Beginnings Academy, an online store for Kambili Scents, and my own marketplace, Hand2Hand. Yours could be next.
                </p>

                {/* CTAs: Resume */}
                <div className="pt-4 sm:pt-6 flex flex-wrap items-center gap-3.5 reveal-item">
                  <a
                    ref={cvRef}
                    href="/resume.pdf"
                    download
                    className="inline-flex items-center justify-center gap-2.5 min-h-[44px] px-5 py-2.5 rounded-sm text-sm font-medium text-[#C1E8FF] bg-[#052659] border border-[#5483B3]/40 hover:border-[#7DA0CA] hover:bg-[#083375] transition-colors w-full sm:w-auto"
                    style={{ willChange: 'transform' }}
                  >
                    <FileDown size={16} />
                    <span>Download résumé (PDF)</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Engineering Principles */}
          <div className="lg:col-span-5">
            <div
              ref={panelRef}
              className="rounded-sm bg-[#052659]/30 border border-[#5483B3]/25 p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6"
              style={{ willChange: 'transform' }}
            >
              <div className="flex items-center gap-2 text-sm text-[#5483B3] pb-3 border-b border-[#052659]">
                <Terminal size={14} className="text-[#7DA0CA]" />
                <span>What you can expect</span>
              </div>

              <div ref={principlesRef} className="space-y-5 sm:space-y-6">
                {principles.map((p, idx) => (
                  <div key={idx} className="principle-item">
                    <h4 className="text-sm font-semibold text-[#C1E8FF] mb-1.5 flex items-center gap-2">
                      <span className="text-[#5483B3]">0{idx + 1}</span>
                      {p.title}
                    </h4>
                    <p className="text-sm text-[#7DA0CA] leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Cinematic Modal for Video Reel */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc={devVideo}
      />
    </section>
  );
};

export default About;
