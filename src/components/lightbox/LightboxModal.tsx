'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ArrowUpRight, Play } from 'lucide-react';
import { useLightbox } from './LightboxContext';

function LightboxVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Explicitly set muted on DOM element for browser autoplay compliance
    video.defaultMuted = true;
    video.muted = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay may be restricted by browser policy; user can click play on controls
      });
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      playsInline
      muted
      loop
      autoPlay
      controls
      className="max-w-full max-h-full object-contain rounded-md shadow-2xl"
    />
  );
}

export function LightboxModal() {
  const {
    isOpen,
    images,
    currentIndex,
    direction,
    projectTitle,
    projectRoleYear,
    actionLink,
    closeLightbox,
    nextImage,
    prevImage,
    goToImage,
  } = useLightbox();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentImage = images[currentIndex];
  const hasMultiple = images.length > 1;
  const currentAction = currentImage?.actionLink ?? actionLink;
  const isExternalLink = Boolean(
    currentAction?.url &&
      (currentAction.url.startsWith('http://') ||
        currentAction.url.startsWith('https://') ||
        currentAction.url.startsWith('//') ||
        currentAction.url.startsWith('mailto:'))
  );

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : dir < 0 ? -60 : 0,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : dir < 0 ? 60 : 0,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.15 },
      },
    }),
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          key="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0a0a0d]/92 backdrop-blur-2xl text-white overflow-hidden"
          onClick={(e) => {
            // Close if clicking outside interactive elements
            if (e.target === e.currentTarget) {
              closeLightbox();
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label={projectTitle || 'Image Gallery'}
        >
          {/* Top: Title, Count, Close without container background */}
          <div className="w-full px-5 py-4 sm:px-8 sm:py-6 flex items-center justify-between z-20">
            {/* Title & Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 min-w-0 pr-4">
              <h2 className="text-[1rem] font-semibold text-white tracking-tight truncate font-sans">
                {projectTitle}
              </h2>
              {projectRoleYear && (
                <span className="text-[0.875rem] font-medium text-white/50 truncate">
                  {projectRoleYear}
                </span>
              )}
            </div>

            {/* Right: Counter & Close Button */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              {hasMultiple && (
                <span className="text-[0.875rem] font-medium text-white/50">
                  {currentIndex + 1} / {images.length}
                </span>
              )}

              <button
                type="button"
                onClick={closeLightbox}
                className="group flex items-center gap-1.5 p-1 text-white/70 hover:text-white active:scale-95 transition-colors cursor-pointer focus:outline-none"
                aria-label="Close gallery (Esc)"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-[0.875rem] font-medium hidden sm:inline">
                  Close
                </span>
              </button>
            </div>
          </div>
          {/* Center Stage: Image and Left/Right Navigation */}
          <div
            className="flex-1 w-full relative flex items-center justify-center p-4 sm:p-8 min-h-0"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                closeLightbox();
              }
            }}
          >
            {/* Left Nav Button */}
            {hasMultiple && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 sm:left-6 z-20 p-2 sm:p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/[0.08] active:scale-95 transition-all cursor-pointer focus:outline-none"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Main Active Image Viewport */}
            <div className="relative w-full h-full max-w-5xl flex items-center justify-center">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag={hasMultiple ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) nextImage();
                    else if (info.offset.x > 60) prevImage();
                  }}
                  className="relative w-full h-full max-h-[66vh] sm:max-h-[72vh] flex items-center justify-center cursor-grab active:cursor-grabbing"
                >
                  {currentImage.type === 'image' ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={currentImage.src}
                        alt={currentImage.alt}
                        fill
                        unoptimized
                        priority
                        className="object-contain select-none drop-shadow-2xl"
                      />
                    </div>
                  ) : (
                    <LightboxVideo
                      src={currentImage.src}
                      poster={currentImage.poster}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Nav Button */}
            {hasMultiple && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 sm:right-6 z-20 p-2 sm:p-2.5 rounded-full text-white/70 hover:text-white hover:bg-white/[0.08] active:scale-95 transition-all cursor-pointer focus:outline-none"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom: Caption, Action Button & Thumbnails without container background */}
          <div className="w-full flex flex-col items-center gap-3 px-5 py-4 sm:px-8 sm:py-6 z-20">
            {/* Caption */}
            {currentImage.caption && (
              <p className="text-[0.875rem] font-medium text-white/70 text-center max-w-2xl px-4 font-sans leading-relaxed line-clamp-2 sm:line-clamp-none">
                {currentImage.caption}
              </p>
            )}

            {/* Optional Action Button below the image */}
            {currentAction?.url && (
              <a
                href={currentAction.url}
                target={isExternalLink ? '_blank' : undefined}
                rel={isExternalLink ? 'noopener noreferrer' : undefined}
                onClick={() => {
                  if (!isExternalLink) {
                    closeLightbox();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[0.8125rem] font-medium text-white/90 bg-white/10 hover:bg-white/20 hover:text-white border border-white/15 transition-all duration-150 active:scale-95 cursor-pointer"
              >
                <span>{currentAction.label || 'Read full report'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.8] text-white/70" />
              </a>
            )}

            {/* Thumbnails Filmstrip */}
            {hasMultiple && (
              <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1 px-2 scrollbar-none">
                {images.map((item, idx) => {
                  const isActive = idx === currentIndex;
                  const isVideo = item.type === 'video';
                  const thumbSrc = isVideo ? (item.poster || item.src) : item.src;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goToImage(idx)}
                      className={`relative w-12 sm:w-14 h-9 sm:h-10 rounded-sm overflow-hidden shrink-0 border transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'border-white ring-1 ring-white/60 scale-105 opacity-100 shadow-md'
                          : 'border-white/10 opacity-35 hover:opacity-80 hover:border-white/30'
                      }`}
                      aria-label={`Go to ${isVideo ? 'video' : 'image'} ${idx + 1}`}
                    >
                      {isVideo && !item.poster ? (
                        <video
                          src={item.src}
                          className="object-cover w-full h-full pointer-events-none"
                          muted
                          playsInline
                        />
                      ) : (
                        <Image
                          src={thumbSrc}
                          alt={item.alt}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      )}
                      {isVideo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/35 pointer-events-none">
                          <Play className="w-3 h-3 text-white fill-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
