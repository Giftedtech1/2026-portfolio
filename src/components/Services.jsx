import React from 'react';
import { Globe, LayoutDashboard, ShoppingBag, Gauge } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const services = [
  {
    title: 'Business websites',
    description:
      'A professional site that tells customers who you are, what you offer and how to reach you, built to load fast on mobile data and show up on Google.',
    icon: Globe,
  },
  {
    title: 'Web applications',
    description:
      'Booking systems, customer portals, dashboards and internal tools that save your team time, from first idea to launch.',
    icon: LayoutDashboard,
  },
  {
    title: 'E-commerce & marketplaces',
    description:
      'Sell online with a store your customers can browse on their phones, with orders sent to WhatsApp or paid by card or bank transfer.',
    icon: ShoppingBag,
  },
  {
    title: 'Fix a slow or invisible website',
    description:
      "Already have a site that's slow, broken on phones or hard to find on Google? I'll find what's wrong and fix it.",
    icon: Gauge,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 sm:py-24 md:py-32 bg-[#021024] border-b border-[#052659]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">

        {/* Section Header */}
        <ScrollReveal direction="up" distance={24} delayStep={80} duration={700} ease="outExpo" threshold={0.3}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#052659]">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#C1E8FF] tracking-tight reveal-item">
                What I can build for you
              </h2>
            </div>
            <p className="text-sm text-[#7DA0CA] mt-3 md:mt-0 max-w-md reveal-item">
              I&apos;m a web developer based in Lagos, Nigeria, working with businesses in Lagos, across Nigeria, and remotely worldwide.
            </p>
          </div>
        </ScrollReveal>

        {/* Service Cards */}
        <ScrollReveal direction="up" distance={32} delayStep={90} duration={800} ease="outExpo" threshold={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {services.map(({ title, description, icon: Icon }) => (
              <div
                key={title}
                className="reveal-item rounded-sm bg-[#052659]/25 border border-[#5483B3]/25 p-5 sm:p-6 md:p-7 hover:border-[#7DA0CA]/40 transition-colors"
              >
                <div className="inline-flex p-2.5 rounded-sm bg-[#38BDF8]/10 border border-[#38BDF8]/25 text-[#38BDF8] mb-4">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#C1E8FF] tracking-tight mb-2">
                  {title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#94A3B8]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-10 sm:mt-12">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-sm text-sm font-semibold transition-colors bg-[#38BDF8] text-[#021024] hover:bg-[#7DD3FC]"
          >
            See packages &amp; prices
          </a>
        </div>

      </div>
    </section>
  );
};

export default Services;
