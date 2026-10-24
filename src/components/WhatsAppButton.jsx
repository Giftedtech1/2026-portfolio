import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappLink } from '../lib/contact';

/** Floating WhatsApp button, bottom-right on every screen. */
const WhatsAppButton = () => (
  <a
    href={whatsappLink()}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat with me on WhatsApp"
    className="fixed z-50 bottom-5 right-4 md:bottom-6 md:right-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 hover:bg-[#1EBE5A] transition-colors h-14 w-14 md:w-auto md:px-5 justify-center"
  >
    <FaWhatsapp size={28} aria-hidden="true" />
    <span className="hidden md:inline text-sm font-semibold">Chat on WhatsApp</span>
  </a>
);

export default WhatsAppButton;
