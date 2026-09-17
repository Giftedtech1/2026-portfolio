import React from 'react';
import SectionWrapper, { FadeIn } from './SectionWrapper';
import { Heart, Stars } from 'lucide-react';
import AnimeCard from './AnimeCard';

const testimonials = [
  {
    quote: "Precious isn't just a great dev; he's a great human to work with. He really listens and cares about the little things that make a big difference for users.",
    author: "Tobi Adeyemi",
    role: "Startup Founder",
    avatar: "bg-primary/20"
  },
  {
    quote: "Working with Precious was a breath of fresh air. He brought so much heart to our project and transformed our ideas into something truly beautiful.",
    author: "Sarah Johnson",
    role: "Product Lead",
    avatar: "bg-accent/20"
  },
  {
    quote: "The attention to detail and empathy for the user is what sets Precious apart. He's my go-to person for anything frontend.",
    author: "David Chen",
    role: "Creative Director",
    avatar: "bg-[#f2cc8f]/30"
  }
];

const Testimonials = () => {
  return (
    <SectionWrapper id="testimonials" className="bg-main py-24 md:py-32 relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-3xl mb-20 text-center mx-auto">
        <FadeIn direction="up">
          <h2 className="text-4xl md:text-6xl font-black text-main mb-8 leading-tight">
            Kind words from <br />
            <span className="text-gradient italic">friends & partners.</span>
          </h2>
          <p className="text-sub/80 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            I've been lucky to work with some amazing people. Here is what they have to say about our journey together.
          </p>
        </FadeIn>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((t, index) => (
          <FadeIn 
            key={index} 
            delay={0.15 * index}
            direction="up"
            className="h-full"
          >
            <AnimeCard
              maxTilt={7}
              scale={1.025}
              className="glass-card p-10 border border-border-subtle hover:border-primary/30 relative flex flex-col h-full rounded-[2rem] shadow-sm hover:shadow-organic transition-colors"
            >
              <div className="mb-8 flex justify-between items-start">
                <div className="flex gap-1 text-accent/50 group-hover:text-accent transition-colors duration-500">
                  <Stars size={24} />
                </div>
                <Heart size={24} className="text-primary/30 group-hover:text-primary transition-colors duration-500" />
              </div>

              <p className="text-main/90 font-light italic mb-10 text-lg leading-relaxed flex-1">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-5 pt-8 border-t border-border-subtle/50">
                <div className={`w-14 h-14 rounded-2xl ${t.avatar} flex items-center justify-center text-main font-black text-xl shadow-inner`}>
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-main tracking-tight text-lg">{t.author}</h4>
                  <p className="text-sm font-medium text-accent uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </AnimeCard>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Testimonials;
