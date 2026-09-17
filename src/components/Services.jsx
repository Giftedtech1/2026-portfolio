import React from 'react';
import SectionWrapper, { FadeIn } from './SectionWrapper';
import { PenTool, Smartphone, Zap, Heart, Layout, Coffee } from 'lucide-react';
import AnimeCard from './AnimeCard';

const services = [
  {
    title: "Crafting Web Presence",
    description: "I build responsive, fast, and accessible websites that feel like a natural extension of your brand.",
    icon: <Layout size={32} />
  },
  {
    title: "Digital Handcrafting",
    description: "Every pixel is placed with care, ensuring your landing pages capture hearts and minds.",
    icon: <PenTool size={32} />
  },
  {
    title: "Mobile Experiences",
    description: "Designing for the palm of your hand. Flawless experiences on any screen size.",
    icon: <Smartphone size={32} />
  },
  {
    title: "Performance with Care",
    description: "I optimize your site so it loads in a heartbeat, respecting your users' time and data.",
    icon: <Zap size={32} />
  },
  {
    title: "Building Connections",
    description: "Connecting your app to the world with secure, real-time database solutions.",
    icon: <Heart size={32} />
  },
  {
    title: "Tailored Solutions",
    description: "I don't believe in one-size-fits-all. I build what you actually need, nothing more.",
    icon: <Coffee size={32} />
  }
];

const Services = () => {
  return (
    <SectionWrapper id="services" className="bg-main py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -z-10 translate-x-[-30%]" />
      
      <div className="max-w-3xl mb-20">
        <FadeIn direction="up">
          <h2 className="text-4xl md:text-6xl font-black text-main mb-8 leading-tight text-center md:text-left">
            How I can <br />
            <span className="text-gradient italic">help you.</span>
          </h2>
          <p className="text-sub/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed text-center md:text-left">
            I bring a mix of technical skill and human empathy to every project. Here's how we can work together to build something beautiful.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl">
        {services.map((service, index) => (
          <FadeIn 
            key={service.title} 
            delay={0.08 * index}
            direction="up"
            className="h-full"
          >
            <AnimeCard
              maxTilt={8}
              scale={1.03}
              className="h-full glass-card p-10 border border-border-subtle hover:border-primary/30 transition-colors relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-organic"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform group-hover:scale-125 duration-500" />
              
              <div className="mb-8 inline-flex p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/20 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm duration-300">
                {React.cloneElement(service.icon, { size: 28 })}
              </div>
              
              <h3 className="text-2xl font-black text-main mb-4 tracking-tight group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-sub/80 text-base leading-relaxed font-light">
                {service.description}
              </p>
            </AnimeCard>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Services;
