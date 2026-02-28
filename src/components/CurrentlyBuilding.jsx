import React from 'react';
import SectionWrapper, { FadeIn } from './SectionWrapper';
import { Activity, Clock, Code2, Database } from 'lucide-react';

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
                delay={0.2 + (index * 0.1)} 
                direction="left"
                className="glass-card p-4 md:p-5 rounded-xl border border-border-subtle flex items-center gap-4 hover:border-primary/20 transition-all group shadow-sm hover:shadow-md"
              >
                <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-base md:text-lg font-semibold text-main group-hover:text-primary transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs md:text-sm font-medium text-muted mt-0.5">
                    {item.status}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
};

export default CurrentlyBuilding;
