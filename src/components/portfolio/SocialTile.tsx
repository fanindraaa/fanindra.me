'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mail, ArrowUpRight, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { playSuccessSound } from '@/lib/sound';

export interface SocialTileProps {
  platform: 'email' | 'linkedin' | 'behance' | 'twitter';
  label: string;
  url: string;
  className?: string;
}

/**
 * Clean vector marks for platforms styled to match Lucide's 24x24 stroke language.
 */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function BehanceIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M3 7h4.5a3 3 0 0 1 0 6H3V7z" />
      <path d="M3 13h5a3.5 3.5 0 0 1 0 7H3v-7z" />
      <path d="M14 13a4 4 0 1 0 7 2h-7" />
      <line x1="15" y1="8" x2="20" y2="8" />
    </svg>
  );
}

function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 4l16 16" />
      <path d="M4 20L20 4" />
      <path d="M3.5 4h4l13 16h-4z" />
    </svg>
  );
}

function getDisplayLabel(platform: SocialTileProps['platform'], label?: string): string {
  switch (platform) {
    case 'twitter':
      return 'X';
    case 'email':
      return 'Email';
    case 'linkedin':
      return 'LinkedIn';
    case 'behance':
      return 'Behance';
    default:
      return label || '';
  }
}

export function SocialTile({ platform, label, url, className = '' }: SocialTileProps) {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopyEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const emailToCopy = url ? url.replace(/^mailto:/i, '').split('?')[0] : 'imfanindra@gmail.com';

    let success = false;
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(emailToCopy);
        success = true;
      } catch {
        success = false;
      }
    }

    if (!success && typeof document !== 'undefined') {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = emailToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        success = false;
      }
    }

    setCopied(true);
    playSuccessSound();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  const renderIcon = () => {
    switch (platform) {
      case 'email':
        if (copied) {
          return <Check className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-emerald-500 stroke-[2.2]" aria-hidden="true" />;
        }
        return <Mail className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 stroke-[1.6]" aria-hidden="true" />;
      case 'linkedin':
        return <LinkedInIcon className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5" />;
      case 'behance':
        return <BehanceIcon className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5" />;
      case 'twitter':
        return <XTwitterIcon className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5" />;
      default:
        return <ArrowUpRight className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 stroke-[1.6]" aria-hidden="true" />;
    }
  };

  const displayLabel = getDisplayLabel(platform, label);
  const showTooltip = platform === 'email' && (isHovered || copied);

  const tileContent = (
    <>
      {/* Icon centered in the 1x1 cell */}
      <div className="relative transition-transform duration-200 group-hover:scale-110">
        {renderIcon()}
      </div>

      {/* Typographic label in flow */}
      <span className="text-center text-[0.75rem] md:text-[0.6875rem] lg:text-[0.75rem] font-medium leading-none text-[var(--muted)] group-hover:text-[#F4EFE7]/70 transition-colors">
        {platform === 'email' && copied ? 'Copied!' : displayLabel}
      </span>

      {/* Floating tooltip badge for Email */}
      {platform === 'email' && (
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.97 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[calc(100%+8px)] left-2 sm:left-1/2 sm:-translate-x-1/2 z-50 pointer-events-none"
            >
              <div className="flex items-center gap-1.5 px-2.5 py-1 text-[0.75rem] font-medium tracking-tight rounded bg-[#111111] text-[#F4EFE7] shadow-xl border border-white/10 whitespace-nowrap">
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[2.2]" aria-hidden="true" />
                    <span>Email copied to clipboard</span>
                  </>
                ) : (
                  <span>Copy email</span>
                )}
              </div>
              <div className="w-0 h-0 ml-6 sm:mx-auto border-x-4 border-x-transparent border-t-4 border-t-[#111111]" />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );

  const hasBorderOverride = className.includes('border-') || className.includes('border ');
  const borderClasses = hasBorderOverride ? '' : 'border-b border-r border-[var(--border)]';
  const heightClass = className.includes('h-') ? '' : 'h-full';

  const commonClasses = `group relative flex flex-col items-center justify-center gap-1.5 w-full ${heightClass} ${borderClasses} bg-[var(--background)] hover:bg-[#111111] hover:text-[#F4EFE7] text-[var(--foreground)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--foreground)] focus-visible:outline-offset-2 ${
    isHovered || copied ? 'z-30' : 'z-10'
  } ${className}`;

  if (platform === 'email') {
    return (
      <button
        type="button"
        onClick={handleCopyEmail}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label={copied ? 'Email copied to clipboard' : 'Copy email'}
        data-cuelume-click="none"
        data-cuelume-hover="tap"
        className={`${commonClasses} cursor-pointer`}
      >
        {tileContent}
      </button>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in new tab)`}
      title={label}
      data-cuelume-hover="tap"
      className={commonClasses}
    >
      {tileContent}
    </a>
  );
}
