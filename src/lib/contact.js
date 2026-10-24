// Single source of truth for how clients reach me.
export const WHATSAPP_NUMBER = '2349059464257';
export const WHATSAPP_DISPLAY = '+234 905 946 4257';
export const EMAIL = 'Giftedisprecious@gmail.com';

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Precious, I'd like a website for my business.";

/** Build a wa.me link with a pre-filled message. */
export const whatsappLink = (message = DEFAULT_WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
