import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  Github,
  Linkedin,
  Globe,
  Terminal,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  User,
  Video,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { waapi, animate, stagger, splitText } from 'animejs';
import { useMagneticHover } from '../hooks/useMagneticHover';
import AnimeCard from './AnimeCard';
import VideoModal from './VideoModal';

import heroBg from '../assets/herobackground.jpg';
import meImg from '../assets/me.jpeg';
import devVideo from '../assets/geometric-instagram-152-portrait-1080x1350.mp4';

const Hero = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);

  const primaryCTARef = useMagneticHover({ strength: 0.25 });
  const secondaryCTARef = useMagneticHover({ strength: 0.2 });

  const hasRun = useRef(false);

  // Media Tab & Video State
  const [activeTab, setActiveTab] = useState('portrait'); // 'portrait' | 'video'
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  // Auto-switch between portrait and video reel every 8 seconds
  useEffect(() => {
    if (isVideoModalOpen) return;

    const interval = setInterval(() => {
      setActiveTab((prev) => {
        const next = prev === 'portrait' ? 'video' : 'portrait';
        if (next === 'video') {
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
            }
          }, 150);
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
        return next;
      });
      setTimerKey((k) => k + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, [isVideoModalOpen]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setTimerKey((k) => k + 1);
    if (tab === 'video') {
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      }, 100);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const duration = videoRef.current.duration || 1;
    videoRef.current.currentTime = pos * duration;
    setProgress(pos * 100);
  };

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const headline = headlineRef.current;
    const subtitle = subtitleRef.current;
    const content = contentRef.current;
    if (!headline || !subtitle || !content) return;

    let headlineAnim = null;
    let headlineSplitter = null;
    let subAnim = null;
    let contentAnim = null;

    // Phase 1: looping splitText char animation on the headline
    try {
      headlineSplitter = splitText(headline, { words: false, chars: true });
      const chars = headlineSplitter.chars || [];

      if (chars.length > 0) {
        const totalChars = chars.length;
        chars.forEach((c, idx) => {
          c.style.display = 'inline-block';
          if (c.textContent === ' ' || c.innerHTML === '&nbsp;') {
            c.style.width = '0.32em';
          }
          const ratio = idx / Math.max(totalChars - 1, 1);
          if (ratio < 0.4) {
            c.style.color = '#C1E8FF';
          } else if (ratio < 0.75) {
            c.style.color = '#7DD3FC';
          } else {
            c.style.color = '#A5B4FC';
          }
        });

        headlineAnim = animate(chars, {
          y: [
            { to: '-2.75rem', ease: 'outExpo', duration: 600 },
            { to: 0, ease: 'outBounce', duration: 800, delay: 100 },
          ],
          rotate: {
            from: '-1turn',
            delay: 0,
          },
          delay: stagger(50),
          ease: 'inOutCirc',
          loopDelay: 1000,
          loop: true,
        });
      }
    } catch (e) {
      console.error('Headline anime.js error:', e);
    }

    // Phase 2: subtitle entrance
    subAnim = animate(subtitle, {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 600,
      delay: 250,
      ease: 'outExpo',
    });

    // Phase 3: badges + CTAs + media card entrance
    const contentItems = content.querySelectorAll('.hero-content-item');
    contentAnim = animate(contentItems, {
      opacity: [0, 1],
      translateY: [18, 0],
      delay: stagger(70, { start: 350 }),
      duration: 650,
      ease: 'outExpo',
    });

    return () => {
      hasRun.current = false;
      try {
        headlineAnim?.pause?.();
        subAnim?.pause?.();
        contentAnim?.pause?.();
        headlineSplitter?.revert?.();
        if (subtitle) {
          subtitle.style.opacity = '1';
          subtitle.style.transform = 'none';
        }
        contentItems.forEach((el) => {
          el.style.opacity = '1';
          el.style.transform = 'none';
        });
      } catch {
        // cleanup safe
      }
    };
  }, []);

  const techStack = [
    { label: 'React', color: '#61DAFB', bg: 'rgba(97,218,251,0.08)', border: 'rgba(97,218,251,0.25)' },
    { label: 'TypeScript', color: '#3B82F6', bg: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.25)' },
    { label: 'Next.js', color: '#ffffff', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.15)' },
    { label: 'Tailwind', color: '#38BDF8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.25)' },
    { label: 'Supabase', color: '#3ECF8E', bg: 'rgba(62,207,142,0.08)', border: 'rgba(62,207,142,0.25)' },
    { label: 'Docker', color: '#2496ED', bg: 'rgba(36,150,237,0.08)', border: 'rgba(36,150,237,0.25)' },
    { label: 'Kubernetes', color: '#326CE5', bg: 'rgba(50,108,229,0.08)', border: 'rgba(50,108,229,0.25)' },
    { label: 'AWS', color: '#FF9900', bg: 'rgba(255,153,0,0.08)', border: 'rgba(255,153,0,0.25)' },
    { label: 'Azure', color: '#0078D4', bg: 'rgba(0,120,212,0.08)', border: 'rgba(0,120,212,0.25)' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-36 md:pb-28 bg-[#021024] bg-grid overflow-hidden border-b border-[#052659]"
    >
      {/* ── Atmospheric Hero Background Image ───────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={heroBg}
          alt="Engineering background atmosphere"
          className="w-full h-full object-cover object-center opacity-55 sm:opacity-65 scale-105 transition-transform duration-1000"
          fetchPriority="high"
          loading="eager"
        />
        {/* Balanced gradients so the background details shine through clearly while keeping text crisp */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#021024]/50 via-[#021024]/55 to-[#021024]/90" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#021024]/35 to-[#021024]/85" />
      </div>

      {/* Scan line */}
      <div className="scan-line" />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 items-center">

          {/* ── Left Column: Headlines, Narrative & CTAs ──────── */}
          <div className="lg:col-span-7" ref={contentRef}>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8 text-xs font-mono hero-content-item">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-[#C1E8FF]"
                style={{
                  background: 'rgba(5,38,89,0.7)',
                  border: '1px solid rgba(84,131,179,0.3)',
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: '#38BDF8' }} />
                <span>Ogunleye Precious · Giftedtech</span>
              </div>


              <div
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[#C1E8FF]"
                style={{
                  background: 'rgba(62,207,142,0.08)',
                  border: '1px solid rgba(62,207,142,0.25)',
                }}
              >
                <span className="w-2 h-2 rounded-full bg-[#3ECF8E] animate-pulse" />
                <span style={{ color: '#3ECF8E' }}>Available for work</span>
              </div>
            </div>

            {/* Headline */}
            <div className="max-w-2xl mb-5 sm:mb-6 pt-2">
              <h1
                ref={headlineRef}
                id="hero-headline"
                className="text-[clamp(2.4rem,6.5vw,4.8rem)] font-extrabold tracking-tight leading-[1.1] font-display"
                aria-label="Building useful products for the web."
                style={{
                  fontFamily: '"Outfit", "Plus Jakarta Sans", sans-serif',
                  color: '#C1E8FF',
                  letterSpacing: '-0.03em',
                }}
              >
                Building useful products for the web.
              </h1>

              {/* Subtitle */}
              <p
                ref={subtitleRef}
                className="mt-5 text-base sm:text-lg md:text-xl leading-relaxed font-normal"
                style={{ color: '#94A3B8' }}
              >
                Frontend / Full-Stack Developer based in Lagos, Nigeria, building modern
                web applications, digital products, and user-focused experiences with{' '}
                <span style={{ color: '#61DAFB', fontWeight: 500 }}>React</span>,{' '}
                <span style={{ color: '#3B82F6', fontWeight: 500 }}>TypeScript</span>, and robust architectures.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 hero-content-item">
              {/* Primary — View Work */}
              <a
                ref={primaryCTARef}
                href="#work"
                id="hero-view-work-btn"
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-6 py-3 rounded-md text-sm font-mono font-semibold transition-all shadow-lg flex-1 sm:flex-initial"
                style={{
                  background: 'linear-gradient(135deg, #38BDF8 0%, #818CF8 100%)',
                  color: '#021024',
                  boxShadow: '0 4px 20px rgba(56,189,248,0.25), 0 2px 8px rgba(129,140,248,0.20)',
                  willChange: 'transform',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 28px rgba(56,189,248,0.38), 0 3px 12px rgba(129,140,248,0.30)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(56,189,248,0.25), 0 2px 8px rgba(129,140,248,0.20)'; }}
              >
                <span>View my work</span>
                <ArrowDownRight size={16} />
              </a>

              {/* Secondary — Contact */}
              <a
                ref={secondaryCTARef}
                href="#contact"
                id="hero-contact-btn"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-md text-sm font-mono font-medium transition-all flex-1 sm:flex-initial"
                style={{
                  color: '#C1E8FF',
                  background: 'rgba(5,38,89,0.5)',
                  border: '1px solid rgba(99,102,241,0.40)',
                  willChange: 'transform',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(129,140,248,0.65)';
                  e.currentTarget.style.background = 'rgba(99,102,241,0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.40)';
                  e.currentTarget.style.background = 'rgba(5,38,89,0.5)';
                }}
              >
                <span>Get in touch</span>
                <ArrowRight size={15} />
              </a>

              {/* Social Links */}
              <div className="flex items-center gap-2 pt-1 sm:pt-0 w-full sm:w-auto">
                <a
                  href="https://github.com/Giftedtech1"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] flex-1 sm:flex-initial px-3.5 py-2 rounded-md text-xs font-mono transition-all"
                  style={{
                    color: '#94A3B8',
                    background: 'rgba(5,38,89,0.30)',
                    border: '1px solid rgba(84,131,179,0.22)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#C1E8FF';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
                    e.currentTarget.style.background = 'rgba(30,30,40,0.55)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#94A3B8';
                    e.currentTarget.style.borderColor = 'rgba(84,131,179,0.22)';
                    e.currentTarget.style.background = 'rgba(5,38,89,0.30)';
                  }}
                  aria-label="GitHub Profile"
                >
                  <Github size={15} />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/giftedtech-precious-a46421249"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] flex-1 sm:flex-initial px-3.5 py-2 rounded-md text-xs font-mono transition-all"
                  style={{
                    color: '#94A3B8',
                    background: 'rgba(5,38,89,0.30)',
                    border: '1px solid rgba(84,131,179,0.22)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#0A66C2';
                    e.currentTarget.style.borderColor = 'rgba(10,102,194,0.45)';
                    e.currentTarget.style.background = 'rgba(10,102,194,0.08)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = '#94A3B8';
                    e.currentTarget.style.borderColor = 'rgba(84,131,179,0.22)';
                    e.currentTarget.style.background = 'rgba(5,38,89,0.30)';
                  }}
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={15} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Tech Strip */}
            <div className="mt-10 sm:mt-12 pt-6 border-t hero-content-item" style={{ borderColor: 'rgba(84,131,179,0.18)' }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center gap-1.5 text-xs font-mono font-medium mr-1" style={{ color: '#7DA0CA' }}>
                    <Terminal size={13} style={{ color: '#38BDF8' }} />
                    Core Stack:
                  </span>
                  {techStack.map(({ label, color, bg, border }) => (
                    <span
                      key={label}
                      className="inline-flex items-center px-2.5 py-1 rounded text-[11px] font-mono font-medium"
                      style={{ color, background: bg, border: `1px solid ${border}` }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* ── Right Column: Interactive Developer Media Hub ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end hero-content-item">
            <div className="w-full max-w-[380px] sm:max-w-[420px]">
              <AnimeCard
                maxTilt={6}
                scale={1.01}
                className="rounded-2xl bg-[#052659]/40 backdrop-blur-md border border-[#5483B3]/35 shadow-2xl p-3 sm:p-4 overflow-hidden relative group"
              >
                {/* Background atmospheric glow */}
                <div className="absolute -top-16 -right-16 w-52 h-52 bg-[#38BDF8]/15 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-[#818CF8]/15 blur-3xl rounded-full pointer-events-none" />

                {/* Card Header Bar */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#5483B3]/25 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                    <span className="text-[11px] font-mono text-[#7DA0CA] ml-1.5 hidden sm:inline">
                      giftedtech.dev
                    </span>
                  </div>

                  {/* Mode Switcher Tabs */}
                  <div className="flex items-center p-1 rounded-lg bg-[#021024]/80 border border-[#5483B3]/25 relative overflow-hidden">
                    <button
                      type="button"
                      onClick={() => handleTabSwitch('portrait')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-all ${activeTab === 'portrait'
                        ? 'bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 shadow-sm'
                        : 'text-[#7DA0CA] hover:text-[#C1E8FF]'
                        }`}
                      aria-label="View portrait photo"
                    >
                      <User size={12} />
                      <span>Portrait</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTabSwitch('video')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-all ${activeTab === 'video'
                        ? 'bg-[#818CF8]/20 text-[#C1E8FF] border border-[#818CF8]/40 shadow-sm'
                        : 'text-[#7DA0CA] hover:text-[#C1E8FF]'
                        }`}
                      aria-label="View developer video reel"
                    >
                      <Video size={12} />
                      <span className="relative flex items-center gap-1">
                        Reel
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                      </span>
                    </button>

                    {/* 8s auto-switch countdown line */}
                    <div className="absolute bottom-0 inset-x-0 h-[2px] bg-[#052659]/80 overflow-hidden">
                      <div
                        key={`${activeTab}-${timerKey}`}
                        className="h-full bg-gradient-to-r from-[#38BDF8] to-[#818CF8]"
                        style={{
                          animation: 'progressFill 8s linear infinite',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Main Media Showcase (4:5 Aspect Ratio) */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#021024] border border-[#5483B3]/20 group/media">

                  {/* Mode A: Portrait (me.jpeg) */}
                  {activeTab === 'portrait' ? (
                    <div className="relative w-full h-full flex flex-col justify-end">
                      <img
                        src={meImg}
                        alt="Ogunleye Precious - Giftedtech"
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Deep vignette gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#021024] via-[#021024]/35 to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#021024]/80 backdrop-blur-md border border-emerald-500/40 text-[11px] font-mono text-emerald-300">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span>Active</span>
                        </div>
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#021024]/80 backdrop-blur-md border border-[#5483B3]/30 text-[11px] font-mono text-[#C1E8FF]">
                          <ShieldCheck size={12} className="text-[#38BDF8]" />

                        </div>
                      </div>

                      {/* Bottom Info Banner */}
                      <div className="p-4 relative z-10 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-[#C1E8FF] tracking-tight">
                            Ogunleye Precious
                          </h3>
                          <span className="text-xs font-mono text-[#38BDF8]">
                            @Giftedtech
                          </span>
                        </div>
                        <p className="text-xs text-[#7DA0CA] font-mono">
                          Full-Stack Developer · Cloud & React Architecture
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* Mode B: Video Reel (geometric-instagram-152-portrait-1080x1350.mp4) */
                    <div className="relative w-full h-full bg-black">
                      <video
                        ref={videoRef}
                        src={devVideo}
                        playsInline
                        loop
                        muted={isMuted}
                        onTimeUpdate={handleTimeUpdate}
                        onClick={togglePlay}
                        className="w-full h-full object-cover cursor-pointer"
                      />

                      {/* Pause Center Overlay */}
                      {!isPlaying && (
                        <button
                          type="button"
                          onClick={togglePlay}
                          className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#021024]/85 border border-[#38BDF8]/50 text-[#38BDF8] flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-20"
                          aria-label="Play Video"
                        >
                          <Play size={22} className="ml-1 fill-current" />
                        </button>
                      )}

                      {/* Video Top Right Controls */}
                      <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                        <button
                          type="button"
                          onClick={() => setIsVideoModalOpen(true)}
                          className="p-1.5 rounded-lg bg-[#021024]/80 hover:bg-[#083375] border border-[#5483B3]/30 text-[#C1E8FF] transition-colors"
                          title="Open Fullscreen Reel"
                          aria-label="Expand video"
                        >
                          <Maximize2 size={13} />
                        </button>
                      </div>

                      {/* Bottom Interactive Player Controls */}
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#021024] via-[#021024]/70 to-transparent flex flex-col gap-2 z-20">
                        {/* Progress Bar */}
                        <div
                          className="w-full h-1 bg-[#052659]/90 rounded-full cursor-pointer relative overflow-hidden"
                          onClick={handleSeek}
                        >
                          <div
                            className="h-full bg-gradient-to-r from-[#38BDF8] to-[#818CF8]"
                            style={{ width: `${progress}%` }}
                          />
                        </div>

                        {/* Player Buttons */}
                        <div className="flex items-center justify-between text-[#C1E8FF]">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={togglePlay}
                              className="p-1 rounded hover:bg-white/10 text-[#C1E8FF] transition-colors"
                              aria-label={isPlaying ? 'Pause' : 'Play'}
                            >
                              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                            </button>

                            <button
                              type="button"
                              onClick={toggleMute}
                              className="p-1 rounded hover:bg-white/10 text-[#C1E8FF] transition-colors"
                              aria-label={isMuted ? 'Unmute' : 'Mute'}
                            >
                              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                            </button>

                            <span className="text-[10px] font-mono text-[#7DA0CA]">
                              {isMuted ? 'MUTED' : 'AUDIO ON'}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleTabSwitch('portrait')}
                            className="text-[11px] font-mono text-[#7DA0CA] hover:text-[#38BDF8] transition-colors flex items-center gap-1"
                          >
                            <span>Back to photo</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Card Sub-Footer Status */}
                <div className="pt-3 mt-2 flex items-center justify-between text-[11px] font-mono text-[#7DA0CA]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Remote · Worldwide Available</span>
                  </span>
                  <span className="text-[#5483B3]">
                    React · TS · Cloud
                  </span>
                </div>

              </AnimeCard>
            </div>
          </div>

        </div>
      </div>

      {/* Cinematic Modal for Video Reel */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoSrc={devVideo}
      />
    </section>
  );
};

export default Hero;
