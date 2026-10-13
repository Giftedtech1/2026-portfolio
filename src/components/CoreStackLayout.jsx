import React, { useEffect, useRef, useState } from 'react';
import { createLayout, stagger } from 'animejs';
import { LayoutGrid, List, Layers } from 'lucide-react';

// Core stack items with icons (SVG paths inline to avoid extra deps)
const STACK = [
  {
    id: 'react',
    name: 'React',
    role: 'UI Layer',
    color: '#61DAFB',
    bg: 'rgba(97,218,251,0.08)',
    border: 'rgba(97,218,251,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="12" cy="12" r="2.5" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)" />
      </svg>
    ),
    desc: 'Hooks, Context, Suspense & concurrent rendering patterns.',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    role: 'Type Safety',
    color: '#3178C6',
    bg: 'rgba(49,120,198,0.08)',
    border: 'rgba(49,120,198,0.3)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178C6" />
        <path d="M13.5 13.5H16.5M13.5 16.5H16.5M14.5 10H16M7 10v8M7 10H10.5C11.33 10 12 10.67 12 11.5S11.33 13 10.5 13H7" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    desc: 'Generics, strict interfaces, utility types & declaration merging.',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    role: 'Framework',
    color: '#FFFFFF',
    bg: 'rgba(255,255,255,0.05)',
    border: 'rgba(255,255,255,0.18)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle cx="12" cy="12" r="10" fill="#000" stroke="white" strokeWidth="0.5" />
        <path d="M8 16.5V7.5l8 9V7.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    desc: 'App Router, Server Components, ISR, Edge Functions & middleware.',
  },
  {
    id: 'tailwind',
    name: 'Tailwind',
    role: 'Styling',
    color: '#38BDF8',
    bg: 'rgba(56,189,248,0.08)',
    border: 'rgba(56,189,248,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6C8.4 8.4 9.45 7.95 10.65 8.25C11.34 8.42 11.84 8.93 12.39 9.49C13.29 10.41 14.34 11.5 16.5 11.5C18.9 11.5 20.4 10.3 21 7.9C20.1 9.1 19.05 9.55 17.85 9.25C17.16 9.08 16.66 8.57 16.11 8.01C15.21 7.09 14.16 6 12 6ZM7.5 11.5C5.1 11.5 3.6 12.7 3 15.1C3.9 13.9 4.95 13.45 6.15 13.75C6.84 13.92 7.34 14.43 7.89 14.99C8.79 15.91 9.84 17 12 17C14.4 17 15.9 15.8 16.5 13.4C15.6 14.6 14.55 15.05 13.35 14.75C12.66 14.58 12.16 14.07 11.61 13.51C10.71 12.59 9.66 11.5 7.5 11.5Z" fill="#38BDF8" />
      </svg>
    ),
    desc: 'Design systems, theme tokens, JIT compiler & responsive variants.',
  },
  {
    id: 'supabase',
    name: 'Supabase',
    role: 'Backend',
    color: '#3ECF8E',
    bg: 'rgba(62,207,142,0.08)',
    border: 'rgba(62,207,142,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path d="M13.5 3L4 14h9l-2.5 7L20 10h-8.5L13.5 3Z" fill="#3ECF8E" />
      </svg>
    ),
    desc: 'Postgres, Realtime subs, Row-Level Security & Edge Functions.',
  },
  {
    id: 'docker',
    name: 'Docker',
    role: 'Containers',
    color: '#2496ED',
    bg: 'rgba(36,150,237,0.08)',
    border: 'rgba(36,150,237,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <rect x="3" y="10" width="2.4" height="2" rx="0.3" fill="#2496ED" />
        <rect x="6" y="10" width="2.4" height="2" rx="0.3" fill="#2496ED" />
        <rect x="9" y="10" width="2.4" height="2" rx="0.3" fill="#2496ED" />
        <rect x="6" y="7.5" width="2.4" height="2" rx="0.3" fill="#2496ED" />
        <rect x="9" y="7.5" width="2.4" height="2" rx="0.3" fill="#2496ED" />
        <rect x="12" y="7.5" width="2.4" height="2" rx="0.3" fill="#2496ED" />
        <rect x="9" y="5" width="2.4" height="2" rx="0.3" fill="#2496ED" />
        <path
          d="M21.5 11.5c-.3-.2-1.2-.4-2-.1-.2-.8-.7-1.5-1.5-1.8l-.5.3c.3.5.3 1.1.1 1.7-.6.2-1.5.3-2.1.2H1.5c-.2 1.2.1 2.8 1.1 4.2C4.1 18.2 7 19 10.5 19c5.2 0 9.2-2.5 10.8-6.5.3 0 .7-.3.9-.6.2-.2.3-.4.3-.4z"
          fill="#2496ED"
        />
        <circle cx="5.5" cy="14" r="0.6" fill="#021024" />
      </svg>
    ),
    desc: 'Multi-stage Dockerfiles, compose environments & image isolation.',
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    role: 'Orchestration',
    color: '#326CE5',
    bg: 'rgba(50,108,229,0.08)',
    border: 'rgba(50,108,229,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M12 2.5l7.5 4.3v8.6L12 21.5 4.5 17.1V6.8L12 2.5z"
          stroke="#326CE5"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="3.2" stroke="#326CE5" strokeWidth="1.4" fill="none" />
        <circle cx="12" cy="12" r="1.3" fill="#326CE5" />
        <path
          d="M12 4.5v4.3M12 15.2v4.3M5.5 8.2l3.7 2.1M14.8 13.7l3.7 2.1M5.5 15.8l3.7-2.1M14.8 10.3l3.7-2.1"
          stroke="#326CE5"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    desc: 'Deployments, services, pod lifecycle & resilient cluster scaling.',
  },
  {
    id: 'aws',
    name: 'AWS',
    role: 'Cloud Infra',
    color: '#FF9900',
    bg: 'rgba(255,153,0,0.08)',
    border: 'rgba(255,153,0,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <text x="12" y="12" textAnchor="middle" fill="#FF9900" fontSize="7" fontFamily="'JetBrains Mono', monospace" fontWeight="900" letterSpacing="0.5">AWS</text>
        <path
          d="M4 16.5c4.5 2.8 11.5 2.8 16 0"
          stroke="#FF9900"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M18.5 15.5l2 1.3-1.4 1.8"
          stroke="#FF9900"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    desc: 'S3, EC2, Lambda serverless, CloudFront CDN, IAM & cloud networking.',
  },
  {
    id: 'azure',
    name: 'Azure',
    role: 'Cloud Platform',
    color: '#0078D4',
    bg: 'rgba(0,120,212,0.08)',
    border: 'rgba(0,120,212,0.25)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <path
          d="M13.05 3.5l-5.3 9.4 4.15 4.35 6.6-13.75h-5.45z"
          fill="#0078D4"
        />
        <path
          d="M7.75 12.9L2.5 18.25h9.35l2.25-4.25-6.35-1.1z"
          fill="#50E6FF"
        />
        <path
          d="M14.1 14l-2.25 4.25h9.65L18.5 7.75 14.1 14z"
          fill="#005BA1"
        />
      </svg>
    ),
    desc: 'App Services, Azure DevOps CI/CD, Blob storage & hybrid cloud.',
  },
];

