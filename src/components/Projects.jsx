import React from 'react';
import SectionWrapper, { FadeIn } from './SectionWrapper';
import { Button } from './Button';
import { ExternalLink, Github, Box } from 'lucide-react';
import { motion } from 'framer-motion';

import weatherImg from '../assets/weather_app.png';
import foodersImg from '../assets/fooders_app.png';

const projects = [
  {
    title: "Hand2Hand",
    description: "A thoughtful marketplace for second-hand electronics. (Pending realization)",
    features: ["Real-time database", "Human-centric UI", "Secure checkout"],
    tech: ["React", "Firebase", "Tailwind"],
    image: null,
    className: "bg-primary/10",
    github: "https://github.com/Giftedtech1",
    demo: "#"
  },
  {
    title: "The Sky Today",
    description: "A minimal, calm weather app that tells you what you need to know without the clutter. Designed for clarity.",
    features: ["Dynamic moods", "Calm visuals", "Local forecast"],
    tech: ["React", "API", "Framer"],
    image: weatherImg,
    className: "bg-accent/10",
    github: "https://github.com/Giftedtech1",
    demo: "https://giftedtech1.github.io/gifted-s-weather-app"
  },
  {
    title: "Fooders",
    description: "A sleek, modern food website for food enthusiasts. Focused on visual appeal, taste, and seamless exploration.",
    features: ["Visual storytelling", "Menu curation", "Responsive design"],
    tech: ["React", "Tailwind", "Framer"],
    image: foodersImg,
    className: "bg-[#f2cc8f]/20",
    github: "https://github.com/Giftedtech1",
    demo: "https://giftedtech1.github.io/fooders/"
  }
];

const Projects = () => {
  return (
    <SectionWrapper id="projects" className="bg-main py-24 md:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-3xl mb-20">
        <FadeIn direction="up">
          <h2 className="text-4xl md:text-6xl font-black text-main mb-8 leading-tight">
            Some things I've <br />
            <span className="text-gradient italic">poured heart into.</span>
          </h2>
          <p className="text-sub/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            I love building things that solve problems, but I love it even more when they make people smile. Here are a few pieces of my work.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <FadeIn 
            key={project.title} 
            delay={0.2 * index}
            direction="up"
            className="group glass-card overflow-hidden flex flex-col h-full border-border-subtle hover:border-primary/20 transition-all duration-500 shadow-sm hover:shadow-organic"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col h-full"
            >
              {/* Soft Header/Image Area */}
              <div className={`h-56 w-full ${project.className} relative flex items-center justify-center overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 opacity-50" />
                
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
                ) : (
                  <Box className="w-16 h-16 text-primary/30 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" />
                )}

                {project.title === "Hand2Hand" && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-4 py-1.5 rounded-full bg-primary text-[#fdfaf5] text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                      Featured
                    </span>
                  </div>
                )}
                
                <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                  {project.tech.map(tech => (
                    <span key={tech} className="px-3 py-1 text-[10px] font-bold text-main bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-full border border-white/20 uppercase tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-black text-main mb-4 tracking-tight group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sub text-base mb-8 font-light leading-relaxed flex-1 italic">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 pt-6 mt-auto border-t border-border-subtle/50">
                  <Button variant="primary" size="sm" onClick={() => window.open(project.demo, '_blank')} className="flex-1 rounded-2xl bouncy">
                    <span>Visit App</span>
                    <ExternalLink size={16} className="ml-2" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => window.open(project.github, '_blank')} className="rounded-2xl border-none bg-accent/10 text-accent hover:bg-accent/20 bouncy">
                    <Github size={20} />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
      
      <FadeIn delay={0.6} direction="up" className="mt-20 text-center">
        <p className="text-sub font-medium mb-6 italic opacity-75">Curious to see more of my journey?</p>
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => window.open('https://github.com/Giftedtech1', '_blank')}
        >
          View GitHub Archive
        </Button>
      </FadeIn>
    </SectionWrapper>
  );
};

export default Projects;
