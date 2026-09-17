import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

/**
 * Hook to trigger staggered Anime.js entrance animations when a container enters the viewport.
 * @param {Object} options
 * @param {string} options.itemSelector - Selector for child elements to stagger (default: '.anime-item')
 * @param {number} options.delayStep - Stagger delay in ms between items (default: 100)
 * @param {number} options.duration - Duration in ms (default: 800)
 * @param {number} options.distance - Translate distance in px (default: 30)
 * @param {string} options.direction - 'up' | 'down' | 'left' | 'right' (default: 'up')
 * @param {string} options.ease - Anime.js easing name (default: 'outCubic')
 * @param {boolean} options.once - Trigger only once (default: true)
 */
export function useAnimeStagger({
  itemSelector = '.anime-item',
  delayStep = 100,
  duration = 800,
  distance = 30,
  direction = 'up',
  ease = 'outCubic',
  once = true,
} = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(itemSelector);
    if (!items || items.length === 0) return;

    // Set initial hidden state
    items.forEach((item) => {
      item.style.opacity = '0';
      if (direction === 'up') item.style.transform = `translateY(${distance}px)`;
      if (direction === 'down') item.style.transform = `translateY(-${distance}px)`;
      if (direction === 'left') item.style.transform = `translateX(${distance}px)`;
      if (direction === 'right') item.style.transform = `translateX(-${distance}px)`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(items, {
              opacity: [0, 1],
              translateX: 0,
              translateY: 0,
              delay: stagger(delayStep),
              duration,
              ease,
            });

            if (once) {
              observer.unobserve(container);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [itemSelector, delayStep, duration, distance, direction, ease, once]);

  return containerRef;
}
