import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

import headerCta from '../assets/header_cta.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
  ];

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <header className="fixed top-0 w-full z-50 flex flex-col items-center transition-all duration-500">
      <nav className={`
        flex items-center justify-between transition-all duration-500 px-6 md:px-8 mt-6 md:mt-8
        ${scrolled 
          ? 'w-[90%] md:w-[80%] lg:w-[70%] py-3 rounded-full glass border border-white/10 shadow-2xl backdrop-blur-md' 
          : 'w-full py-2 bg-transparent mt-0 md:mt-0'
        }
      `}>
        <a href="#" className="flex items-center gap-2 group">
          <img 
            src={headerCta} 
            alt="Giftedtech Logo" 
            className="h-10 md:h-12 w-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-sub hover:text-primary transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full opacity-50" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2.5 rounded-full hover:bg-primary/5 transition-all text-sub hover:text-primary tap-highlight-transparent"
              aria-label="Toggle Theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.5, type: "spring" }}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </button>
            
            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full bg-primary text-[#fdfaf5] text-sm font-semibold shadow-lg shadow-primary/20 transition-all bouncy"
            >
              Let's Talk
            </motion.a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2">
           <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full text-sub hover:text-primary transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 transition-all duration-300 rounded-full ${isOpen ? 'bg-primary text-white' : 'text-sub'}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
           <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-x-4 top-24 bg-surface rounded-[2.5rem] shadow-2xl md:hidden overflow-hidden z-40 border border-border-subtle"
          >
            <div className="p-8 flex flex-col items-center gap-6">
              {navLinks.map((link, index) => (
                <motion.a 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={link.name} 
                  href={link.href}
                  className="text-xl font-medium text-sub hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                href="#contact" 
                onClick={() => setIsOpen(false)}
                className="mt-4 w-full py-4 rounded-3xl bg-primary text-[#fdfaf5] font-bold text-center shadow-xl shadow-primary/20"
              >
                Say Hello
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
