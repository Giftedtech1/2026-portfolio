import React, { useEffect, useRef, useState } from 'react';
import {
  Github,
  Linkedin,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  User,
  Video,
} from 'lucide-react';
import { animate, stagger, splitText } from 'animejs';
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

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
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

    // Phase 1: one-time entrance animation, grouped by word so lines never break mid-word
    try {
      headlineSplitter = splitText(headline, { words: true, chars: true });
      const chars = headlineSplitter.chars || [];

      if (chars.length > 0) {
        chars.forEach((c) => {
          c.style.display = 'inline-block';
        });

        // Start partially visible (not 0) so the headline paints immediately
        // and counts as the Largest Contentful Paint without waiting for the stagger.
        headlineAnim = animate(chars, {
          y: [14, 0],
          opacity: [0.35, 1],
          delay: stagger(18),
          duration: 700,
          ease: 'outExpo',
        });
      }
    } catch (e) {
      console.error('Headline anime.js error:', e);
    }

    // Phase 2: subtitle entrance
    subAnim = animate(subtitle, {
      opacity: [0.35, 1],
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

  const techStack = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'Supabase', 'Docker', 'Kubernetes', 'AWS', 'Azure'];

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
          decoding="async"
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

            {/* Availability status */}
            <div className="flex items-center gap-2 mb-6 sm:mb-8 text-sm hero-content-item">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E]" />
              <span style={{ color: '#3ECF8E' }}>Available for new work</span>
            </div>

            {/* Headline */}
            <div className="max-w-2xl mb-5 sm:mb-6 pt-2">
              <p className="mb-3 text-sm sm:text-base font-medium tracking-wide" style={{ color: '#7DA0CA' }}>
                Web Developer in Lagos, Nigeria
              </p>
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
                Website and web app developer based in Lagos, Nigeria, building fast
                websites, web applications, and digital products for businesses with{' '}
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
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-sm text-sm font-semibold transition-colors flex-1 sm:flex-initial"
                style={{
                  background: '#38BDF8',
                  color: '#021024',
                  willChange: 'transform',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#7DD3FC'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#38BDF8'; }}
              >
                View my work
              </a>

              {/* Secondary — Contact */}
              <a
                ref={secondaryCTARef}
                href="#contact"
                id="hero-contact-btn"
                className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 rounded-sm text-sm font-medium transition-all flex-1 sm:flex-initial"
                style={{
                  color: '#C1E8FF',
                  background: 'rgba(5,38,89,0.5)',
                  border: '1px solid rgba(125,160,202,0.35)',
                  willChange: 'transform',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(193,232,255,0.5)';
                  e.currentTarget.style.background = 'rgba(8,51,117,0.6)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(125,160,202,0.35)';
                  e.currentTarget.style.background = 'rgba(5,38,89,0.5)';
                }}
              >
                Get in touch
              </a>

              {/* Social Links */}
              <div className="flex items-center gap-2 pt-1 sm:pt-0 w-full sm:w-auto">
                <a
                  href="https://github.com/Giftedtech1"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] flex-1 sm:flex-initial px-3.5 py-2 rounded-sm text-sm transition-all"
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
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] flex-1 sm:flex-initial px-3.5 py-2 rounded-sm text-sm transition-all"
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
              <p className="text-sm leading-relaxed" style={{ color: '#5483B3' }}>
                <span style={{ color: '#7DA0CA' }}>Core stack: </span>
                {techStack.join(', ')}
              </p>
            </div>

          </div>

          {/* ── Right Column: Interactive Developer Media Hub ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end hero-content-item">
            <div className="w-full max-w-[380px] sm:max-w-[420px]">
              <AnimeCard
                maxTilt={6}
                scale={1.01}
                className="rounded-sm bg-[#052659]/40 backdrop-blur-md border border-[#5483B3]/35 p-3 sm:p-4 overflow-hidden relative group"
              >
                {/* Mode Switcher Tabs */}
                <div className="flex items-center justify-end mb-3 relative z-10">
                  <div className="flex items-center p-1 rounded-sm bg-[#021024]/80 border border-[#5483B3]/25 relative overflow-hidden">
                    <button
                      type="button"
                      onClick={() => handleTabSwitch('portrait')}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all ${activeTab === 'portrait'
                        ? 'bg-[#38BDF8]/20 text-[#38BDF8]'
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
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all ${activeTab === 'video'
                        ? 'bg-[#818CF8]/20 text-[#C1E8FF]'
                        : 'text-[#7DA0CA] hover:text-[#C1E8FF]'
                        }`}
                      aria-label="View developer video reel"
                    >
                      <Video size={12} />
                      <span>Reel</span>
                    </button>
                  </div>
                </div>

                {/* Main Media Showcase (4:5 Aspect Ratio) */}
                <div
                  className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-[#021024] border border-[#5483B3]/20 group/media isolate"
                  style={{ transform: 'translateZ(0)' }}
                >

                  {/* Mode A: Portrait (me.jpeg) */}
                  {activeTab === 'portrait' ? (
                    <div className="relative w-full h-full flex flex-col justify-end">
                      <img
                        src={meImg}
                        alt="Ogunleye Precious - Giftedtech"
                        width="932"
                        height="932"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Deep vignette gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#021024] via-[#021024]/35 to-transparent pointer-events-none" />

                      {/* Bottom Info Banner */}
                      <div className="p-4 relative z-10 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-[#C1E8FF] tracking-tight">
                            Ogunleye Precious
                          </h3>
                          <span className="text-sm text-[#38BDF8]">
                            @Giftedtech
                          </span>
                        </div>
                        <p className="text-sm text-[#7DA0CA]">
                          Full-Stack Developer, Cloud & React Architecture
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

                            <span className="text-xs text-[#7DA0CA]">
                              {isMuted ? 'Muted' : 'Audio on'}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleTabSwitch('portrait')}
                            className="text-xs text-[#7DA0CA] hover:text-[#38BDF8] transition-colors"
                          >
                            Back to photo
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Card Sub-Footer Status */}
                <div className="pt-3 mt-2 flex items-center gap-1.5 text-sm text-[#7DA0CA]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Remote, available worldwide</span>
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
