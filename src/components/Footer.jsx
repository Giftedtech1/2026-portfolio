import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { useMagneticHover } from '../hooks/useMagneticHover';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const backToTopRef = useMagneticHover({ strength: 0.25 });

  return (
    <footer className="bg-[#021024] border-t border-[#052659] py-10 sm:py-12 text-sm">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-[#052659]">
          <div>
            <div className="text-sm font-bold text-[#C1E8FF] mb-1">
              Ogunleye Precious, Giftedtech
            </div>
            <div className="text-[#7DA0CA] text-sm">
              Frontend & Product Engineer, Lagos, Nigeria
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[#7DA0CA]">
            <a href="#work" className="hover:text-[#C1E8FF] transition-colors min-h-[36px] flex items-center">Work</a>
            <a href="#services" className="hover:text-[#C1E8FF] transition-colors min-h-[36px] flex items-center">Services</a>
            <a href="#pricing" className="hover:text-[#C1E8FF] transition-colors min-h-[36px] flex items-center">Pricing</a>
            <a href="#about" className="hover:text-[#C1E8FF] transition-colors min-h-[36px] flex items-center">About</a>
            <a href="#contact" className="hover:text-[#C1E8FF] transition-colors min-h-[36px] flex items-center">Contact</a>
            <a href="https://github.com/Giftedtech1" target="_blank" rel="noreferrer" className="hover:text-[#C1E8FF] transition-colors min-h-[36px] flex items-center">GitHub</a>
            <a href="https://www.linkedin.com/in/giftedtech-precious-a46421249" target="_blank" rel="noreferrer" className="hover:text-[#C1E8FF] transition-colors min-h-[36px] flex items-center">LinkedIn</a>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[#5483B3]">
          <div className="text-sm">
            © {currentYear} Ogunleye Precious. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span>UTC+1 (WAT)</span>
            <a
              ref={backToTopRef}
              href="#"
              className="hover:text-[#C1E8FF] transition-colors min-h-[44px] flex items-center gap-1.5 px-2.5 -mr-2.5 rounded hover:bg-[#052659]/40"
              style={{ willChange: 'transform' }}
              aria-label="Scroll back to top"
            >
              <span>Back to top</span>
              <ArrowUp size={13} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
