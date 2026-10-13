import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Lock, Globe, RefreshCw, Monitor } from 'lucide-react';

/**
 * ProjectPreview Component
 * Displays a live website inside a scaled browser frame with intelligent fallback to screenshots.
 * 
 * Features:
 * - Lazy-loads live iframe only when near viewport
 * - Desktop scaling (1280px rendered desktop layout scaled to fit any card aspect ratio)
 * - Error & X-Frame-Options fallback detection to screenshot
 * - Click anywhere to open the live site in a new tab
 * - Interactive mode toggle to scroll within the live site
 * - Minimal, senior-level browser chrome
 */
const ProjectPreview = ({
  project,
  aspect = 'aspect-[16/10]',
  overlayBadge,
  priority = false,
  className = ''
}) => {
  const containerRef = useRef(null);
  const viewportRef = useRef(null);
  const [inView, setInView] = useState(priority);
  const [isLiveEnabled, setIsLiveEnabled] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const [scale, setScale] = useState(1);
  const [viewportDim, setViewportDim] = useState({ width: 1280, height: 800 });

  const hasLiveUrl = Boolean(
    project.liveUrl &&
    !project.liveUrl.includes('github.com') &&
    project.liveUrl.startsWith('http')
  );

  // Clean domain name for the browser address bar
  const displayDomain = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : 'internal-build';

  // 1. Viewport intersection observer (lazy loading)
  useEffect(() => {
    const el = containerRef.current;
    if (!el || priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  // 2. Measure container width to scale 1280px desktop iframe seamlessly
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const updateScale = () => {
      const rect = vp.getBoundingClientRect();
      const targetWidth = 1280; // Standard desktop breakpoint
      const currentWidth = rect.width;
      if (currentWidth > 0) {
        const computedScale = currentWidth / targetWidth;
        setScale(computedScale);
        setViewportDim({
          width: targetWidth,
          height: Math.max(720, Math.round(rect.height / computedScale))
        });
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(vp);
    window.addEventListener('resize', updateScale);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  // 3. Fallback timeout for live preview (if X-Frame-Options or slow connection blocks it)
  useEffect(() => {
    if (!isLiveEnabled || iframeLoaded || iframeFailed) return;

    const timeout = setTimeout(() => {
      if (!iframeLoaded) {
        // If iframe hasn't reported load within 7 seconds, fallback gracefully
        setIframeFailed(true);
      }
    }, 7000);

    return () => clearTimeout(timeout);
  }, [isLiveEnabled, iframeLoaded, iframeFailed]);

  // Handle clicking the preview to open the live site
  const handlePreviewClick = () => {
    if (isInteractive) return; // Allow interaction with the iframe
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleToggleLive = (e) => {
    e.stopPropagation();
    if (!isLiveEnabled) {
      setIsLiveEnabled(true);
      setIframeFailed(false);
      setIframeLoaded(false);
    } else {
      setIsLiveEnabled(false);
      setIsInteractive(false);
    }
  };

  const handleToggleInteractive = (e) => {
    e.stopPropagation();
    setIsInteractive((prev) => !prev);
  };

  const showIframe = hasLiveUrl && isLiveEnabled && !iframeFailed && inView;

  return (
    <div
      ref={containerRef}
      className={`w-full rounded-sm border border-[#5483B3]/30 bg-[#021024] overflow-hidden group/preview transition-all duration-300 hover:border-[#7DA0CA]/60 flex flex-col ${className}`}
    >
      {/* ── Preview Header ── */}
      <div className="px-3.5 py-2.5 bg-[#052659]/70 border-b border-[#052659] flex items-center justify-between gap-2.5 text-sm select-none">
        {/* Site address */}
        <div
          onClick={handlePreviewClick}
          className="flex-1 min-w-0 flex items-center gap-1.5 px-3 py-1 rounded-sm bg-[#021024]/85 border border-[#5483B3]/30 text-[#7DA0CA] hover:text-[#C1E8FF] hover:border-[#7DA0CA]/60 transition-colors cursor-pointer truncate"
          title="Click to visit live website"
        >
          <Lock size={11} className="text-[#3ECF8E] shrink-0" />
          <span className="truncate">{displayDomain}</span>
        </div>

        {/* Mode Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          {hasLiveUrl ? (
            <>
              {/* Live Toggle */}
              <button
                type="button"
                onClick={handleToggleLive}
                className={`flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-xs transition-all border ${
                  isLiveEnabled && !iframeFailed
                    ? 'bg-[#3ECF8E]/15 text-[#3ECF8E] border-[#3ECF8E]/40'
                    : 'bg-[#021024] text-[#7DA0CA] border-[#5483B3]/30 hover:border-[#7DA0CA] hover:text-[#C1E8FF]'
                }`}
                title={isLiveEnabled ? 'Switch to static screenshot' : 'Load live interactive website'}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isLiveEnabled && !iframeFailed ? 'bg-[#3ECF8E] animate-pulse' : 'bg-[#5483B3]'}`} />
                <span className="hidden sm:inline">{isLiveEnabled && !iframeFailed ? 'Live site' : 'Load live site'}</span>
                <span className="sm:hidden">{isLiveEnabled && !iframeFailed ? 'Live' : 'Load'}</span>
              </button>

              {/* Interactive toggle when live is active */}
              {isLiveEnabled && iframeLoaded && !iframeFailed && (
                <button
                  type="button"
                  onClick={handleToggleInteractive}
                  className={`hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs transition-all border ${
                    isInteractive
                      ? 'bg-[#38BDF8]/20 text-[#38BDF8] border-[#38BDF8]/50'
                      : 'bg-[#021024] text-[#7DA0CA] border-[#5483B3]/30 hover:text-[#C1E8FF]'
                  }`}
                  title={isInteractive ? 'Lock viewport for card scrolling' : 'Enable in-card scrolling'}
                >
                  <Monitor size={10} />
                  <span>{isInteractive ? 'Interactive' : 'Click to scroll'}</span>
                </button>
              )}
            </>
          ) : (
            <span className="text-xs text-[#5483B3] px-2 py-0.5 rounded-sm bg-[#021024] border border-[#5483B3]/20">
              Verified
            </span>
          )}

          {/* External Link Direct Action */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1 rounded-sm text-[#7DA0CA] hover:text-[#C1E8FF] hover:bg-[#052659] transition-colors"
              aria-label={`Open ${project.title} in new tab`}
              title="Open in new tab"
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>

      {/* ── Viewport Area ── */}
      <div
        ref={viewportRef}
        onClick={handlePreviewClick}
        className={`relative w-full ${aspect} overflow-hidden bg-[#021024] cursor-pointer`}
      >
        {/* State 1: Live Iframe (Scaled Desktop View) */}
        {showIframe && (
          <div
            className="absolute top-0 left-0 overflow-hidden"
            style={{
              width: `${viewportDim.width}px`,
              height: `${viewportDim.height}px`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
              pointerEvents: isInteractive ? 'auto' : 'none',
            }}
          >
            <iframe
              src={project.liveUrl}
              title={`${project.title} Live Preview`}
              loading="lazy"
              className="w-full h-full border-0 bg-white"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              onLoad={() => {
                setIframeLoaded(true);
                setIframeFailed(false);
              }}
              onError={() => {
                setIframeFailed(true);
              }}
            />
          </div>
        )}

        {/* Loading Spinner for Iframe */}
        {showIframe && !iframeLoaded && (
          <div className="absolute inset-0 bg-[#021024]/90 backdrop-blur-xs flex flex-col items-center justify-center gap-2 z-10 pointer-events-none">
            <RefreshCw size={20} className="text-[#38BDF8] animate-spin" />
            <span className="text-xs font-mono text-[#7DA0CA]">Connecting to live homepage...</span>
          </div>
        )}

        {/* State 2: High-Resolution Screenshot (shown if not live, or as fallback) */}
        {(!showIframe || !iframeLoaded || iframeFailed) && (
          <>
            {project.image ? (
              <img
                src={project.image}
                alt={`${project.title} Production Preview`}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/preview:scale-[1.025]"
                loading="lazy"
              />
            ) : (
              /* Fallback Frame if no image exists */
              <div className="w-full h-full bg-gradient-to-br from-[#052659]/50 via-[#021024] to-[#052659]/30 p-6 sm:p-8 flex flex-col justify-between relative">
                <div className="space-y-2">
                  <h4 className="text-lg sm:text-xl font-bold text-[#C1E8FF]">{project.title}</h4>
                  <p className="text-sm text-[#7DA0CA] line-clamp-3">{project.tagline}</p>
                </div>
                <div className="pt-3 border-t border-[#052659] text-sm text-[#5483B3]">
                  {project.tech?.slice(0, 3).join(', ')}
                </div>
              </div>
            )}
          </>
        )}

        {/* Subtle Vignette & Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#021024]/75 via-transparent to-transparent opacity-60 group-hover/preview:opacity-30 transition-opacity duration-300" />

        {/* Hover Cue */}
        {!isInteractive && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="px-4 py-2 rounded-sm bg-[#021024]/90 backdrop-blur-md border border-[#7DA0CA]/50 text-sm text-[#C1E8FF] flex items-center gap-2 transform translate-y-1 group-hover/preview:translate-y-0 transition-transform">
              <Globe size={13} className="text-[#3ECF8E]" />
              <span>View live site</span>
            </div>
          </div>
        )}

        {/* Optional Telemetry / Metric Badge (Bottom-left) */}
        {overlayBadge && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#021024]/95 backdrop-blur-sm border border-[#5483B3]/40 text-sm text-[#C1E8FF] pointer-events-none z-10">
            <span className="w-2 h-2 rounded-full bg-[#3ECF8E] animate-pulse" />
            <span className="truncate">{overlayBadge}</span>
          </div>
        )}

        {/* Fallback Notice Badge if Iframe was restricted by CSP */}
        {iframeFailed && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#021024]/95 border border-[#5483B3]/40 text-xs text-[#7DA0CA] z-10 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
            <span>Static snapshot</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPreview;
