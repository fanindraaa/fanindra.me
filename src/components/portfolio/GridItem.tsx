'use client';

import React from 'react';
import { PlacedGridItem } from './types';
import { ProjectTile } from './ProjectTile';
import { SocialTile } from './SocialTile';
import { IntroTile } from './IntroTile';
import { AboutTile } from './AboutTile';
import { ColophonTile } from './ColophonTile';

export interface GridItemProps {
  item: PlacedGridItem;
}

export function GridItem({ item }: GridItemProps) {
  switch (item.type) {
    case 'project':
      if (!item.project) return null;
      return <ProjectTile project={item.project} priority={item.id === 'hopr'} />;

    case 'intro':
      return <IntroTile />;

    case 'about':
      return <AboutTile className={item.col === 5 && item.colSpan === 2 ? 'border-r-0' : ''} />;

    case 'social': {
      if (!item.social) return null;
      const isRightEdge = item.col === 12 || item.col === 6;
      const isBottomEdge = item.row === 8 || item.row === 13;
      const borderClass = `${!isRightEdge ? 'border-r' : ''} ${!isBottomEdge ? 'border-b' : ''} border-[var(--border)]`;

      return (
        <SocialTile
          platform={item.social.platform}
          label={item.social.label}
          url={item.social.url}
          className={borderClass}
        />
      );
    }

    case 'colophon':
      return <ColophonTile />;

    default:
      return null;
  }
}
