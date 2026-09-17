import React from 'react';
import { Github, ArrowUpRight, Terminal } from 'lucide-react';
import { useAnimeCardTilt } from '../hooks/useAnimeCardTilt';
import { useMagneticHover } from '../hooks/useMagneticHover';
import ScrollReveal from './ScrollReveal';

const pinnedRepos = [
  {
    name: "gifted-s-weather-app",
    description: "Minimal, distraction-free atmospheric tracking application built with React and meteorological APIs.",
    language: "JavaScript",
    url: "https://github.com/Giftedtech1/gifted-s-weather-app"
  },
  {
    name: "fooders",
    description: "Culinary presentation platform exploring responsive design, image storytelling, and visual interaction.",
    language: "JavaScript",
    url: "https://github.com/Giftedtech1/fooders"
  },
  {
    name: "2026-portfolio",
    description: "Production engineering portfolio built with React, Vite, and technical design system tokens.",
    language: "JavaScript",
    url: "https://github.com/Giftedtech1"
  }
];

/** Individual repo card with tilt */
const RepoCard = ({ repo }) => {
  const tiltRef = useAnimeCardTilt({ maxTilt: 7, scale: 1.025, perspective: 900 });

  return (
    <a
      ref={tiltRef}
      href={repo.url}
      target="_blank"
      rel="noreferrer"
      className="rounded border border-[#052659] bg-[#021024]/80 p-5 flex flex-col justify-between hover:border-[#7DA0CA]/40 transition-colors group"
      style={{ willChange: 'transform' }}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-sm font-semibold text-[#C1E8FF] group-hover:text-white flex items-center gap-1.5 truncate">
            <Terminal size={14} className="text-[#5483B3]" />
            {repo.name}
          </span>
          <ArrowUpRight size={14} className="text-[#5483B3] group-hover:text-[#C1E8FF] shrink-0 transition-colors" />
        </div>
        <p className="text-xs text-[#7DA0CA] leading-relaxed mb-4">
          {repo.description}
        </p>
      </div>

      <div className="pt-3 border-t border-[#052659] flex items-center justify-between text-[11px] font-mono text-[#5483B3]">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#5483B3]" />
          {repo.language}
        </span>
        <span className="text-[#7DA0CA] group-hover:underline">View repo</span>
      </div>
    </a>
  );
};

const GithubSection = () => {
  const githubCTARef = useMagneticHover({ strength: 0.2 });

  return (
    <section className="py-16 sm:py-20 bg-[#021024] border-b border-[#052659]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">

        <ScrollReveal direction="up" distance={36} delayStep={60} duration={800} ease="outExpo" threshold={0.1}>
          <div className="rounded-lg bg-[#052659]/30 border border-[#5483B3]/25 p-5 sm:p-8 md:p-12 reveal-item">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 sm:pb-8 border-b border-[#052659]">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-xs font-mono text-[#5483B3] uppercase tracking-widest mb-2">
                  <Github size={14} className="text-[#7DA0CA]" />
                  <span>Open Source & Repositories</span>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#C1E8FF] tracking-tight mb-2">
                  Code is part of the work.
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-[#7DA0CA] leading-relaxed">
                  Explore my repositories, experiments, open-source codebases, and production architecture on GitHub.
                </p>
              </div>

              <a
                ref={githubCTARef}
                href="https://github.com/Giftedtech1"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded text-xs font-mono font-medium text-[#021024] bg-[#C1E8FF] hover:bg-white transition-colors shrink-0 shadow-sm w-full sm:w-auto"
                style={{ willChange: 'transform' }}
              >
                <Github size={16} />
                <span>github.com/Giftedtech1</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            {/* Repositories Directory */}
            <ScrollReveal direction="up" distance={28} delayStep={100} duration={750} ease="outExpo" threshold={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
                {pinnedRepos.map((repo) => (
                  <div key={repo.name} className="reveal-item">
                    <RepoCard repo={repo} />
                  </div>
                ))}
              </div>
            </ScrollReveal>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default GithubSection;
