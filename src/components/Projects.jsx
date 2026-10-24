import React, { useRef, useEffect } from 'react';
import { Github, Zap } from 'lucide-react';
import { animate, stagger } from 'animejs';
import hand2handImg from '../assets/hand2hand.webp';
import littleBeginningsImg from '../assets/little_beginnings.webp';
import kambiliImg from '../assets/kambili.webp';
import weatherImg from '../assets/weather_app.webp';
import { useAnimeCardTilt } from '../hooks/useAnimeCardTilt';
import ScrollReveal from './ScrollReveal';
import ProjectPreview from './ProjectPreview';

const projects = [
  {
    id: "hand2hand",
    number: "01",
    title: "Hand2Hand Marketplace",
    category: "Marketplace",
    categoryDetail: "My own product",
    tagline: "A Nigerian marketplace where people buy and sell gadgets safely, designed for phones and mobile data.",
    role: "Founder & Developer",
    timeline: "2024 — Present",
    description: "I designed and built Hand2Hand end to end: listings, search, buyer-seller chat and verification. It's built for how Nigerians actually shop online, mostly on phones, often on slow or expensive data.",
    functionality: [
      "Buyers can filter gadgets by condition, price and location in real time",
      "Simple enquiry and verification flow between buyers and sellers",
      "Photo uploads shrunk on the phone first, using over 60% less data",
      "Pages respond instantly, even on a weak connection"
    ],
    tech: ["React", "Supabase", "Tailwind CSS"],
    liveUrl: "https://hand2hand.com.ng/",
    githubUrl: null,
    featured: true,
    highlightMetric: "Launching January 2027",
    image: hand2handImg,
    badgeColor: "#3ECF8E"
  },
  {
    id: "little-beginnings",
    number: "02",
    title: "Little Beginnings Academy",
    category: "Client Project",
    categoryDetail: "School website",
    tagline: "A school website that answers parents' questions and turns visits into tour bookings.",
    role: "Designer & Developer",
    timeline: "2024",
    description: "Little Beginnings needed a site that gives prospective parents everything they need to choose the school, and makes it easy to take the next step. Parents can explore programmes and the academic calendar, then book a tour or send an enquiry online.",
    functionality: [
      "Online enquiry and tour booking, straight to the school",
      "Clear programme, curriculum and calendar pages for parents",
      "Loads in under a second on mobile",
      "98+ Google Lighthouse score for speed, SEO and accessibility"
    ],
    tech: ["React", "Tailwind CSS", "SEO"],
    liveUrl: "https://little-beginnings.org",
    githubUrl: null,
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
    categoryDetail: "Online store",
    tagline: "An online fragrance store where customers browse, choose and order on WhatsApp in a few taps.",
    role: "Designer & Developer",
    timeline: "2024 — Present",
    description: "Kambili Scents sells through WhatsApp, so the store sends every order straight there, with bank transfer as a payment option. The owner manages products and photos without touching code.",
    functionality: [
      "Product catalogue with scent notes and curated collections",
      "One-tap WhatsApp ordering and bank payment options",
      "Owner-managed product photos and listings",
      "Designed for shopping on a phone"
    ],
    tech: ["JavaScript", "Firebase", "Cloudinary"],
    liveUrl: "https://kambili.com.ng",
    githubUrl: null,
    featured: true,
    highlightMetric: "Live store",
    image: kambiliImg,
    badgeColor: "#F59E0B"
  },
  {
    id: "the-sky-today",
    number: "04",
    title: "The Sky Today",
    category: "Web App",
    categoryDetail: "Side project",
    tagline: "A clean, clutter-free weather app.",
    role: "Creator & Developer",
    timeline: "2023",
    description: "A small side project: live weather for any city, with search suggestions and a look that shifts with the conditions outside.",
    functionality: [
      "Live forecasts with humidity, wind and visibility",
      "City search with suggestions",
      "Lightweight and quick on mobile"
    ],
    tech: ["React", "Weather API", "Tailwind CSS"],
    liveUrl: "https://giftedtech1.github.io/gifted-s-weather-app",
    githubUrl: "https://github.com/Giftedtech1/gifted-s-weather-app",
    featured: false,
    highlightMetric: "Side project",
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
                  Built with
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
                  Visit the site
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
              Recent work
            </h2>
          </div>
          <p className="text-sm text-[#7DA0CA] mt-3 md:mt-0 max-w-md header-item">
            Websites and online stores I've built for real businesses, plus my own product.
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
