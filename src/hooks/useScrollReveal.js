import { useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';

/**
 * Universal scroll-reveal hook using Anime.js + IntersectionObserver.
 * Targets elements with the class specified by `itemSelector` inside the
 * container returned by the hook's ref.
 *
 * @param {Object} opts
 * @param {string}  opts.itemSelector  CSS selector for child elements to animate (default '.reveal-item')
 * @param {number}  opts.delayStep     Stagger delay in ms (default 80)
 * @param {number}  opts.duration      Animation duration in ms (default 900)
 * @param {number}  opts.distance      Translate distance in px (default 40)
 * @param {string}  opts.direction     'up' | 'down' | 'left' | 'right' (default 'up')
 * @param {string}  opts.ease          Anime.js easing string (default 'outExpo')
 * @param {number}  opts.threshold     IO threshold (default 0.12)
 * @param {boolean} opts.once          Trigger once only (default true)
 */
export function useScrollReveal({
  itemSelector = '.reveal-item',
  delayStep = 80,
  duration = 900,
  distance = 40,
  direction = 'up',
  ease = 'outExpo',
  threshold = 0.12,
  once = true,
} = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = Array.from(container.querySelectorAll(itemSelector));
    if (items.length === 0) return;

    // Determine initial offset axis
    const axis = direction === 'up' || direction === 'down' ? 'Y' : 'X';
    const sign = direction === 'up' || direction === 'left' ? 1 : -1;
    const initialTranslate = sign * distance;

    // Set initial state
    items.forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = `translate${axis}(${initialTranslate}px)`;
      item.style.willChange = 'opacity, transform';
    });

    let triggered = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!triggered || !once)) {
            triggered = true;

            animate(items, {
              opacity: [0, 1],
              [`translate${axis}`]: [initialTranslate, 0],
              delay: stagger(delayStep),
              duration,
              ease,
              complete: () => {
                // Clean up will-change for memory
                items.forEach((item) => {
                  item.style.willChange = 'auto';
                });
              },
            });

            if (once) observer.unobserve(container);
          }
        });
      },
      { threshold }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [itemSelector, delayStep, duration, distance, direction, ease, threshold, once]);

  return containerRef;
}
