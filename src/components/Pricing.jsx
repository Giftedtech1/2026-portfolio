import React from 'react';
import { Check, MessageCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { whatsappLink } from '../lib/contact';

// Starting prices. Edit these in one place; everything below updates.
const packages = [
  {
    name: 'Starter',
    bestFor: 'New businesses, events and single products',
    price: '₦200,000',
    delivery: 'Ready in about 1 week',
    features: [
      'One-page website',
      'Designed for phones first',
      'WhatsApp chat button and contact form',
      'Google Maps location and business hours',
      'Domain, hosting and email set up for you',
      'Basic Google search setup',
    ],
  },
  {
    name: 'Business',
    bestFor: 'Established businesses that want to look professional and get found',
    price: '₦450,000',
    delivery: 'Ready in 2–3 weeks',
    popular: true,
    features: [
      'Everything in Starter',
      'Up to 6 pages (Home, About, Services, Gallery, Contact…)',
      'Custom design that matches your brand',
      'Google Business Profile linked and optimised',
      'Enquiry and booking forms sent to your email or WhatsApp',
      'Simple training so you can update text and photos',
      '1 month of free support after launch',
    ],
  },
  {
    name: 'Online Store',
    bestFor: 'Shops that want to sell online',
    price: '₦850,000',
    delivery: 'Ready in 3–5 weeks',
    features: [
      'Everything in Business',
      'Product catalogue you manage yourself',
      'Orders straight to WhatsApp',
      'Card and bank transfer payments (Paystack / Flutterwave)',
      'Delivery and pickup options',
      'Sales and order notifications',
    ],
  },
];

const steps = [
  { title: 'Chat', text: 'Tell me about your business on WhatsApp or by email. Free, no obligation.' },
  { title: 'Quote', text: 'You get a fixed price and timeline. Pay 50% to start, 50% at launch.' },
  { title: 'Build', text: 'I design and build, sharing progress so you can give feedback.' },
  { title: 'Launch', text: 'Your site goes live, and I show you how to manage it.' },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 sm:py-24 md:py-32 bg-[#021024] border-b border-[#052659]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">

        {/* Section Header */}
        <ScrollReveal direction="up" distance={24} delayStep={80} duration={700} ease="outExpo" threshold={0.3}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#052659]">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#C1E8FF] tracking-tight reveal-item">
                Packages &amp; prices
              </h2>
            </div>
            <p className="text-sm text-[#7DA0CA] mt-3 md:mt-0 max-w-md reveal-item">
              Clear starting prices, no surprises. Every project gets a fixed quote before any work begins.
            </p>
          </div>
        </ScrollReveal>

        {/* Package Cards */}
        <ScrollReveal direction="up" distance={32} delayStep={90} duration={800} ease="outExpo" threshold={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`reveal-item relative flex flex-col rounded-sm p-5 sm:p-6 md:p-7 border transition-colors ${
                  pkg.popular
                    ? 'bg-[#052659]/55 border-[#38BDF8]/60'
                    : 'bg-[#052659]/25 border-[#5483B3]/25 hover:border-[#7DA0CA]/40'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-5 sm:left-6 px-2.5 py-0.5 rounded-sm text-xs font-semibold bg-[#38BDF8] text-[#021024]">
                    Most popular
                  </span>
                )}

                <h3 className="text-xl sm:text-2xl font-bold text-[#C1E8FF] tracking-tight">
                  {pkg.name}
                </h3>
                <p className="mt-1.5 text-sm text-[#7DA0CA] leading-snug min-h-[2.5rem]">
                  {pkg.bestFor}
                </p>

                <div className="mt-5 pb-5 border-b border-[#5483B3]/20">
                  <span className="block text-xs uppercase tracking-wider text-[#5483B3]">From</span>
                  <span className="block text-3xl sm:text-4xl font-extrabold text-[#C1E8FF] tracking-tight">
                    {pkg.price}
                  </span>
                  <span className="block mt-1 text-sm text-[#94A3B8]">{pkg.delivery}</span>
                </div>

                <ul className="mt-5 space-y-2.5 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm sm:text-[0.95rem] text-[#C1E8FF]/85 leading-snug">
                      <Check size={16} className="mt-0.5 shrink-0 text-[#3ECF8E]" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsappLink(`Hi Precious, I'm interested in the ${pkg.name} package for my business.`)}
                  target="_blank"
                  rel="noreferrer"
                  className={`mt-7 inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-sm text-sm font-semibold transition-colors ${
                    pkg.popular
                      ? 'bg-[#38BDF8] text-[#021024] hover:bg-[#7DD3FC]'
                      : 'bg-[#021024] text-[#C1E8FF] border border-[#5483B3]/40 hover:border-[#C1E8FF]/60'
                  }`}
                >
                  <MessageCircle size={16} aria-hidden="true" />
                  Get started
                </a>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Extras */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="rounded-sm bg-[#052659]/25 border border-[#5483B3]/25 p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-[#C1E8FF]">Monthly care plan</h3>
            <p className="mt-1.5 text-sm text-[#94A3B8] leading-relaxed">
              Hosting, security updates, backups and small edits each month, so you never have to think about it.{' '}
              <span className="text-[#C1E8FF] font-semibold">From ₦25,000/month.</span>
            </p>
          </div>
          <div className="rounded-sm bg-[#052659]/25 border border-[#5483B3]/25 p-5 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-[#C1E8FF]">Need something custom?</h3>
            <p className="mt-1.5 text-sm text-[#94A3B8] leading-relaxed">
              Booking systems, customer portals, marketplaces and dashboards are priced per project.{' '}
              <a
                href={whatsappLink("Hi Precious, I'd like a quote for a custom web app.")}
                target="_blank"
                rel="noreferrer"
                className="text-[#38BDF8] font-semibold hover:text-[#7DD3FC] underline underline-offset-2"
              >
                Ask for a quote
              </a>
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-14 sm:mt-16">
          <h3 className="text-lg sm:text-xl font-bold text-[#C1E8FF] mb-5">How it works</h3>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {steps.map((step, i) => (
              <li key={step.title} className="rounded-sm border border-[#052659] bg-[#052659]/15 p-5">
                <span className="text-sm font-semibold text-[#38BDF8]">0{i + 1}</span>
                <h4 className="mt-1 text-base font-bold text-[#C1E8FF]">{step.title}</h4>
                <p className="mt-1 text-sm text-[#94A3B8] leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
};

export default Pricing;
