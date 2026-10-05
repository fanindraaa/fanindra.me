'use client';

import React from 'react';

export function AboutTile({ className = '' }: { className?: string }) {
  return (
    <section
      aria-label="About Fanindra"
      className={`relative w-full h-full p-3.5 sm:p-5 md:p-3 lg:p-5 flex flex-col justify-between border-b border-r border-[var(--border)] bg-[var(--background)] overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[0.6875rem] lg:text-[0.75rem] font-semibold text-[var(--muted)]">
          About me
        </span>
      </div>

      <div className="pt-2 sm:pt-3 md:pt-1.5 lg:pt-3 overflow-y-auto scrollbar-none">
        <p className="text-[0.8125rem] md:text-[0.75rem] lg:text-[0.875rem] font-medium leading-relaxed text-[var(--foreground)]">
          Recently completed my M. Des in IxD at JKLU, Jaipur. I started out in computer science, discovered design along the way, and never looked back. I still love to code for fun. I’m curious about almost everything - tech, F1, cricket, geopolitics, so you can start a conversation about anything. I also have a strange habit of memorising city maps for fun
        </p>
      </div>
    </section>
  );
}
