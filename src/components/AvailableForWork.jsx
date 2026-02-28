import React from 'react';
import { FadeIn } from './SectionWrapper';
import { Button } from './Button';
import { Sparkles } from 'lucide-react';

const AvailableForWork = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <FadeIn direction="up">
          <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 p-[1px] rounded-3xl overflow-hidden relative">
            
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-sub/95 backdrop-blur-xl"></div>
            
            <div className="relative p-10 md:p-16 text-center flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-medium text-sm mb-8 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Available for Work
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-main mb-6">
                Ready to build your next <br className="hidden md:block" />
                <span className="text-gradient">digital experience?</span>
              </h2>

              <p className="text-sub text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Currently open for remote developer roles, freelance web development, startup collaborations, and long-term contracts globally.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  <Sparkles size={20} className="mr-2" />
                  Work With Me
                </Button>
                <Button variant="secondary" size="lg" onClick={() => window.open('https://github.com/Giftedtech1', '_blank')}>
                  View GitHub
                </Button>
              </div>
            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default AvailableForWork;
