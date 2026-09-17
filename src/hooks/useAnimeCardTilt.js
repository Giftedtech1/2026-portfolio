import { useEffect, useRef } from 'react';
import { animate } from 'animejs';

/**
 * Hook to apply interactive 3D tilt and specular shine to an element using Anime.js
 * @param {Object} options
 * @param {number} options.maxTilt - Maximum tilt angle in degrees (default 8)
 * @param {number} options.scale - Scale factor on hover (default 1.02)
 * @param {number} options.perspective - CSS perspective in px (default 1000)
 */
export function useAnimeCardTilt({ maxTilt = 8, scale = 1.02, perspective = 1000 } = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Only enable tilt on devices that support hover / fine pointers
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalized coordinates (-1 to 1)
      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      // Update CSS variables for the specular glare reflection
      el.style.setProperty('--mouse-x', `${x}px`);
      el.style.setProperty('--mouse-y', `${y}px`);

      // Rotate opposite to movement direction for realistic 3D depth
      const rotateY = normX * maxTilt;
      const rotateX = -normY * maxTilt;

      animate(el, {
        rotateX,
        rotateY,
        scale,
        transformPerspective: perspective,
        duration: 200,
        ease: 'outQuad',
      });
    };

    const handleMouseLeave = () => {
      // Spring reset when cursor exits the card
      animate(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        transformPerspective: perspective,
        duration: 800,
        ease: 'outBack',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt, scale, perspective]);

  return elementRef;
}
