import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/**
 * A drop-in wrapper that stagger-reveals its children on scroll.
 * Children that should animate must have the class `reveal-item`.
 * All other props are forwarded to the container div.
 *
 * @example
 * <ScrollReveal direction="up" delayStep={90}>
 *   <div className="reveal-item">Card A</div>
 *   <div className="reveal-item">Card B</div>
 * </ScrollReveal>
 */
const ScrollReveal = ({
  children,
  itemSelector = '.reveal-item',
  direction = 'up',
  distance = 36,
  delayStep = 90,
  duration = 850,
  ease = 'outExpo',
  threshold = 0.1,
  once = true,
  className = '',
  as: Tag = 'div',
  ...rest
}) => {
  const ref = useScrollReveal({
    itemSelector,
    direction,
    distance,
    delayStep,
    duration,
    ease,
    threshold,
    once,
  });

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
};

export default ScrollReveal;
