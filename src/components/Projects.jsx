import React, { useRef, useEffect } from 'react';
import { Github, Zap } from 'lucide-react';
import { animate, stagger } from 'animejs';
import hand2handImg from '../assets/hand2hand.jpg';
import littleBeginningsImg from '../assets/little_beginnings.jpg';
import kambiliImg from '../assets/kambili.jpg';
import weatherImg from '../assets/weather_app.png';
import { useAnimeCardTilt } from '../hooks/useAnimeCardTilt';
import ScrollReveal from './ScrollReveal';
import ProjectPreview from './ProjectPreview';

const projects = [
  {
    id: "hand2hand",
    number: "01",
    title: "Hand2Hand Marketplace",
    category: "Marketplace",
    categoryDetail: "Full-Stack Commerce Platform",
    tagline: "Peer-to-peer gadget & electronics commerce platform engineered for Nigerian consumers.",
    role: "Lead Frontend & Product Engineer",
    timeline: "2024 — Present",
    description: "A responsive digital marketplace connecting verified gadget buyers and sellers across Nigeria. Architected with a mobile-first philosophy, real-time database synchronization, state-driven search filtering, and client-side image compression for low-bandwidth environments.",
    functionality: [
      "Real-time catalog filtering by device condition, price, and location",
      "Streamlined buyer-to-seller inquiry and verification flow",
      "Client-side image compression saving >60% bandwidth on mobile uploads",
      "Optimistic UI state management ensuring instantaneous user feedback"
    ],
    tech: ["React", "JavaScript", "Supabase", "Tailwind CSS", "REST APIs"],
    liveUrl: "https://hand2hand.com.ng/",
    githubUrl: "https://github.com/Giftedtech1",
    featured: true,
    highlightMetric: "Active Production",
    image: hand2handImg,
    badgeColor: "#3ECF8E"
  },
  {
    id: "little-beginnings",
    number: "02",
    title: "Little Beginnings Platform",
    category: "Client Project",
    categoryDetail: "Institutional Platform & Admissions Gateway",
    tagline: "High-performance web platform & admissions gateway for modern early childhood education.",
    role: "Frontend Engineer & UI Designer",
    timeline: "2024",
    description: "Engineered an accessible, high-performance web platform for Little Beginnings Academy. Designed to deliver clear program information to prospective parents, streamline enrollment inquiries, and maintain 98+ Google Lighthouse scores across performance and accessibility.",
    functionality: [
      "Online student inquiry and tour scheduling intake system",
      "Structured curriculum & academic calendar architecture",
      "Mobile-first responsive layouts achieving sub-second initial load times",
      "Strict semantic HTML conforming to WCAG AA accessibility standards"
    ],
    tech: ["React", "JavaScript", "Tailwind CSS", "Vite", "SEO Architecture"],
    liveUrl: "https://little-beginnings.org",
    githubUrl: "https://github.com/Giftedtech1",
    featured: true,
    highlightMetric: "98+ Lighthouse",
    image: littleBeginningsImg,
    badgeColor: "#38BDF8"
  },
  {
    id: "kambili-scents",
    number: "03",
    title: "Kambili Scents",
    category: "E-commerce",
    categoryDetail: "E-commerce / Web Development",
    tagline: "A modern e-commerce storefront for Kambili Scents, built for a clean, mobile-first fragrance shopping experience.",
    role: "Full-Stack Web Developer",
    timeline: "2024 — Present",
    description: "Engineered with dynamic fragrance collections, media asset management via Cloudinary, Firebase integration, and direct WhatsApp order fulfillment.",
    functionality: [
      "Product catalogue with scent notes & curated fragrance collections",
      "Cloudinary product image management & responsive mobile layout",
      "Seamless WhatsApp direct checkout & bank payment options",
      "Mobile-first navigation with dynamic product content presentation"
    ],
    tech: ["HTML", "CSS", "JavaScript", "Firebase", "Cloudinary"],
    liveUrl: "https://kambili.com.ng",
    githubUrl: null,
    featured: true,
    highlightMetric: "Active Storefront",
    image: kambiliImg,
    badgeColor: "#F59E0B"
  },
  {
    id: "the-sky-today",
    number: "04",
    title: "The Sky Today",
    category: "Web App",
    categoryDetail: "Ambient Meteorological Dashboard",
    tagline: "Minimalist, distraction-free weather application engineered for instant clarity.",
    role: "Creator & Developer",
    timeline: "2023",
    description: "A stripped-back weather application built to eliminate clutter. Integrates meteorological APIs with dynamic atmospheric states, search auto-complete, and responsive layout engineering.",
    functionality: [
      "Dynamic weather states with subtle contextual palette shifts",
      "Local micro-forecasts with humidity, wind speed, and visibility metrics",
      "Lightweight bundle size optimized for rapid mobile parsing"
    ],
    tech: ["React", "Weather API", "Tailwind CSS"],
    liveUrl: "https://giftedtech1.github.io/gifted-s-weather-app",
    githubUrl: "https://github.com/Giftedtech1/gifted-s-weather-app",
    featured: false,
    highlightMetric: "Fast API Integration",
    image: weatherImg,
    badgeColor: "#F59E0B"
  }
];

