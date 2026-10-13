import React, { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { Sparkles, RefreshCw, Layers } from 'lucide-react';

const AnimeGridMatrix = () => {
  const containerRef = useRef(null);
  const [cols, setCols] = useState(12);
  const rows = 4;
  const [activePreset, setActivePreset] = useState('center');

  // Adjust columns based on window width
  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 640) {
        setCols(6);
      } else if (window.innerWidth < 1024) {
        setCols(8);
      } else {
        setCols(12);
      }
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  const totalCells = cols * rows;

  // Trigger Anime.js ripple from a specific index or pattern
  const triggerRipple = (fromIndex = 'center') => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cells = containerRef.current?.querySelectorAll('.matrix-node');
    if (!cells || cells.length === 0) return;

    animate(cells, {
      scale: [
        { value: 0.65, duration: 250, ease: 'inOutQuad' },
        { value: 1.15, duration: 350, ease: 'outQuad' },
        { value: 1, duration: 400, ease: 'outElastic(1, 0.4)' }
      ],
      backgroundColor: [
        { value: '#052659', duration: 100 },
        { value: '#5483B3', duration: 300 },
        { value: '#052659', duration: 500 }
      ],
      delay: stagger(35, {
        grid: [cols, rows],
        from: fromIndex
      }),
      ease: 'outExpo'
    });
  };

  // Initial ripple on first entrance
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          triggerRipple('center');
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [cols]);

  return (
    <div className="rounded-sm bg-[#052659]/25 border border-[#5483B3]/25 p-5 sm:p-7 overflow-hidden">

      {/* Component Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#052659]">
        <div>
          <div className="flex items-center gap-2 text-sm text-[#5483B3] mb-1">
            <Sparkles size={14} className="text-[#7DA0CA]" />
            <span>Anime.js interactive canvas</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#C1E8FF] tracking-tight">
            Staggered Ripple Matrix
          </h3>
        </div>

        {/* Preset Controls */}
        <div className="flex items-center gap-1.5 text-sm">
          <button
            onClick={() => {
              setActivePreset('center');
              triggerRipple('center');
            }}
            className={`px-2.5 py-1 rounded border transition-colors ${
              activePreset === 'center'
                ? 'bg-[#052659] text-[#C1E8FF] border-[#5483B3]'
                : 'text-[#7DA0CA] border-[#052659] hover:border-[#5483B3]/40'
            }`}
          >
            Center
          </button>
          <button
            onClick={() => {
              setActivePreset('first');
              triggerRipple('first');
            }}
            className={`px-2.5 py-1 rounded border transition-colors ${
              activePreset === 'first'
                ? 'bg-[#052659] text-[#C1E8FF] border-[#5483B3]'
                : 'text-[#7DA0CA] border-[#052659] hover:border-[#5483B3]/40'
            }`}
          >
            Corner
          </button>
          <button
            onClick={() => {
              setActivePreset('random');
              triggerRipple(Math.floor(Math.random() * totalCells));
            }}
            className="px-2.5 py-1 rounded border border-[#052659] text-[#7DA0CA] hover:border-[#5483B3]/40 hover:text-[#C1E8FF] transition-colors flex items-center gap-1"
          >
            <RefreshCw size={11} />
            <span>Random</span>
          </button>
        </div>
      </div>

      <p className="text-sm text-[#7DA0CA] mb-5 leading-relaxed">
        Interactive 2D matrix demonstrating Anime.js grid-based stagger calculations. Click any tile to generate a ripple wave:
      </p>

      {/* The Interactive Node Grid */}
      <div
        ref={containerRef}
        className="grid gap-2 select-none"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`
        }}
      >
        {Array.from({ length: totalCells }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActivePreset(`node-${idx}`);
              triggerRipple(idx);
            }}
            className="matrix-node aspect-square rounded bg-[#052659] border border-[#5483B3]/30 hover:border-[#C1E8FF] transition-colors flex items-center justify-center cursor-pointer p-1 group"
            aria-label={`Matrix cell ${idx + 1}`}
            style={{ willChange: 'transform, background-color' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7DA0CA]/50 group-hover:bg-[#C1E8FF] transition-colors pointer-events-none" />
          </button>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-[#052659] flex items-center justify-between text-[11px] font-mono text-[#5483B3]">
        <span className="flex items-center gap-1.5">
          <Layers size={12} className="text-[#7DA0CA]" />
          <span>stagger(35, {'{ grid: ['}{cols}, {rows}{'], from: index }'})</span>
        </span>
        <span className="text-[#7DA0CA]">Interactive</span>
      </div>

    </div>
  );
};

export default AnimeGridMatrix;
