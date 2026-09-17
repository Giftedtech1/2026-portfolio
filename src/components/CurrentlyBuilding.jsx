import React from 'react';
import SectionWrapper, { FadeIn } from './SectionWrapper';
import { Activity, Clock, Code2, Database } from 'lucide-react';
import AnimeCard from './AnimeCard';

const activeProjects = [
  {
    title: "Hand2Hand Marketplace platform",
    status: "Active Development",
    icon: <Activity className="text-primary" size={20} />
  },
  {
    title: "Improving Firebase authentication system",
    status: "Optimization",
    icon: <Database className="text-accent" size={20} />
  },
  {
    title: "Learning advanced React architecture",
    status: "Learning",
    icon: <Code2 className="text-yellow-400" size={20} />
  },
  {
    title: "Building scalable frontend systems",
    status: "Ongoing",
    icon: <Clock className="text-green-400" size={20} />
  }
];

const CurrentlyBuilding = () => {
  return (
    <SectionWrapper id="currently-building" className="bg-sub py-16 md:py-24">
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center px-4 md:px-0">
        
        {/* Left Side: Text */}
        <div className="flex-1 text-center lg:text-left mb-8 lg:mb-0">
          <FadeIn direction="right">
            <h2 className="text-4xl md:text-5xl font-bold text-main mb-6">
              Currently <span className="text-gradient">Building</span>
            </h2>
            <p className="text-sub text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              I believe in constant evolution. Here's what I'm actively working on right now — from platform development to mastering new architectural patterns.
            </p>
          </FadeIn>
        </div>

        {/* Right Side: List Output */}
        <div className="flex-1 w-full max-w-xl">
          <div className="space-y-4">
            {activeProjects.map((item, index) => (
              <FadeIn 
                key={index} 
                delay={0.15 + (index * 0.08)} 
                direction="left"
              >
                <AnimeCard
                  maxTilt={5}
                  scale={1.02}
                  className="glass-card p-4 md:p-5 rounded-2xl border border-border-subtle hover:border-primary/30 flex items-center gap-4 transition-colors group shadow-sm hover:shadow-organic"
                >
                  <div className="w-12 h-12 rounded-2xl bg-surface flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300 shadow-inner">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base md:text-lg font-semibold text-main group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      <p className="text-xs md:text-sm font-medium text-muted">
                        {item.status}
                      </p>
                    </div>
                  </div>
                </AnimeCard>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default CurrentlyBuilding;
