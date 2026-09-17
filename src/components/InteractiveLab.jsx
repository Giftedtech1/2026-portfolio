import React from 'react';
import { Terminal, Sparkles, Cpu } from 'lucide-react';
import AnimeGridMatrix from './AnimeGridMatrix';
import InteractiveTerminal from './InteractiveTerminal';
import CoreStackLayout from './CoreStackLayout';
import ScrollReveal from './ScrollReveal';

const InteractiveLab = () => {
  return (
    <section id="interactive-lab" className="py-20 sm:py-24 md:py-32 bg-[#021024] border-b border-[#052659]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">

        {/* Section Header */}
        <ScrollReveal direction="up" distance={24} delayStep={80} duration={700} ease="outExpo" threshold={0.3}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#052659]">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#C1E8FF] tracking-tight reveal-item">
                Interactive Labs
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-[#7DA0CA] mt-3 md:mt-0 max-w-md reveal-item">
              Interactive micro-interactions, layout physics, and system simulations.
            </p>
          </div>
        </ScrollReveal>

        {/* Two-Column Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Terminal */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="up" distance={32} delayStep={100} duration={800} ease="outExpo" threshold={0.1}>
              <div className="reveal-item space-y-3">
                <InteractiveTerminal />
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Anime.js Stagger Ripple Matrix */}
          <div className="lg:col-span-6">
            <ScrollReveal direction="up" distance={32} delayStep={150} duration={800} ease="outExpo" threshold={0.1}>
              <div className="reveal-item space-y-3">
                <AnimeGridMatrix />
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Full-Width: Core Stack Auto Layout */}
        <div className="mt-8">
          <ScrollReveal direction="up" distance={32} delayStep={100} duration={800} ease="outExpo" threshold={0.1}>
            <div className="reveal-item">
              <CoreStackLayout />
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};

export default InteractiveLab;
