import React from 'react';
import SectionWrapper, { FadeIn } from './SectionWrapper';
import { Heart, Coffee, Leaf, Sun, FileDown } from 'lucide-react';
import { Button } from './Button';

const About = () => {
  const highlights = [
    {
      icon: <Heart className="text-primary" size={24} />,
      title: "People First",
      description: "I believe code is for people. I focus on empathy and accessibility in every line I write."
    },
    {
      icon: <Coffee className="text-accent" size={24} />,
      title: "Problem Solver",
      description: "Give me a complex puzzle and a cup of coffee, and I'm in my happy place."
    },
    {
      icon: <Leaf className="text-primary" size={24} />,
      title: "Growth Mindset",
      description: "Always learning, always growing. I treat every challenge as a lesson in disguise."
    },
    {
      icon: <Sun className="text-accent" size={24} />,
      title: "Lagos Energy",
      description: "The hustle and vibrancy of Lagos fuels my drive to build world-class digital tools."
    }
  ];

  return (
    <SectionWrapper id="about" className="bg-main py-24 md:py-32 overflow-hidden">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
        
        {/* Left: Text Content */}
        <div className="flex-1 space-y-10 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          
          <FadeIn direction="right">
            <h2 className="text-4xl md:text-6xl font-black text-main leading-tight">
              A little bit <br />
              <span className="text-gradient italic">about me.</span>
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.2} direction="right">
            <div className="space-y-8 text-sub text-lg md:text-xl leading-relaxed font-light">
              <p>
                Hello! I'm <span className="text-main font-semibold">Precious</span>, and I've always been fascinated by how we interact with the digital world. What started as "poking around" under the hood of websites turned into a lifelong mission to build tools that actually <span className="italic">feel</span> good to use.
              </p>
              <p>
                I don't just write code; I craft experiences. Whether it's a small boutique landing page or a complex web platform, I bring the same level of care, attention to detail, and human focus to every project.
              </p>
              <p className="font-medium text-main">
                Let's build something that makes people's lives a little bit easier, and a lot more beautiful.
              </p>
              
              <div className="pt-4">
                <a href="/resume.pdf" download>
                  <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/5">
                    Download My CV <FileDown className="ml-2 w-5 h-5" />
                  </Button>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right: Highlights Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full relative">
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl -z-10" />
          
          {highlights.map((item, index) => (
            <FadeIn 
              key={item.title} 
              delay={0.4 + (index * 0.1)} 
              direction="up"
              className="glass-card p-8 border-border-subtle hover:border-primary/20 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
              
              <div className="w-14 h-14 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-sm">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-main mb-3">{item.title}</h3>
              <p className="text-sub/80 text-sm leading-relaxed">{item.description}</p>
            </FadeIn>
          ))}
        </div>

      </div>
    </SectionWrapper>
  );
};

export default About;
