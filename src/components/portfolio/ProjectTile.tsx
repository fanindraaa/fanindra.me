'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Project as ProjectType } from '@/content/projects';
import { useLightbox } from '@/components/lightbox/LightboxContext';
import { Expand, Star } from 'lucide-react';

export interface ProjectTileProps {
  project: ProjectType;
  priority?: boolean;
  className?: string;
}

export function ProjectTile({ project, priority = false, className = '' }: ProjectTileProps) {
  const { openLightbox } = useLightbox();

  const isHopr = project.id === 'hopr' || project.category === 'current';
  const primaryMedia = project.media && project.media.length > 0 ? project.media[0] : null;
  const roleYear = [project.role, project.year].filter(Boolean).join(' · ');

  const handleClick = () => {
    if (project.media && project.media.length > 0) {
      openLightbox(project.media, 0, project.title, roleYear, project.actionLink);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`View gallery for ${project.title}`}
      data-cuelume-hover="tap"
      className={`group relative w-full h-full overflow-hidden cursor-pointer bg-[#1a1917] ${className}`}
    >
      {/* Background Image filling entire tile edge-to-edge */}
      {primaryMedia ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src={primaryMedia.src}
            alt={primaryMedia.alt || project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            unoptimized={primaryMedia.src.endsWith('.svg')}
            className="object-cover object-center w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-[#222] flex items-center justify-center text-white/50 text-[0.75rem] font-medium">
          No media
        </div>
      )}

      {/* Current Role badge in top-left for Hopr */}
      {isHopr && (
        <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
          <span className="flex items-center gap-1 px-1.5 py-0.5 bg-black/75 backdrop-blur-sm border border-amber-400/70 text-amber-300 text-[0.75rem] font-medium tracking-tight shadow-sm">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400 shrink-0" />
            <span>Current Role</span>
          </span>
        </div>
      )}

      {/* Expand icon pill in top-right on hover */}
      <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <span className="flex items-center gap-1 px-1.5 py-0.5 bg-black/60 backdrop-blur-sm border border-white/20 text-white text-[0.75rem] font-medium">
          <Expand className="w-2.5 h-2.5" />
          <span>Expand</span>
        </span>
      </div>


      <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3 z-10 text-white pointer-events-none">
        <h3 className="text-[0.75rem] sm:text-[0.875rem] font-semibold tracking-tight truncate drop-shadow-sm text-white">
          {project.title}
        </h3>

        <div className="flex items-baseline justify-between gap-2 pt-0.5">
          {project.role ? (
            <p className="text-[0.75rem] font-medium text-white/80 tracking-tight truncate">
              {project.role}
            </p>
          ) : (
            <span />
          )}
          <span className="text-[0.75rem] font-medium text-white/70 shrink-0 ml-auto">
            {project.year}
          </span>
        </div>
      </div>
    </article>
  );
}
