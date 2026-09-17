import React, { useRef, useEffect } from 'react';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import { animate, stagger } from 'animejs';
import { useAnimeCardTilt } from '../hooks/useAnimeCardTilt';
import ScrollReveal from './ScrollReveal';

const experiences = [
  {
    role: "Frontend & Product Engineer",
    company: "Freelance & Client Projects",
    location: "Lagos, Nigeria · Remote",
    dates: "2023 — Present",
    type: "Contract / Independent",
    description: "Architecting, delivering, and maintaining responsive web applications and full-stack platforms for clients across commerce, education, and logistics sectors.",
    highlights: [
      "Engineered the Hand2Hand marketplace platform with real-time Supabase state updates, responsive layouts, and low-bandwidth image processing pipelines.",
      "Delivered the Little Beginnings institutional web platform, achieving 98+ Google Lighthouse scores across performance, SEO, and accessibility.",
      "Built logistics management interfaces with consignment status tracking, dimensional rate calculators, and robust error boundaries.",
      "Established maintainable component design systems using React, Tailwind CSS, and strict semantic HTML."
    ],
    technologies: ["React", "TypeScript", "JavaScript", "Supabase", "Tailwind CSS", "REST APIs", "Vite"]
  },
  {
    role: "Frontend Web Developer",
    company: "Independent Software Builds & Open Source",
    location: "Lagos, Nigeria",
    dates: "2022 — 2023",
    type: "Projects & Production Builds",
    description: "Focused on mastering advanced frontend architecture, component lifecycles, state management, and modern browser APIs through hands-on production application development.",
    highlights: [
      "Built multiple production-grade web applications integrating external weather, food discovery, and content delivery REST APIs.",
      "Implemented responsive layouts and cross-browser compatibility across mobile, tablet, and desktop viewports.",
      "Maintained version control, continuous deployment workflows with Vercel and GitHub Pages, and rigorous code documentation."
    ],
    technologies: ["JavaScript (ES6+)", "React", "HTML5", "CSS3 / Tailwind", "Git", "REST APIs"]
  }
];

/** Single experience card with tilt and highlight stagger */
const ExperienceCard = ({ exp }) => {
  const cardRef = useAnimeCardTilt({ maxTilt: 4, scale: 1.01, perspective: 1400 });
  const highlightsRef = useRef(null);

  useEffect(() => {
    const list = highlightsRef.current;
    if (!list) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rows = list.querySelectorAll('.highlight-row');
    rows.forEach((r) => {
      r.style.opacity = '0';
      r.style.transform = 'translateX(-16px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate(rows, {
            opacity: [0, 1],
            translateX: [-16, 0],
            delay: stagger(70, { start: 150 }),
            duration: 600,
            ease: 'outCubic',
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
    <div
      ref={cardRef}
      className="rounded-lg bg-[#052659]/25 border border-[#5483B3]/25 p-5 sm:p-6 md:p-8 hover:border-[#7DA0CA]/40 transition-colors"
      style={{ willChange: 'transform' }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 pb-5 mb-5 border-b border-[#052659]">
        <div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#C1E8FF] tracking-tight mb-1">
            {exp.role}
          </h3>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-mono text-[#7DA0CA]">
            <span className="text-[#C1E8FF] font-semibold">{exp.company}</span>
            <span className="text-[#5483B3]">·</span>
            <span>{exp.location}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#021024] text-[#C1E8FF] border border-[#5483B3]/30 text-[11px] sm:text-xs">
            <Calendar size={12} className="text-[#7DA0CA]" />
            <span>{exp.dates}</span>
          </span>
          <span className="px-2 py-1 rounded bg-[#052659] text-[#7DA0CA] border border-[#5483B3]/20 text-[11px] sm:text-xs">
            {exp.type}
          </span>
        </div>
      </div>

      <p className="text-xs sm:text-sm md:text-base text-[#7DA0CA] leading-relaxed mb-5 font-normal">
        {exp.description}
      </p>

      {/* Technical Highlights — staggered left slide */}
      <div ref={highlightsRef} className="space-y-2 mb-5">
        {exp.highlights.map((highlight, hIdx) => (
          <div key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-[#C1E8FF]/85 font-mono leading-normal highlight-row">
            <span className="text-[#5483B3] mt-0.5 shrink-0">▸</span>
            <span>{highlight}</span>
          </div>
        ))}
      </div>

      {/* Technologies strip */}
      <div className="pt-4 border-t border-[#052659]/60 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] sm:text-xs font-mono text-[#5483B3] mr-1">Technologies:</span>
        {exp.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 rounded text-[11px] sm:text-xs font-mono bg-[#021024] text-[#7DA0CA] border border-[#5483B3]/20 hover:border-[#7DA0CA]/40 hover:text-[#C1E8FF] transition-colors cursor-default"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-20 sm:py-24 md:py-32 bg-[#021024] border-b border-[#052659]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">

        {/* Section Header */}
        <ScrollReveal direction="up" distance={24} delayStep={80} duration={700} ease="outExpo" threshold={0.3}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#052659]">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#C1E8FF] tracking-tight reveal-item">
                Work Experience
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-[#7DA0CA] mt-3 md:mt-0 max-w-md reveal-item">
              A track record of shipping real products, collaborating with clients, and delivering performant web interfaces.
            </p>
          </div>
        </ScrollReveal>

        {/* Experience Cards */}
        <ScrollReveal direction="up" distance={40} delayStep={100} duration={850} ease="outExpo" threshold={0.05}>
          <div className="space-y-8 sm:space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="reveal-item">
                <ExperienceCard exp={exp} />
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default Experience;
