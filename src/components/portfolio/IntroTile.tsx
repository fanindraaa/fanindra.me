'use client';

import React from 'react';

export function IntroTile({ className = '' }: { className?: string }) {
  return (
    <header className={`relative w-full h-full p-4 md:p-3.5 lg:p-5 flex flex-col justify-between border-b border-r border-[var(--border)] bg-[var(--background)] overflow-hidden ${className}`}>
      {/* Top: Name & Discipline */}
      <div>
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-[0.9375rem] md:text-[0.875rem] lg:text-[1rem] font-semibold tracking-tight text-[var(--foreground)] font-sans truncate">
            Fanindra Maharana
          </h1>
          <span className="inline-flex items-center gap-1.5 text-[0.6875rem] lg:text-[0.75rem] font-medium text-[var(--muted)] shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Bengaluru
          </span>
        </div>
        <p className="text-[0.6875rem] lg:text-[0.75rem] font-medium text-[var(--muted)] pt-0.5">
          Product Designer
        </p>
      </div>

      {/* Middle/Bottom: Bio statement */}
      <div className="pt-2 md:pt-1.5 lg:pt-3">
        <p className="text-[0.8125rem] md:text-[0.75rem] lg:text-[0.875rem] font-medium leading-snug text-[var(--foreground)] font-sans">
          Product Designer obsessed with building consumer products in fast-paced environments. I care about interaction, systems, and craft
        </p>
        <p className="text-[0.8125rem] md:text-[0.75rem] lg:text-[0.875rem] font-medium text-[var(--muted)] pt-1 lg:pt-1.5">
          Currently designing Hopr by Rapido
        </p>
      </div>
    </header>
  );
}
