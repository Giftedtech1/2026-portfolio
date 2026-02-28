import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MessageSquare, ArrowRight, FileDown } from 'lucide-react';
import { Button } from './Button';
import { FadeIn } from './SectionWrapper';

const TypewriterText = ({ texts }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer;
    const handleType = () => {
      const fullText = texts[currentTextIndex];
      
      if (isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setTypingSpeed(500);
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, texts, typingSpeed]);

  return (
    <span className="text-accent min-h-[40px] inline-block font-medium italic">
      {currentText}
      <span className="animate-pulse ml-1 text-primary">|</span>
    </span>
  );
};

const Hero = () => {
  const roles = [
    "Building for humans",
    "Crafting digital stories",
    "Solving puzzles with code",
    "Focusing on the experience"
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden" id="hero">
      {/* Organic Background Blobs - Slower & Softer */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/5 dark:bg-primary/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[450px] h-[450px] bg-accent/5 dark:bg-accent/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-5000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-[#f2cc8f]/10 dark:bg-[#f2cc8f]/5 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob animation-delay-10000"></div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <FadeIn delay={0.2} direction="down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-sm font-medium tracking-wide">Available for new stories</span>
          </div>
        </FadeIn>

        <FadeIn delay={0.4} direction="up" className="mb-6">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-main mb-6 tracking-tight leading-[1.05] selection:bg-primary/20">
            Hi, I'm <span className="text-gradient">Precious</span>. <br />
            Let's build with <span className="relative">
              heart.
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary/30" />
              </svg>
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.6} direction="up" className="mb-8">
          <div className="text-xl md:text-2xl font-light text-sub max-w-2xl">
            I'm a developer who believes technology should feel <br className="hidden md:block" />
            <TypewriterText texts={roles} />
          </div>
        </FadeIn>

        <FadeIn delay={0.8} direction="up">
          <p className="text-lg md:text-xl text-sub/80 max-w-xl mx-auto mb-12 leading-relaxed font-light">
            I design and build web applications with heart, focus, and a lot of care. Based in Lagos, building for the world.
          </p>
        </FadeIn>

        <FadeIn delay={1.0} direction="up" className="w-full">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-2xl" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Let's Talk <MessageSquare className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto border-none" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
              See My Work <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <a 
              href="/resume.pdf" 
              download 
              className="w-full sm:w-auto"
            >
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Download CV <FileDown className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={1.2} direction="up">
          <div className="flex items-center justify-center gap-8">
            <SocialLink href="https://github.com/Giftedtech1" icon={<Github size={24} />} label="GitHub" />
            <SocialLink href="https://www.linkedin.com/in/giftedtech-precious-a46421249" icon={<Linkedin size={24} />} label="LinkedIn" />
            <SocialLink href="mailto:Giftedisprecious@gmail.com" icon={<Mail size={24} />} label="Email" />
            <SocialLink href="https://wa.me/2349059464257" icon={<Phone size={24} />} label="WhatsApp" />
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-muted">Scroll down</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer" 
    className="text-muted hover:text-primary transition-all duration-300 hover:-translate-y-1"
  >
    {icon}
    <span className="sr-only">{label}</span>
  </a>
);

export default Hero;
