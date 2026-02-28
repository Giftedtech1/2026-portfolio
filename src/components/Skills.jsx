import React from 'react';
import SectionWrapper, { FadeIn } from './SectionWrapper';
import { motion } from 'framer-motion';

const skills = [
  { name: "Crafting Interfaces", level: 95, color: "from-primary/80 to-primary" },
  { name: "React Storytelling", level: 92, color: "from-accent/80 to-accent" },
  { name: "Styling with Care", level: 95, color: "from-primary/80 to-primary" },
  { name: "Connecting Data", level: 85, color: "from-accent/80 to-accent" },
  { name: "Responsive Focus", level: 98, color: "from-primary/80 to-primary" },
  { name: "Human-Centric UX", level: 90, color: "from-accent/80 to-accent" },
];

const Skills = () => {
  return (
    <SectionWrapper id="skills" className="bg-main py-24 md:py-32 overflow-hidden relative">
      <div className="absolute top-1/2 right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-3xl mb-20">
        <FadeIn direction="up">
          <h2 className="text-4xl md:text-6xl font-black text-main mb-8 leading-tight">
            My <span className="text-gradient italic">toolbelt.</span>
          </h2>
          <p className="text-sub/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
            These are the tools I use to bring ideas to life. I don't just learn syntax; I learn how to use these tools to create better experiences for everyone.
          </p>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl">
        {skills.map((skill, index) => (
          <FadeIn 
            key={skill.name} 
            delay={0.1 * index}
            direction="up"
            className="relative"
          >
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-xl font-bold text-main tracking-tight">{skill.name}</h3>
              <span className="text-sm font-black text-accent tracking-widest">{skill.level}%</span>
            </div>
            
            {/* Progress Bar Background */}
            <div className="w-full h-4 bg-accent/5 rounded-2xl overflow-hidden border border-accent/5 p-1">
              {/* Animated Progress Bar Fill */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.2 + (index * 0.1), ease: [0.34, 1.56, 0.64, 1] }}
                className={`h-full rounded-xl bg-gradient-to-r ${skill.color} shadow-sm relative`}
              >
                 <div className="absolute top-0 right-0 w-8 h-full bg-white/20 skew-x-12 translate-x-4 blur-sm" />
              </motion.div>
            </div>
          </FadeIn>
        ))}
      </div>
      
      <FadeIn delay={0.8} direction="up" className="mt-20 p-8 rounded-[2.5rem] bg-accent/5 border border-accent/10">
        <p className="text-main/80 text-center font-medium italic">
          "The best tool is the one that helps the most humans."
        </p>
      </FadeIn>
    </SectionWrapper>
  );
};

export default Skills;
