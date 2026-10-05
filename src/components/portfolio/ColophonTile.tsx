'use client';

import React from 'react';

export function ColophonTile({ className = '' }: { className?: string }) {
  const hasBorderOverride = className.includes('border-') || className.includes('border ');
  const borderClass = hasBorderOverride ? '' : 'border-r border-[var(--border)]';

  return (
    <div className={`relative w-full h-full p-2.5 sm:p-3 md:p-2 lg:p-3 flex flex-col justify-between gap-1 md:gap-1.5 lg:gap-3 ${borderClass} bg-[var(--background)] overflow-hidden ${className}`}>
      <div className="flex items-center justify-between gap-1">
        <span className="text-[0.6875rem] lg:text-[0.75rem] font-semibold text-[var(--foreground)] truncate">
          fanindra.me: made with 🧠 + 🤖, and a whole lot of ❤️
        </span>
        <span className="text-[0.6875rem] lg:text-[0.75rem] font-medium text-[var(--muted)] shrink-0">
          © 2026
        </span>
      </div>

      <div className="flex items-center justify-between gap-1 text-[0.6875rem] lg:text-[0.75rem] font-medium">
        <span className="text-[var(--foreground)] font-semibold truncate">
          Typeface set in <a href="https://timeless.co/type" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">Timeless Sans</a>
        </span>
        <span className="text-[var(--muted)] shrink-0">
          Last updated Oct 2026
        </span>
      </div>
    </div>
  );
}
