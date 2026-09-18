import React, { useEffect, useRef, useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, RotateCcw } from 'lucide-react';

const VideoModal = ({ isOpen, onClose, videoSrc }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle play state on open/close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
          // Autoplay with sound might be blocked, fallback to muted
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().catch(() => setIsPlaying(false));
          }
        });
      }
    } else {
      document.body.style.overflow = '';
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
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
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const duration = videoRef.current.duration || 1;
    videoRef.current.currentTime = pos * duration;
    setProgress(pos * 100);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Developer Video Reel"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#021024]/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm sm:max-w-md max-h-[90vh] bg-[#052659] border border-[#5483B3]/40 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#021024]/80 border-b border-[#5483B3]/25 z-20">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono text-[#C1E8FF] font-medium tracking-wide">
              Giftedtech · Video Reel
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#7DA0CA] hover:text-[#C1E8FF] hover:bg-[#5483B3]/20 transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Container (Portrait Aspect Ratio) */}
        <div className="relative aspect-[4/5] w-full bg-black overflow-hidden group">
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            loop
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            className="w-full h-full object-cover cursor-pointer"
          />

          {/* Center Play Overlay when paused */}
          {!isPlaying && (
            <button
              type="button"
              onClick={togglePlay}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#021024]/80 border border-[#38BDF8]/50 text-[#38BDF8] flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
              aria-label="Play video"
            >
              <Play size={28} className="ml-1 fill-current" />
            </button>
          )}

          {/* Bottom Custom Overlay Controls */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#021024]/90 via-[#021024]/60 to-transparent flex flex-col gap-2">
            {/* Progress Bar */}
            <div
              className="w-full h-1.5 bg-[#052659]/80 rounded-full cursor-pointer relative overflow-hidden"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-gradient-to-r from-[#38BDF8] to-[#818CF8] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between pt-1 text-[#C1E8FF]">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="p-1.5 rounded-md hover:bg-white/10 transition-colors text-xs font-mono text-[#7DA0CA] hover:text-[#C1E8FF]"
                  aria-label="Restart video"
                  title="Restart"
                >
                  <RotateCcw size={14} />
                </button>
              </div>

              <span className="text-[11px] font-mono text-[#7DA0CA]">
                1080 × 1350 · MP4
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
