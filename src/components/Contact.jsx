import React from 'react';
import SectionWrapper, { FadeIn } from './SectionWrapper';
import { Button } from './Button';
import { Mail, MessageSquare, MapPin, Send, Coffee, CheckCircle, AlertCircle } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  const [state, handleSubmit] = useForm("xanjvnyy");

  return (
    <SectionWrapper id="contact" className="bg-main py-24 md:py-32 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-[20%] translate-y-[20%]" />
      
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start max-w-7xl">
        
        {/* Left Side: Contact Info */}
        <div className="flex-1 space-y-12 lg:sticky lg:top-32 w-full">
          <FadeIn direction="up">
             <h2 className="text-4xl md:text-6xl font-black text-main mb-8 leading-tight">
                Let's start a <br />
                <span className="text-gradient italic">conversation.</span>
             </h2>
             <p className="text-sub/80 text-lg md:text-xl font-light leading-relaxed max-w-lg">
                Whether you have a project in mind or just want to say hi, I'm always open to connecting and sharing ideas.
             </p>
          </FadeIn>

          <FadeIn delay={0.2} direction="right" className="space-y-6">
            <ContactItem 
              icon={<Mail className="text-primary" size={24} />} 
              label="Send an email" 
              value="Giftedisprecious@gmail.com" 
              href="mailto:Giftedisprecious@gmail.com"
              color="bg-primary/10"
            />
            <ContactItem 
              icon={<MessageSquare className="text-accent" size={24} />} 
              label="Chat on WhatsApp" 
              value="+234 905 946 4257" 
              href="https://wa.me/2349059464257"
              color="bg-accent/10"
            />
            <ContactItem 
              icon={<MapPin className="text-[#f2cc8f]" size={24} />} 
              label="Current Location" 
              value="Lagos, Nigeria" 
              color="bg-[#f2cc8f]/20"
              subValue="Working with the world"
            />
          </FadeIn>

          <FadeIn delay={0.4} direction="up">
            <div className="inline-flex items-center gap-4 p-6 rounded-[2rem] bg-accent/5 border border-accent/10">
              <Coffee className="text-accent" size={24} />
              <p className="text-sm font-medium text-main/80 italic">
                Coffee's on me if you're ever in Lagos!
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Right Side: Contact Form */}
        <div className="flex-1 w-full lg:mt-4">
           <FadeIn direction="left" className="glass-card p-8 md:p-12 border-border-subtle relative overflow-hidden focus-within:shadow-organic bouncy">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary opacity-20" />
             
             <form onSubmit={handleSubmit} className="space-y-8">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <label htmlFor="full-name" className="text-sm font-black text-main uppercase tracking-widest ml-1">Your Name</label>
                   <input 
                     id="full-name"
                     type="text" 
                     name="name"
                     required
                     placeholder="How should I call you?" 
                     className="w-full px-6 py-4 rounded-2xl bg-accent/5 border border-accent/5 text-main focus:outline-none focus:border-primary focus:bg-white dark:focus:bg-white/5 focus:ring-4 focus:ring-primary/10 transition-all text-base font-light"
                   />
                   <ValidationError prefix="Name" field="name" errors={state.errors} />
                 </div>
                 <div className="space-y-3">
                   <label htmlFor="email" className="text-sm font-black text-main uppercase tracking-widest ml-1">Email Address</label>
                   <input 
                     id="email"
                     type="email" 
                     name="email"
                     required
                     placeholder="Where can I reach you?" 
                     className="w-full px-6 py-4 rounded-2xl bg-accent/5 border border-accent/5 text-main focus:outline-none focus:border-primary focus:bg-white dark:focus:bg-white/5 focus:ring-4 focus:ring-primary/10 transition-all text-base font-light"
                   />
                   <ValidationError prefix="Email" field="email" errors={state.errors} />
                 </div>
               </div>
               
               <div className="space-y-3">
                 <label htmlFor="message" className="text-sm font-black text-main uppercase tracking-widest ml-1">Your Message</label>
                 <textarea 
                   id="message"
                   name="message"
                   required
                   rows="5" 
                   placeholder="Tell me your story or what's on your mind..." 
                   className="w-full px-6 py-4 rounded-2xl bg-accent/5 border border-accent/5 text-main focus:outline-none focus:border-primary focus:bg-white dark:focus:bg-white/5 focus:ring-4 focus:ring-primary/10 transition-all resize-none text-base font-light"
                 ></textarea>
                 <ValidationError prefix="Message" field="message" errors={state.errors} />
               </div>

               <Button 
                type="submit" 
                size="lg" 
                disabled={state.submitting}
                className="w-full py-5 rounded-3xl shadow-2xl bouncy disabled:opacity-70 disabled:cursor-not-allowed"
              >
                 <span className="text-lg font-black tracking-tight">
                  {state.submitting ? "Sending..." : "Send Message"}
                 </span>
                 <Send size={20} className={`ml-3 ${state.submitting ? 'animate-pulse' : ''}`} />
               </Button>
               
               {/* Status Messages */}
               {state.succeeded && (
                 <FadeIn direction="up">
                   <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                     <CheckCircle size={20} />
                     <p className="text-sm font-bold">Message sent with heart! I'll get back to you soon.</p>
                   </div>
                 </FadeIn>
               )}

               {state.errors && !state.submitting && state.errors.length > 0 && (
                 <FadeIn direction="up">
                   <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500">
                     <AlertCircle size={20} />
                     <p className="text-sm font-bold">Oops! Something went wrong. Please try again or email me directly.</p>
                   </div>
                 </FadeIn>
               )}

               <p className="text-center text-xs font-medium text-muted/60 tracking-wider uppercase">
                 I usually respond within a few hours
               </p>
             </form>
           </FadeIn>
        </div>

      </div>
    </SectionWrapper>
  );
};

const ContactItem = ({ icon, label, value, href, color, subValue }) => {
  const Content = (
    <div className="flex-1 min-w-0">
      <h4 className="text-xs font-black text-accent uppercase tracking-[0.2em] mb-1 opacity-70">{label}</h4>
      <p className="text-lg md:text-xl font-bold text-main tracking-tight truncate">{value}</p>
      {subValue && <span className="text-muted text-xs mt-1 block font-medium italic opacity-60">{subValue}</span>}
    </div>
  );

  return (
    <div className="group flex items-center gap-6 p-6 rounded-[2rem] border border-transparent hover:border-accent/10 hover:bg-white dark:hover:bg-white/5 transition-all duration-500 shadow-sm hover:shadow-organic bouncy">
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg transition-all duration-500`}>
        {icon}
      </div>
      {href ? (
        <a href={href} className="flex-1 min-w-0" target={href.startsWith('http') ? "_blank" : undefined} rel={href.startsWith('http') ? "noreferrer" : undefined}>
          {Content}
        </a>
      ) : Content}
    </div>
  );
};

export default Contact;