const MODES = ['grid2', 'grid3', 'list'];

const MODE_LABELS = {
  grid2: { label: '2-Col', icon: <LayoutGrid size={13} /> },
  grid3: { label: '3-Col', icon: <LayoutGrid size={13} /> },
  list: { label: 'List', icon: <List size={13} /> },
};

const MODE_CLASSES = {
  grid2: 'mode-grid2',
  grid3: 'mode-grid3',
  list: 'mode-list',
};

const CoreStackLayout = () => {
  const containerRef = useRef(null);
  const layoutRef = useRef(null);
  const [activeMode, setActiveMode] = useState('grid2');
  const [timerKey, setTimerKey] = useState(0);

  const switchMode = (mode) => {
    setActiveMode(mode);
    const el = containerRef.current;
    const layout = layoutRef.current;
    if (el && layout) {
      try {
        layout.update(({ root }) => {
          Object.values(MODE_CLASSES).forEach((cls) => root.classList.remove(cls));
          root.classList.add(MODE_CLASSES[mode]);
        }, {
          duration: 700,
          ease: 'outExpo',
          delay: stagger(60),
        });
      } catch (_) {
        // Safe fallback
      }
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    try {
      layoutRef.current = createLayout(el, {
        duration: 700,
        ease: 'outExpo',
        delay: stagger(60),
      });
    } catch (_) {
      // Safe fallback
    }
    return () => {
      layoutRef.current?.revert?.();
    };
  }, []);

  // Auto-switch between 2-Col, 3-Col, and List every 8 seconds
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const interval = setInterval(() => {
      setActiveMode((prev) => {
        const currentIndex = MODES.indexOf(prev);
        const nextIndex = (currentIndex + 1) % MODES.length;
        const nextMode = MODES[nextIndex];

        // Trigger FLIP layout transition
        const el = containerRef.current;
        const layout = layoutRef.current;
        if (el && layout) {
          try {
            layout.update(({ root }) => {
              Object.values(MODE_CLASSES).forEach((cls) => root.classList.remove(cls));
              root.classList.add(MODE_CLASSES[nextMode]);
            }, {
              duration: 700,
              ease: 'outExpo',
              delay: stagger(60),
            });
          } catch (_) {
            // Safe fallback
          }
        }
        return nextMode;
      });
      setTimerKey((k) => k + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, [timerKey]);

  const handleModeClick = (mode) => {
    switchMode(mode);
    setTimerKey((k) => k + 1);
  };

  return (
    <div className="rounded-sm bg-[#052659]/25 border border-[#5483B3]/25 p-5 sm:p-7 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-[#052659]">
        <div className="flex items-center gap-2.5">
          <Layers size={16} className="text-[#7DA0CA]" />
          <h3 className="text-base sm:text-lg font-bold text-[#C1E8FF] tracking-tight">
            Core Stack
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-sm">
          {MODES.map((mode) => (
            <button
              key={mode}
              id={`core-stack-mode-${mode}`}
              onClick={() => handleModeClick(mode)}
              className={`relative overflow-hidden px-2.5 py-1.5 rounded-sm border transition-all flex items-center gap-1.5 ${activeMode === mode
                ? 'bg-[#052659] text-[#C1E8FF] border-[#38BDF8]/60'
                : 'text-[#7DA0CA] border-[#052659] hover:border-[#5483B3]/40 hover:text-[#C1E8FF]'
                }`}
            >
              {MODE_LABELS[mode].icon}
              <span>{MODE_LABELS[mode].label}</span>
              {activeMode === mode && (
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#38BDF8]/30 overflow-hidden">
                  <span
                    key={`${activeMode}-${timerKey}`}
                    className="block h-full bg-gradient-to-r from-[#38BDF8] to-[#818CF8]"
                    style={{ animation: 'progressFill 8s linear infinite' }}
                  />
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        id="core-stack-layout-root"
        className={`core-stack-root ${MODE_CLASSES[activeMode]}`}
      >
        {STACK.map((tech) => (
          <div
            key={tech.id}
            id={`core-stack-card-${tech.id}`}
            className="core-stack-card"
            style={{
              '--card-color': tech.color,
              '--card-bg': tech.bg,
              '--card-border': tech.border,
            }}
          >
            <div className="card-icon-wrap">
              {tech.icon}
            </div>
            <div className="card-text">
              <div className="card-name">{tech.name}</div>
              <div className="card-role">{tech.role}</div>
              <p className="card-desc">{tech.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .core-stack-root { display: flex; flex-wrap: wrap; gap: 10px; transition: all 0.5s ease; }
        .mode-grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .mode-grid2 .core-stack-card { flex-direction: column; align-items: flex-start; padding: 14px; }
        .mode-grid2 .card-icon-wrap { width: 36px; height: 36px; margin-bottom: 10px; flex-shrink: 0; }
        .mode-grid2 .card-desc { display: block; }
        .mode-grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .mode-grid3 .core-stack-card { flex-direction: column; align-items: flex-start; padding: 12px; }
        .mode-grid3 .card-icon-wrap { width: 28px; height: 28px; margin-bottom: 8px; flex-shrink: 0; }
        .mode-grid3 .card-desc { display: none; }
        .mode-list { display: flex; flex-direction: column; gap: 8px; }
        .mode-list .core-stack-card { flex-direction: row; align-items: center; padding: 12px 16px; gap: 14px; }
        .mode-list .card-icon-wrap { width: 32px; height: 32px; flex-shrink: 0; margin-bottom: 0; }
        .mode-list .card-desc { display: none; }
        .mode-list .card-text { display: flex; align-items: center; gap: 12px; flex: 1; }
        .mode-list .card-role { margin-top: 0; margin-left: auto; }
        .core-stack-card { display: flex; flex-direction: column; border-radius: 8px; background: var(--card-bg); border: 1px solid var(--card-border); cursor: default; transition: border-color 0.2s ease, padding 0.4s ease, flex-direction 0.3s ease; overflow: hidden; will-change: transform; }
        .core-stack-card:hover { border-color: var(--card-color); }
        .card-icon-wrap { width: 36px; height: 36px; margin-bottom: 10px; transition: width 0.4s ease, height 0.4s ease, margin 0.3s ease; }
        .card-name { font-size: 13px; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-weight: 700; color: var(--card-color); line-height: 1.2; }
        .card-role { font-size: 12px; color: #7DA0CA; margin-top: 2px; }
        .card-desc { font-size: 11px; color: #7DA0CA; margin-top: 8px; line-height: 1.55; display: none; }
        @media (max-width: 500px) {
          .mode-grid3 { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
};

export default CoreStackLayout;
