import React from 'react';
import SectionWrapper, { FadeIn } from './SectionWrapper';
import { Target, Zap, Shield, Users, Award, Code2 as Code } from 'lucide-react';

const reasons = [
  {
    title: "Fast Learner",
    description: "Able to quickly adapt to new tools, frameworks, and workflows. Constant self-improvement is my baseline.",
    icon: <Zap size={24} className="text-yellow-400" />
  },
  {
    title: "Problem Solver",
    description: "I enjoy dissecting complex requirements into manageable, scalable technical solutions.",
    icon: <Target size={24} className="text-red-400" />
  },
  {
    title: "Clean & Scalable Code",
    description: "My architecture emphasizes maintainability, component reusability, and descriptive naming conventions.",
    icon: <Code size={24} className="text-primary" />
  },
  {
    title: "Strong Design Sense",
    description: "I bridge the gap between engineering and design, ensuring UI accuracy and highly polished aesthetics.",
    icon: <Award size={24} className="text-accent" />
  },
  {
    title: "Reliable Developer",
    description: "Committing to deadlines, transparent communication, and taking ownership of the outcome.",
    icon: <Shield size={24} className="text-green-400" />
  },
  {
    title: "Great Communication",
    description: "Fluent in articulating technical concepts to non-technical stakeholders and collaborating seamlessly with global teams.",
    icon: <Users size={24} className="text-blue-400" />
  }
];

const WhyHireMe = () => {
  return (
    <SectionWrapper id="why-hire-me" className="bg-sub relative overflow-hidden">
      {/* Organic Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-blob" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -z-10 animate-blob [animation-delay:2s]" />
      
      <div className="flex flex-col md:flex-row gap-16 items-center relative z-10">
        
        {/* Left: Sticky Context */}
        <div className="md:w-1/3 md:sticky md:top-32 self-start text-center md:text-left">
          <FadeIn direction="up">
            <h2 className="text-4xl md:text-5xl font-black text-main mb-6 leading-tight">
              Why <span className="text-gradient italic">Hire Me?</span>
            </h2>
            <p className="text-sub text-lg md:text-xl font-light leading-relaxed">
              I bring a combination of technical expertise, creative problem-solving, and a dedication to quality that goes beyond just writing code.
            </p>
          </FadeIn>
        </div>

        {/* Right: Scrolling Grid */}
        <div className="md:w-2/3 grid sm:grid-cols-2 gap-6 w-full">
          {reasons.map((reason, index) => (
            <FadeIn 
              key={reason.title} 
              delay={0.1 * index}
              direction="up"
              className="group glass-card p-8 border-border-subtle hover:border-primary/20 hover:shadow-organic transition-all bouncy"
            >
              <div className="mb-6 inline-flex p-4 rounded-2xl bg-surface text-primary group-hover:bg-primary group-hover:text-white group-hover:glow-primary transition-all duration-500">
                {reason.icon}
              </div>
              <h3 className="text-2xl font-black text-main mb-3 tracking-tight">{reason.title}</h3>
              <p className="text-sub/80 leading-relaxed font-light">
                {reason.description}
              </p>
            </FadeIn>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};

export default WhyHireMe;
