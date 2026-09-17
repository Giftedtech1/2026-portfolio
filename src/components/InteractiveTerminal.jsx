import React, { useState, useEffect, useRef } from 'react';
import { animate, stagger } from 'animejs';
import { Terminal, Play, Check, Copy } from 'lucide-react';

const commands = [
  {
    cmd: "giftedtech --architecture",
    title: "Architecture",
    output: [
      "[INFO] Resolving system architecture...",
      "├── Frontend: React 19, TypeScript, Next.js, Tailwind CSS v4",
      "├── State & Data: Supabase (PostgreSQL, Realtime, RLS), REST APIs",
      "├── Cloud & DevOps: Docker, Kubernetes, AWS, Microsoft Azure",
      "├── Animation: Anime.js v4 (Kinetic Physics, Stagger Waves, Timelines)",
      "├── Smooth Scroll: Lenis.dev (Lerp: 0.1, Native Physics)",
      "└── Optimization: Client Image Compression, Sub-second Initial Paint"
    ]
  },
  {
    cmd: "giftedtech --benchmarks",
    title: "Benchmarks",
    output: [
      "[AUDIT] Running production performance telemetry...",
      "✓ Google Lighthouse Performance: 98/100",
      "✓ First Contentful Paint: 0.65s (Sub-second target achieved)",
      "✓ Cumulative Layout Shift: 0.00 (Zero layout shifts)",
      "✓ Hand2Hand Bandwidth Optimization: >60% payload reduction",
      "✓ Mobile Accessibility Conformance: WCAG AA Compliant"
    ]
  },
  {
    cmd: "giftedtech --status",
    title: "Availability",
    output: [
      "[STATUS] Current Engineering Availability:",
      "├── Engineer: Ogunleye Precious (Giftedtech)",
      "├── Location: Lagos, Nigeria (UTC+1 / WAT)",
      "├── Open Roles: Frontend Engineer / Full-Stack Product Engineer",
      "├── Contract Type: Full-time / High-impact Contracts / Global Remote",
      "└── Direct Contact: Giftedisprecious@gmail.com"
    ]
  }
];

const InteractiveTerminal = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef(null);
  const currentCommand = commands[selectedIdx];

  // Animate lines when command switches
  useEffect(() => {
    const el = outputRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lines = el.querySelectorAll('.terminal-line');
    lines.forEach((l) => {
      l.style.opacity = '0';
      l.style.transform = 'translateY(8px)';
    });

    animate(lines, {
      opacity: [0, 1],
      translateY: [8, 0],
      delay: stagger(45),
      duration: 350,
      ease: 'outExpo'
    });
  }, [selectedIdx]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCommand.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-lg bg-[#021024] border border-[#5483B3]/30 overflow-hidden shadow-xl">
      
      {/* Terminal Titlebar */}
      <div className="px-4 py-3 bg-[#052659]/60 border-b border-[#052659] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5483B3]/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#5483B3]/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#5483B3]/40" />
          </div>
          <span className="text-[#7DA0CA] text-[11px] ml-2 flex items-center gap-1.5">
            <Terminal size={12} className="text-[#5483B3]" />
            giftedtech-cli ~ bash
          </span>
        </div>

        {/* Command Selector Tabs */}
        <div className="flex items-center gap-1">
          {commands.map((c, i) => (
            <button
              key={c.title}
              onClick={() => setSelectedIdx(i)}
              className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors ${
                selectedIdx === i
                  ? 'bg-[#052659] text-[#C1E8FF] border border-[#5483B3]/50'
                  : 'text-[#7DA0CA] hover:text-[#C1E8FF]'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 sm:p-6 font-mono text-xs space-y-3">
        
        {/* Command Line Input */}
        <div className="flex items-center justify-between pb-2 border-b border-[#052659]/60">
          <div className="flex items-center gap-2 text-[#C1E8FF] overflow-x-auto">
            <span className="text-[#5483B3]">$</span>
            <span className="text-[#C1E8FF] font-semibold">{currentCommand.cmd}</span>
            <span className="w-2 h-4 bg-[#7DA0CA] animate-pulse" />
          </div>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded text-[#7DA0CA] hover:text-[#C1E8FF] hover:bg-[#052659] transition-colors shrink-0"
            title="Copy command"
            aria-label="Copy terminal command"
          >
            {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          </button>
        </div>

        {/* Command Output — animated via Anime.js */}
        <div ref={outputRef} className="space-y-1.5 pt-1 text-[#7DA0CA] leading-relaxed">
          {currentCommand.output.map((line, idx) => (
            <div
              key={idx}
              className={`terminal-line ${
                line.startsWith('[')
                  ? 'text-[#5483B3] text-[11px] font-semibold'
                  : line.includes('✓')
                  ? 'text-[#C1E8FF]'
                  : 'text-[#7DA0CA]'
              }`}
            >
              {line}
            </div>
          ))}
        </div>

      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-2 bg-[#052659]/30 border-t border-[#052659]/60 flex items-center justify-between text-[10px] font-mono text-[#5483B3]">
        <span>Return code: 0 OK</span>
        <span className="text-[#7DA0CA]">Anime.js Stagger Sequence</span>
      </div>

    </div>
  );
};

export default InteractiveTerminal;
