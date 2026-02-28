import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-main border-t border-border-subtle/50 pt-20 pb-12 overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
          
          <div className="text-center md:text-left">
            <a href="#" className="inline-block text-3xl font-black text-main mb-6 tracking-tighter">
              Gifted<span className="text-primary italic">tech</span>
            </a>
            <p className="text-sub/80 max-w-sm text-base md:text-lg font-light leading-relaxed">
              I believe in building digital spaces that feel less like code and more like home. Let's make the web a warmer place, one pixel at a time.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-8">
            <div className="flex gap-4">
              <SocialLink href="https://github.com/Giftedtech1" icon={<Github size={20} />} />
              <SocialLink href="https://www.linkedin.com/in/giftedtech-precious-a46421249" icon={<Linkedin size={20} />} />
              <SocialLink href="mailto:Giftedisprecious@gmail.com" icon={<Mail size={20} />} />
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-4 text-sm font-black text-accent uppercase tracking-widest">
              {['About', 'Projects', 'Services', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-primary transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-border-subtle/30 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-sub/60 text-sm font-medium">
            <span>© {currentYear} Ogunleye Precious.</span>
            <span className="flex items-center gap-1">
              Built with <Heart size={14} className="text-primary fill-primary" /> in Lagos.
            </span>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#" className="text-muted/60 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors">Privacy</a>
            <a href="#" className="text-muted/60 hover:text-primary text-xs font-bold uppercase tracking-widest transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer" 
    className="w-12 h-12 rounded-2xl bg-accent/5 flex items-center justify-center text-accent hover:bg-primary hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1"
  >
    {icon}
  </a>
);

export default Footer;
