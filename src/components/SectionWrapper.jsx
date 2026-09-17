import React from 'react';
import { motion, useInView } from 'framer-motion';

const SectionWrapper = ({ id, children, className = '' }) => {
  return (
    <section id={id} className={`py-24 relative overflow-hidden ${className}`}>


      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full h-full">
        {children}
      </div>
    </section>
  );
};

export const FadeIn = ({ children, delay = 0, direction = "up", className = "" }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration: 0.7, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default SectionWrapper;
