import React from 'react';
import SectionWrapper, { FadeIn } from './SectionWrapper';
import { ArrowRight, CheckCircle2, Target, Lightbulb, PenTool, LayoutTemplate } from 'lucide-react';
import AnimeCard from './AnimeCard';

const CaseStudies = () => {
  const caseStudy = {
    title: "Hand2Hand Marketplace",
    problem: "Users needed a secure, fast, and intuitive platform to buy and sell second-hand digital items locally. Existing solutions were clunky, lacked proper real-time updates, and had poor responsive experiences on mobile devices.",
    approach: "I focused on a mobile-first design strategy. I mapped out the core user flows (listing an item, messaging, checking out) and opted for React to ensure a snappy single-page application feel, backed by Firebase for real-time synchronization.",
    solution: "I engineered a component-based architecture using React and Tailwind CSS for rapid UI development. Firebase handled authentication and real-time database updates for instant market feedback.",
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'Framer Motion', 'Vite'],
    challenges: "Handling complex state management across multiple deeply nested components initially caused rendering bottlenecks. Integrating image uploads seamlessly required careful validation and compression logic to maintain performance.",
    results: [
      "Reduced load times by 40% through component lazy loading.",
      "Achieved a 95+ score on Google Lighthouse for performance and standard SEO.",
      "Created a seamless, app-like experience on mobile browsers."
    ]
  };

  return (
    <SectionWrapper id="case-studies" className="py-16 md:py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <FadeIn direction="up">
          <h2 className="text-4xl md:text-5xl font-bold text-main mb-6">
            Detailed <span className="text-gradient">Case Study</span>
          </h2>
          <p className="text-sub text-lg max-w-3xl mx-auto">
            A deep dive into the architecture and decision-making process behind one of my most complex projects.
          </p>
        </FadeIn>
      </div>

      <FadeIn delay={0.2} direction="up" className="max-w-5xl mx-auto px-4 md:px-0">
        <AnimeCard
          maxTilt={4}
          scale={1.01}
          className="glass-card p-1 rounded-3xl border border-border-subtle hover:border-primary/30 relative overflow-hidden group shadow-lg hover:shadow-organic"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-colors"></div>
          
          <div className="bg-sub/80 backdrop-blur-sm rounded-[22px] p-6 md:p-12 relative z-10">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-8 border border-primary/20">
              Featured Case Study
            </div>
            
            <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
              <div className="space-y-10 md:space-y-12">
                <section>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-2.5 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-500">
                      <Target size={24} />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-main">The Problem</h4>
                  </div>
                  <p className="text-sub leading-relaxed text-base md:text-lg">
                    {caseStudy.problem}
                  </p>
                </section>

                <section>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-2.5 rounded-lg bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-400">
                      <Lightbulb size={24} />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-main">My Approach</h4>
                  </div>
                  <p className="text-sub leading-relaxed text-base md:text-lg">
                    {caseStudy.approach}
                  </p>
                </section>

                <section>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                      <PenTool size={24} />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-main">The Solution</h4>
                  </div>
                  <p className="text-sub leading-relaxed text-base md:text-lg mb-6">
                    {caseStudy.solution}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map(tech => (
                      <span key={tech} className="px-4 py-1.5 text-xs font-bold text-main bg-surface border border-border-subtle rounded-lg">
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <div className="space-y-12">
                <section>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-2.5 rounded-lg bg-orange-100 dark:bg-orange-500/10 text-orange-500">
                      <LayoutTemplate size={24} />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-main">Challenges</h4>
                  </div>
                  <div className="space-y-5">
                    <p className="text-sub leading-relaxed text-base md:text-lg">
                      {caseStudy.challenges}
                    </p>
                    <div className="bg-surface p-5 md:p-6 rounded-2xl border-l-4 border-accent shadow-sm italic">
                      <p className="text-sub text-sm md:text-base">
                        "By restructuring state into localized Context APIs and optimizing image processing before upload, I improved app performance significantly."
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="p-2.5 rounded-lg bg-green-100 dark:bg-green-500/10 text-green-500">
                      <CheckCircle2 size={24} />
                    </div>
                    <h4 className="text-xl md:text-2xl font-bold text-main">The Results</h4>
                  </div>
                  <ul className="space-y-4">
                    {caseStudy.results.map((item, i) => (
                      <li key={i} className="flex gap-3 md:gap-4 items-start">
                        <div className="mt-1.5 p-1 rounded-full bg-primary/20 text-primary shrink-0">
                          <ArrowRight size={14} />
                        </div>
                        <span className="text-sub text-base md:text-lg leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </AnimeCard>
      </FadeIn>
    </SectionWrapper>
  );
};

export default CaseStudies;