/** 1. Flagship Hero Project (Project 01 - Hand2Hand) */
const HeroProject = ({ project }) => {
  const tiltRef = useAnimeCardTilt({ maxTilt: 2.5, scale: 1.005, perspective: 1400 });

  return (
    <article
      ref={tiltRef}
      className="relative rounded-sm bg-gradient-to-b from-[#052659]/35 to-[#021024] border border-[#5483B3]/35 overflow-hidden transition-all duration-300 hover:border-[#7DA0CA]/60"
      style={{ willChange: 'transform' }}
    >
      {/* Top Editorial Status Bar */}
      <div className="px-5 sm:px-8 py-3.5 bg-[#052659]/50 border-b border-[#5483B3]/25 flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="text-[#7DA0CA] font-medium">
          {project.category}, {project.categoryDetail}
        </span>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-[#3ECF8E]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E]" />
            <span className="font-medium">{project.highlightMetric}</span>
          </div>
          <span className="text-[#7DA0CA] hidden sm:inline">{project.timeline}</span>
        </div>
      </div>

      {/* Main Content Showcase: Large Visual Left/Top, Narrative Right/Bottom */}
      <div className="p-6 sm:p-8 md:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Visual Showcase (7 cols on lg) with Live Preview System */}
          <div className="lg:col-span-7 order-1">
            <ProjectPreview
              project={project}
              aspect="aspect-[16/10]"
              priority={true}
            />
          </div>

          {/* Narrative & Engineering Specs (5 cols on lg) */}
          <div className="lg:col-span-5 order-2 flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#C1E8FF] tracking-tight mb-3">
                {project.title}
              </h3>

              <p className="text-sm sm:text-base text-[#7DA0CA] font-medium leading-relaxed mb-4">
                {project.tagline}
              </p>

              <p className="text-xs sm:text-sm text-[#C1E8FF]/80 leading-relaxed mb-6 font-normal">
                {project.description}
              </p>

              {/* Key Deliverables Bulleted List */}
              <div className="space-y-2 mb-6 pt-4 border-t border-[#052659]">
                {project.functionality.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-[#7DA0CA] leading-snug">
                    <span className="mt-2 w-1 h-1 rounded-full bg-[#3ECF8E] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Strip */}
              <div className="mb-6">
                <span className="text-sm text-[#5483B3] block mb-2">
                  Production stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-sm text-sm bg-[#021024] text-[#C1E8FF] border border-[#5483B3]/30 hover:border-[#7DA0CA] transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="pt-5 border-t border-[#052659] flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-sm text-sm font-medium text-[#021024] bg-[#C1E8FF] hover:bg-white transition-colors flex-1 sm:flex-initial"
                >
                  Visit the marketplace
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-sm text-sm text-[#7DA0CA] hover:text-[#C1E8FF] bg-[#021024] border border-[#5483B3]/30 hover:border-[#7DA0CA] transition-colors"
                  aria-label={`${project.title} GitHub`}
                >
                  <Github size={15} />
                  <span>Source code</span>
                </a>
              )}
            </div>

          </div>

        </div>
      </div>
    </article>
  );
};

/** 2. Wide Horizontal Split Case Study (Project 02 - Little Beginnings) */
const WideSplitProject = ({ project }) => {
  const tiltRef = useAnimeCardTilt({ maxTilt: 2, scale: 1.005, perspective: 1400 });

  return (
    <article
      ref={tiltRef}
      className="relative rounded-sm bg-[#052659]/25 border border-[#5483B3]/30 overflow-hidden transition-all duration-300 hover:border-[#7DA0CA]/50"
      style={{ willChange: 'transform' }}
    >
      {/* Top Meta Bar */}
      <div className="px-5 sm:px-8 py-3 bg-[#052659]/40 border-b border-[#5483B3]/20 flex flex-wrap items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-2.5">
          <span className="text-[#C1E8FF] font-semibold">{project.number}</span>
          <span className="text-[#7DA0CA]">
            {project.category}, {project.categoryDetail}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#38BDF8]">
          <Zap size={13} />
          <span>{project.highlightMetric}</span>
          <span className="text-[#7DA0CA] hidden sm:inline">{project.timeline}</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Information Column (Left) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5 order-2 lg:order-1">
            <div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#C1E8FF] tracking-tight mb-2">
                {project.title}
              </h3>

              <p className="text-sm text-[#7DA0CA] font-medium leading-relaxed mb-3">
                {project.tagline}
              </p>

              <p className="text-sm text-[#C1E8FF]/80 leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
                {project.functionality.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-[#7DA0CA]">
                    <span className="mt-2 w-1 h-1 rounded-full bg-[#38BDF8] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-sm text-sm bg-[#021024] text-[#7DA0CA] border border-[#5483B3]/25"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#052659] flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center min-h-[40px] px-5 py-2 rounded-sm text-sm font-medium text-[#021024] bg-[#C1E8FF] hover:bg-white transition-colors"
                >
                  Live platform
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[40px] px-4 py-2 rounded-sm text-sm text-[#7DA0CA] hover:text-[#C1E8FF] bg-[#021024] border border-[#5483B3]/30 hover:border-[#7DA0CA] transition-colors"
                >
                  <Github size={14} />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Screenshot Column (Right) */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <ProjectPreview
              project={project}
              aspect="aspect-[16/10]"
            />
          </div>

        </div>
      </div>
    </article>
  );
};

/** 3. Commercial E-Commerce Card (Project 03 - Kambili Scents) */
const CommercialCard = ({ project }) => {
  const tiltRef = useAnimeCardTilt({ maxTilt: 3, scale: 1.01, perspective: 1200 });

  return (
    <article
      ref={tiltRef}
      className="rounded-sm bg-[#052659]/20 border border-[#5483B3]/25 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#7DA0CA]/50 h-full"
      style={{ willChange: 'transform' }}
    >
      <div>
        {/* Meta Bar */}
        <div className="px-5 py-3 bg-[#052659]/40 border-b border-[#5483B3]/20 flex items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[#C1E8FF] font-semibold">{project.number}</span>
            <span className="text-[#7DA0CA] truncate">
              {project.category}, Client project
            </span>
          </div>

          <span className="px-2 py-0.5 rounded-sm bg-[#021024] text-[#F59E0B] border border-[#5483B3]/30 text-xs shrink-0 font-medium">
            {project.highlightMetric}
          </span>
        </div>

        {/* Visual Preview */}
        <div className="p-5 sm:p-6 pb-2">
          <ProjectPreview
            project={project}
            aspect="aspect-[16/9]"
          />
        </div>

        {/* Narrative & Details */}
        <div className="p-5 sm:p-6 pt-3">
          <h3 className="text-xl sm:text-2xl font-bold text-[#C1E8FF] tracking-tight mb-2">
            {project.title}
          </h3>

          <p className="text-sm text-[#7DA0CA] font-medium leading-relaxed mb-3">
            {project.tagline}
          </p>

          <p className="text-sm text-[#C1E8FF]/75 leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="space-y-1.5 mb-5">
            {project.functionality.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-[#7DA0CA] leading-tight">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#F59E0B] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-sm text-xs bg-[#021024] text-[#7DA0CA] border border-[#5483B3]/25"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 sm:p-6 pt-4 border-t border-[#052659] flex items-center justify-between">
        <span className="text-sm text-[#5483B3]">{project.timeline}</span>

        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 min-h-[38px] px-4 py-2 rounded-sm text-sm font-medium text-[#021024] bg-[#C1E8FF] hover:bg-white transition-colors"
            >
              View live site
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

/** 4. Compact Weather Application Card (Project 04 - The Sky Today) */
const WeatherCard = ({ project }) => {
  const tiltRef = useAnimeCardTilt({ maxTilt: 3, scale: 1.01, perspective: 1200 });

  return (
    <article
      ref={tiltRef}
      className="rounded-sm bg-[#052659]/20 border border-[#5483B3]/25 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#7DA0CA]/50 h-full"
      style={{ willChange: 'transform' }}
    >
      <div>
        {/* Meta Bar */}
        <div className="px-5 py-3 bg-[#052659]/40 border-b border-[#5483B3]/20 flex items-center justify-between gap-2 text-sm">
          <div className="flex items-center gap-2 truncate">
            <span className="text-[#C1E8FF] font-semibold">{project.number}</span>
            <span className="text-[#7DA0CA] truncate">
              {project.category}
            </span>
          </div>

          <span className="px-2 py-0.5 rounded-sm bg-[#021024] text-[#F59E0B] border border-[#5483B3]/30 text-xs shrink-0 font-medium">
            {project.highlightMetric}
          </span>
        </div>

        {/* Visual Preview */}
        <div className="p-5 sm:p-6 pb-2">
          <ProjectPreview
            project={project}
            aspect="aspect-[4/3]"
          />
        </div>

        {/* Narrative & Details */}
        <div className="p-5 sm:p-6 pt-3">
          <h3 className="text-xl sm:text-2xl font-bold text-[#C1E8FF] tracking-tight mb-2">
            {project.title}
          </h3>

          <p className="text-sm text-[#7DA0CA] font-medium leading-relaxed mb-3">
            {project.tagline}
          </p>

          <p className="text-sm text-[#C1E8FF]/75 leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="space-y-1.5 mb-5">
            {project.functionality.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-[#7DA0CA] leading-tight">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#F59E0B] shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded-sm text-xs bg-[#021024] text-[#7DA0CA] border border-[#5483B3]/25"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-5 sm:p-6 pt-4 border-t border-[#052659] flex items-center justify-between">
        <span className="text-sm text-[#5483B3]">{project.timeline}</span>

        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center px-3 py-1.5 rounded-sm text-sm font-medium text-[#021024] bg-[#C1E8FF] hover:bg-white transition-colors"
            >
              Live app
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center p-1.5 rounded-sm text-[#7DA0CA] hover:text-[#C1E8FF] bg-[#021024] border border-[#5483B3]/30 hover:border-[#7DA0CA] transition-colors"
              aria-label={`${project.title} GitHub`}
            >
              <Github size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  const headerRef = useRef(null);

  const heroProject = projects[0];
  const splitProject = projects[1];
  const kambiliProject = projects[2];
  const weatherProject = projects[3];

  useEffect(() => {
    if (!headerRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = headerRef.current;
    const items = el.querySelectorAll('.header-item');
    items.forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate(items, {
            opacity: [0, 1],
            translateY: [20, 0],
            delay: stagger(80),
            duration: 700,
            ease: 'outExpo',
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className="py-20 sm:py-24 md:py-32 bg-[#021024] border-b border-[#052659]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#052659]">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#C1E8FF] tracking-tight header-item">
              Featured Projects
            </h2>
          </div>
          <p className="text-sm text-[#7DA0CA] mt-3 md:mt-0 max-w-md header-item">
            Production platforms, client storefronts, and web systems.
          </p>
        </div>

        {/* Editorial Asymmetrical Layout */}
        <div className="space-y-10 sm:space-y-14">

          {/* Tier 1: Flagship Hero Project (Spans Full Width) */}
          <ScrollReveal direction="up" distance={32} delayStep={0} duration={850} ease="outExpo" threshold={0.05}>
            <div className="reveal-item">
              <HeroProject project={heroProject} />
            </div>
          </ScrollReveal>

          {/* Tier 2: Wide Horizontal Editorial Split */}
          <ScrollReveal direction="up" distance={32} delayStep={0} duration={850} ease="outExpo" threshold={0.05}>
            <div className="reveal-item">
              <WideSplitProject project={splitProject} />
            </div>
          </ScrollReveal>

          {/* Tier 3: Asymmetric Duo (7-col Kambili Scents + 5-col Weather App) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            <ScrollReveal direction="up" distance={32} delayStep={0} duration={850} ease="outExpo" threshold={0.05} className="lg:col-span-7 flex flex-col">
              <div className="reveal-item h-full flex flex-col">
                <CommercialCard project={kambiliProject} />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" distance={32} delayStep={100} duration={850} ease="outExpo" threshold={0.05} className="lg:col-span-5 flex flex-col">
              <div className="reveal-item h-full flex flex-col">
                <WeatherCard project={weatherProject} />
              </div>
            </ScrollReveal>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Projects;
