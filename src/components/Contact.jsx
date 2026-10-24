import React from 'react';
import { MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';
import { useAnimeCardTilt } from '../hooks/useAnimeCardTilt';
import { useMagneticHover } from '../hooks/useMagneticHover';
import ScrollReveal from './ScrollReveal';
import { EMAIL, WHATSAPP_DISPLAY, whatsappLink } from '../lib/contact';

const Contact = () => {
  const [state, handleSubmit] = useForm("xanjvnyy");
  const formPanelRef = useAnimeCardTilt({ maxTilt: 3, scale: 1.005, perspective: 1800 });
  const submitRef = useMagneticHover({ strength: 0.15 });

  return (
    <section id="contact" className="py-20 sm:py-24 md:py-32 bg-[#021024]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">

        {/* Section Header */}
        <ScrollReveal direction="up" distance={24} delayStep={80} duration={700} ease="outExpo" threshold={0.3}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#052659]">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#C1E8FF] tracking-tight reveal-item">
                Ready for a website that works? <br className="hidden sm:block" />
                <span className="text-[#7DA0CA]">Let's talk.</span>
              </h2>
            </div>
            <p className="text-sm text-[#7DA0CA] mt-3 md:mt-0 max-w-md reveal-item">
              Tell me about your business and what you need. I reply within 24 hours, and fastest on WhatsApp.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          {/* Left Column: Direct Channels */}
          <ScrollReveal direction="up" distance={32} delayStep={100} duration={750} ease="outExpo" threshold={0.1} className="lg:col-span-5">
            <div className="space-y-4 sm:space-y-6 reveal-item">
              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    label: "WhatsApp (fastest)",
                    value: WHATSAPP_DISPLAY,
                    href: whatsappLink(),
                    external: true,
                  },
                  {
                    label: "Email",
                    value: EMAIL,
                    href: `mailto:${EMAIL}`,
                  },
                  {
                    label: "LinkedIn",
                    value: "linkedin.com/in/giftedtech-precious",
                    href: "https://www.linkedin.com/in/giftedtech-precious-a46421249",
                    external: true,
                  },
                ].map((channel) => (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noreferrer" : undefined}
                    className="block p-4 sm:p-5 rounded-sm bg-[#052659]/30 border border-[#5483B3]/25 hover:border-[#7DA0CA]/50 transition-colors group"
                  >
                    <div className="text-sm text-[#5483B3] mb-1">{channel.label}</div>
                    <div className="text-sm sm:text-base font-medium text-[#C1E8FF] group-hover:text-white truncate">
                      {channel.value}
                    </div>
                  </a>
                ))}
              </div>

              <div className="p-3.5 sm:p-4 rounded-sm border border-[#052659] bg-[#052659]/20 flex items-center justify-between text-sm text-[#7DA0CA]">
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-[#5483B3]" />
                  Based in Lagos (GMT+1)
                </span>
                <span>Clients across Nigeria &amp; remote</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div
              ref={formPanelRef}
              className="rounded-sm bg-[#052659]/25 border border-[#5483B3]/25 p-5 sm:p-6 md:p-8"
              style={{ willChange: 'transform' }}
            >
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label htmlFor="name" className="block text-sm text-[#7DA0CA]">
                      Your name or business
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Ada, Ada's Kitchen"
                      className="w-full min-h-[44px] px-4 py-2.5 sm:py-3 rounded-sm bg-[#021024] border border-[#5483B3]/30 text-[#C1E8FF] placeholder-[#5483B3] text-base sm:text-sm focus:outline-none focus:border-[#7DA0CA] transition-colors"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} />
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label htmlFor="email" className="block text-sm text-[#7DA0CA]">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="you@yourbusiness.com"
                      className="w-full min-h-[44px] px-4 py-2.5 sm:py-3 rounded-sm bg-[#021024] border border-[#5483B3]/30 text-[#C1E8FF] placeholder-[#5483B3] text-base sm:text-sm focus:outline-none focus:border-[#7DA0CA] transition-colors"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2">
                  <label htmlFor="message" className="block text-sm text-[#7DA0CA]">
                    What does your business do, and what do you need?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="e.g. I run a bakery in Lekki and want a website where customers can see our menu and order on WhatsApp."
                    className="w-full min-h-[100px] px-4 py-2.5 sm:py-3 rounded-sm bg-[#021024] border border-[#5483B3]/30 text-[#C1E8FF] placeholder-[#5483B3] text-base sm:text-sm focus:outline-none focus:border-[#7DA0CA] transition-colors resize-none"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                <button
                  ref={submitRef}
                  type="submit"
                  disabled={state.submitting}
                  id="contact-submit-btn"
                  className="w-full min-h-[48px] py-3.5 px-6 rounded-sm text-sm font-medium text-[#021024] bg-[#C1E8FF] hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ willChange: 'transform' }}
                >
                  {state.submitting ? "Sending…" : "Send message"}
                </button>

                {state.succeeded && (
                  <div className="p-4 rounded-sm bg-[#052659] border border-[#5483B3]/40 flex items-center gap-2.5 text-sm text-[#C1E8FF]">
                    <CheckCircle2 size={16} className="text-[#7DA0CA]" />
                    <span>Message received. I will reply within 24 hours.</span>
                  </div>
                )}

                {state.errors && !state.submitting && state.errors.length > 0 && (
                  <div className="p-4 rounded-sm bg-red-950/40 border border-red-800/40 flex items-center gap-2.5 text-sm text-red-300">
                    <AlertCircle size={16} />
                    <span>An error occurred while submitting. Please email Giftedisprecious@gmail.com directly.</span>
                  </div>
                )}

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
