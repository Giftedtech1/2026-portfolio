import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

/**
 * Magnetic button hook — card/button follows the cursor on hover.
 * @param {Object} opts
 * @param {number} opts.strength  Magnetic pull strength 0–1 (default 0.3)
 * @param {number} opts.duration  Spring-back duration ms (default 600)
 */
export function useMagneticHover({ strength = 0.3, duration = 600 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;

      animate(el, {
        translateX: dx,
        translateY: dy,
        duration: 300,
        ease: 'outQuart',
      });
    };

    const handleMouseLeave = () => {
      animate(el, {
        translateX: 0,
        translateY: 0,
        duration,
        ease: 'outElastic(1, 0.5)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, duration]);

  return ref;
}
