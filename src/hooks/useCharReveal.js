import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

/**
 * Animates a plain text heading by splitting it into individual character spans,
 * then stagger-fading them in when the element enters the viewport.
 *
 * Usage:
 *   const ref = useCharReveal();
 *   <h1 ref={ref}>My Heading</h1>
 *
 * @param {Object} opts
 * @param {number} opts.delayStep   ms between each character (default 28)
 * @param {number} opts.duration    fade+slide duration per char (default 700)
 * @param {number} opts.distance    initial translateY offset in px (default 24)
 * @param {string} opts.ease        Anime.js ease (default 'outExpo')
 * @param {number} opts.threshold   IO threshold (default 0.4)
 */
export function useCharReveal({
  delayStep = 28,
  duration = 700,
  distance = 24,
  ease = 'outExpo',
  threshold = 0.4,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const originalText = el.innerText;

    // Wrap each character in a span for individual animation
    el.innerHTML = originalText
      .split('')
      .map((char) =>
        char === ' '
          ? `<span aria-hidden="true" style="display:inline-block;">&nbsp;</span>`
          : `<span aria-hidden="true" style="display:inline-block;opacity:0;transform:translateY(${distance}px)">${char}</span>`
      )
      .join('');

    const spans = el.querySelectorAll('span');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(spans, {
              opacity: [0, 1],
              translateY: [distance, 0],
              delay: (el, i) => i * delayStep,
              duration,
              ease,
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delayStep, duration, distance, ease, threshold]);

  return ref;
}
