'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { generateGridLayout, generateTabletGridLayout } from './gridLayout';
import { GridItem } from './GridItem';
import { IntroTile } from './IntroTile';
import { AboutTile } from './AboutTile';
import { ProjectTile } from './ProjectTile';
import { ColophonTile } from './ColophonTile';
import { SocialTile } from './SocialTile';
import {
  currentWork,
  previousWork,
  academicProjects,
  personalProjects,
  contactContent,
} from '@/content/projects';

export function PortfolioGrid() {
  // Wide Desktop layout (12 columns x 8 rows asymmetrical Swiss poster grid)
  const desktopLayout = useMemo(() => {
    return generateGridLayout({
      cols: 12,
      rows: 8,
    });
  }, []);

  // Tablet & Narrow Desktop layout (6 columns x 13 rows modular editorial grid)
  const tabletLayout = useMemo(() => {
    return generateTabletGridLayout();
  }, []);

  // Ordered projects list for clean mobile flow
  const mobileProjects = useMemo(() => {
    return [
      currentWork,
      previousWork,
      personalProjects.find((p) => p.id === 'food-atlas')!,
      academicProjects.find((p) => p.id === 'x-perception')!,
      personalProjects.find((p) => p.id === 'my-tags')!,
      personalProjects.find((p) => p.id === 'procedural-audio')!,
    ].filter(Boolean);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col justify-center items-center p-3 sm:p-4 md:p-5 lg:p-6 overflow-x-hidden">
      <div className="w-full max-w-[1760px] mx-auto flex flex-col flex-1 justify-center my-auto">
        {/* ========================================================
            WIDE DESKTOP MODULAR POSTER GRID (>= 1400px)
            12 columns x 8 rows asymmetrical Swiss poster grid
            ======================================================== */}
        <section
          aria-label="Desktop portfolio grid"
          className="portfolio-desktop-view relative w-full border border-[var(--border)] my-auto"
          style={{
            gridTemplateColumns: `repeat(${desktopLayout.cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${desktopLayout.rows}, minmax(0, 1fr))`,
            aspectRatio: '16 / 10',
            maxHeight: 'calc(100vh - 48px)',
            minHeight: '640px',
          }}
        >
          {/* Underlying visible architectural hairline grid cells */}
          <div
            className="absolute inset-0 pointer-events-none grid"
            style={{
              gridTemplateColumns: `repeat(${desktopLayout.cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${desktopLayout.rows}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: desktopLayout.cols * desktopLayout.rows }).map((_, idx) => {
              const isLastCol = (idx + 1) % desktopLayout.cols === 0;
              const isLastRow = Math.floor(idx / desktopLayout.cols) === desktopLayout.rows - 1;

              return (
                <div
                  key={`desktop-bg-cell-${idx}`}
                  className={`${!isLastCol ? 'border-r' : ''} ${!isLastRow ? 'border-b' : ''} border-[var(--border)] opacity-80`}
                />
              );
            })}
          </div>

          {/* Placed Grid Items (Poster Objects) */}
          {desktopLayout.items.map((item, idx) => (
            <motion.div
              key={`desktop-${item.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.02,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                gridColumn: `${item.col} / span ${item.colSpan}`,
                gridRow: `${item.row} / span ${item.rowSpan}`,
              }}
              className="relative z-10 w-full h-full min-w-0 min-h-0"
            >
              <GridItem item={item} />
            </motion.div>
          ))}
        </section>

        {/* ========================================================
            TABLET & NARROW DESKTOP MODULAR POSTER GRID (768px - 1400px)
            6 columns x 13 rows modular editorial grid
            ======================================================== */}
        <section
          aria-label="Tablet portfolio grid"
          className="portfolio-tablet-view relative w-full border border-[var(--border)] my-auto"
          style={{
            gridTemplateColumns: `repeat(${tabletLayout.cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${tabletLayout.rows}, minmax(0, 1fr))`,
            aspectRatio: '6 / 11',
            minHeight: '800px',
          }}
        >
          {/* Underlying visible architectural hairline grid cells */}
          <div
            className="absolute inset-0 pointer-events-none grid"
            style={{
              gridTemplateColumns: `repeat(${tabletLayout.cols}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${tabletLayout.rows}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: tabletLayout.cols * tabletLayout.rows }).map((_, idx) => {
              const isLastCol = (idx + 1) % tabletLayout.cols === 0;
              const isLastRow = Math.floor(idx / tabletLayout.cols) === tabletLayout.rows - 1;

              return (
                <div
                  key={`tablet-bg-cell-${idx}`}
                  className={`${!isLastCol ? 'border-r' : ''} ${!isLastRow ? 'border-b' : ''} border-[var(--border)] opacity-80`}
                />
              );
            })}
          </div>

          {/* Placed Grid Items (Poster Objects) */}
          {tabletLayout.items.map((item, idx) => (
            <motion.div
              key={`tablet-${item.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.02,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                gridColumn: `${item.col} / span ${item.colSpan}`,
                gridRow: `${item.row} / span ${item.rowSpan}`,
              }}
              className="relative z-10 w-full h-full min-w-0 min-h-0"
            >
              <GridItem item={item} />
            </motion.div>
          ))}
        </section>

        {/* ========================================================
            MOBILE RESPONSIVE POSTER FLOW (< 768px)
            Strictly hidden on desktop and tablet
            ======================================================== */}
        <section
          aria-label="Mobile portfolio feed"
          className="portfolio-mobile-view relative w-full my-3 border border-[var(--border)] bg-[var(--background)] flex-col divide-y divide-[var(--border)]"
        >
          {/* 1. Intro block */}
          <div className="w-full shrink-0">
            <IntroTile className="border-0" />
          </div>

          {/* 2. About Me block (Single small paragraph of body text) */}
          <div className="w-full shrink-0">
            <AboutTile className="border-0" />
          </div>

          {/* 3. Projects Stream with stable aspect ratio */}
          {mobileProjects.map((proj, idx) => (
            <div
              key={proj.id}
              className="w-full relative overflow-hidden shrink-0 aspect-[16/10] sm:aspect-[16/9] min-h-[220px] max-h-[440px]"
            >
              <ProjectTile project={proj} priority={idx === 0} />
            </div>
          ))}

          {/* 4. Social Media Links (Full width on mobile, at top of bottom section) */}
          <div className="w-full grid grid-cols-4 divide-x divide-[var(--border)] shrink-0 h-fit">
            <SocialTile
              platform="email"
              label="Email"
              url={contactContent.email.url}
              className="border-0 h-fit py-3.5 sm:py-4"
            />
            <SocialTile
              platform="linkedin"
              label="LinkedIn"
              url="https://www.linkedin.com/in/fanindra-m/"
              className="border-0 h-fit py-3.5 sm:py-4"
            />
            <SocialTile
              platform="behance"
              label="Behance"
              url="https://www.behance.net/gallery/220957463/Uber-Dynamic-Carpooling"
              className="border-0 h-fit py-3.5 sm:py-4"
            />
            <SocialTile
              platform="twitter"
              label="X (Twitter)"
              url="https://x.com/fanindraaa"
              className="border-0 h-fit py-3.5 sm:py-4"
            />
          </div>

          {/* 5. Colophon / Metadata (Full width on mobile, placed below social links) */}
          <div className="w-full shrink-0">
            <ColophonTile className="border-0 p-3 sm:p-3.5" />
          </div>
        </section>
      </div>
    </div>
  );
}
