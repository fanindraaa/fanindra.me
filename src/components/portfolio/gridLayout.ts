import {
  GridItemConfig,
  PlacedGridItem,
  GridLayoutResult,
} from './types';
import {
  currentWork,
  previousWork,
  academicProjects,
  personalProjects,
  contactContent,
} from '@/content/projects';

/**
 * Default items to place into the grid, derived directly from existing portfolio data.
 */
export function getDefaultGridItems(): GridItemConfig[] {
  return [
    // 1. Intro block (top-left)
    {
      id: 'intro',
      type: 'intro',
      candidateSizes: [
        [4, 2],
        [3, 2],
      ],
      preferredArea: 'top-left',
      weight: 3,
      priority: 1,
    },

    // 2. About me block (Single small paragraph of body text)
    {
      id: 'about',
      type: 'about',
      candidateSizes: [
        [3, 2],
        [4, 2],
      ],
      preferredArea: 'top-left',
      weight: 3,
      priority: 2,
    },

    // 3. Hopr (Flagship Current Work hero)
    {
      id: 'hopr',
      type: 'project',
      candidateSizes: [
        [4, 3],
        [3, 3],
        [4, 2],
      ],
      preferredArea: 'top-center',
      weight: 5,
      priority: 3,
      project: currentWork,
    },

    // 4. Cardtree (Founding Designer, Previous Work)
    {
      id: 'cardtree',
      type: 'project',
      candidateSizes: [
        [3, 2],
        [3, 3],
      ],
      preferredArea: 'top-right',
      weight: 4,
      priority: 4,
      project: previousWork,
    },

    // 5. Uber Dynamic Ride-Share (Academic)
    {
      id: 'uber-dynamic-carpooling',
      type: 'project',
      candidateSizes: [
        [3, 3],
        [3, 2],
        [2, 3],
      ],
      preferredArea: 'center',
      weight: 3,
      priority: 5,
      project: academicProjects.find((p) => p.id === 'uber-dynamic-carpooling'),
    },

    // 6. Perception of X Users (Academic Research)
    {
      id: 'x-perception',
      type: 'project',
      candidateSizes: [
        [3, 2],
        [2, 2],
      ],
      preferredArea: 'bottom-left',
      weight: 3,
      priority: 6,
      project: academicProjects.find((p) => p.id === 'x-perception'),
    },

    // 7. My Tags (Personal Utility)
    {
      id: 'my-tags',
      type: 'project',
      candidateSizes: [
        [2, 2],
        [3, 2],
      ],
      preferredArea: 'bottom-center',
      weight: 3,
      priority: 7,
      project: personalProjects.find((p) => p.id === 'my-tags'),
    },

    // 8. Tactile Procedural Audio Engine (Personal / Audio)
    {
      id: 'procedural-audio',
      type: 'project',
      candidateSizes: [
        [3, 2],
        [2, 2],
      ],
      preferredArea: 'bottom-right',
      weight: 2,
      priority: 8,
      project: personalProjects.find((p) => p.id === 'procedural-audio'),
    },

    // 9. Colophon / Metadata (bottom-left)
    {
      id: 'colophon',
      type: 'colophon',
      candidateSizes: [
        [3, 1],
        [2, 1],
      ],
      preferredArea: 'bottom-left',
      weight: 1,
      priority: 9,
    },

    // 10-13. Social media links moved to right bottom corner (1x1 each)
    {
      id: 'social-email',
      type: 'social',
      candidateSizes: [[1, 1]],
      preferredArea: 'bottom-right',
      weight: 1,
      priority: 10,
      social: {
        platform: 'email',
        label: 'Email',
        url: contactContent.email.url,
      },
    },
    {
      id: 'social-linkedin',
      type: 'social',
      candidateSizes: [[1, 1]],
      preferredArea: 'bottom-right',
      weight: 1,
      priority: 11,
      social: {
        platform: 'linkedin',
        label: 'LinkedIn',
        url:
          contactContent.links.find((l) => l.label.toLowerCase().includes('linkedin'))
            ?.url || 'https://www.linkedin.com/in/fanindra-m/',
      },
    },
    {
      id: 'social-behance',
      type: 'social',
      candidateSizes: [[1, 1]],
      preferredArea: 'bottom-right',
      weight: 1,
      priority: 12,
      social: {
        platform: 'behance',
        label: 'Behance',
        url: 'https://www.behance.net/gallery/220957463/Uber-Dynamic-Carpooling',
      },
    },
    {
      id: 'social-twitter',
      type: 'social',
      candidateSizes: [[1, 1]],
      preferredArea: 'bottom-right',
      weight: 1,
      priority: 13,
      social: {
        platform: 'twitter',
        label: 'X (Twitter)',
        url:
          contactContent.links.find((l) => l.label.toLowerCase().includes('twitter'))
            ?.url || 'https://x.com/fanindraaa',
      },
    },
  ];
}

/**
 * Locked Layout 1 with dynamic, asymmetrical Swiss poster scattering:
 * - Intro fixed at top-left.
 * - Social media tiles fixed at bottom-right corner.
 * - Other tiles staggered with organic diagonal rhythm and open negative space.
 */
export const CURATED_DEFAULT_LAYOUT: Array<{
  id: string;
  col: number;
  row: number;
  colSpan: number;
  rowSpan: number;
}> = [
  { id: 'intro', col: 1, row: 1, colSpan: 4, rowSpan: 2 },
  { id: 'hopr', col: 6, row: 1, colSpan: 4, rowSpan: 3 },
  { id: 'cardtree', col: 10, row: 2, colSpan: 3, rowSpan: 2 },
  { id: 'about', col: 2, row: 3, colSpan: 3, rowSpan: 2 },
  { id: 'uber-dynamic-carpooling', col: 7, row: 4, colSpan: 3, rowSpan: 3 },
  { id: 'x-perception', col: 1, row: 5, colSpan: 3, rowSpan: 2 },
  { id: 'procedural-audio', col: 10, row: 5, colSpan: 3, rowSpan: 2 },
  { id: 'my-tags', col: 5, row: 6, colSpan: 2, rowSpan: 2 },
  { id: 'colophon', col: 1, row: 8, colSpan: 3, rowSpan: 1 },
  // All social media tiles locked in the right bottom corner (Rows 7-8, Cols 11-12):
  { id: 'social-email', col: 11, row: 7, colSpan: 1, rowSpan: 1 },
  { id: 'social-linkedin', col: 12, row: 7, colSpan: 1, rowSpan: 1 },
  { id: 'social-behance', col: 11, row: 8, colSpan: 1, rowSpan: 1 },
  { id: 'social-twitter', col: 12, row: 8, colSpan: 1, rowSpan: 1 },
];

/**
 * Generates the full viewport grid layout.
 * Locked strictly to Layout 1 with asymmetrical poster scattering.
 */
export function generateGridLayout(options?: {
  seed?: string;
  cols?: number;
  rows?: number;
  items?: GridItemConfig[];
  forceGenerative?: boolean;
}): GridLayoutResult {
  const cols = options?.cols || 12;
  const rows = options?.rows || 8;
  const items = options?.items || getDefaultGridItems();

  const placed: PlacedGridItem[] = [];
  const itemMap = new Map(items.map((i) => [i.id, i]));

  for (const c of CURATED_DEFAULT_LAYOUT) {
    const config = itemMap.get(c.id);
    if (config) {
      placed.push({
        id: c.id,
        type: config.type,
        col: c.col,
        row: c.row,
        colSpan: c.colSpan,
        rowSpan: c.rowSpan,
        weight: config.weight,
        project: config.project,
        social: config.social,
      });
    }
  }

  const occupiedCells = placed.reduce((acc, it) => acc + it.colSpan * it.rowSpan, 0);
  const totalCells = cols * rows;

  return {
    cols,
    rows,
    items: placed,
    emptyCellCount: totalCells - occupiedCells,
    totalCellCount: totalCells,
    density: occupiedCells / totalCells,
  };
}

/**
 * Curated 6-column modular grid for tablets and narrower desktops (768px - 1400px).
 * Preserves the Swiss poster aesthetic, element relationships, and negative space
 * while providing generous cell proportions for portrait and mid-size viewports.
 * Project ordering: Hopr (hero) -> X -> Cardtree -> Uber -> My Tags -> Procedural Audio.
 */
export const CURATED_TABLET_LAYOUT: Array<{
  id: string;
  col: number;
  row: number;
  colSpan: number;
  rowSpan: number;
}> = [
  { id: 'intro', col: 1, row: 1, colSpan: 4, rowSpan: 2 },
  { id: 'hopr', col: 1, row: 3, colSpan: 4, rowSpan: 3 },
  { id: 'about', col: 5, row: 3, colSpan: 2, rowSpan: 3 },
  { id: 'x-perception', col: 1, row: 6, colSpan: 3, rowSpan: 2 },
  { id: 'cardtree', col: 4, row: 6, colSpan: 3, rowSpan: 2 },
  { id: 'uber-dynamic-carpooling', col: 1, row: 8, colSpan: 3, rowSpan: 3 },
  { id: 'my-tags', col: 4, row: 8, colSpan: 2, rowSpan: 2 },
  { id: 'procedural-audio', col: 4, row: 10, colSpan: 3, rowSpan: 2 },
  { id: 'colophon', col: 1, row: 12, colSpan: 4, rowSpan: 2 },
  { id: 'social-email', col: 5, row: 12, colSpan: 1, rowSpan: 1 },
  { id: 'social-linkedin', col: 6, row: 12, colSpan: 1, rowSpan: 1 },
  { id: 'social-behance', col: 5, row: 13, colSpan: 1, rowSpan: 1 },
  { id: 'social-twitter', col: 6, row: 13, colSpan: 1, rowSpan: 1 },
];

/**
 * Generates the 6-column modular grid layout for tablets and narrower desktops.
 */
export function generateTabletGridLayout(options?: {
  items?: GridItemConfig[];
}): GridLayoutResult {
  const cols = 6;
  const rows = 13;
  const items = options?.items || getDefaultGridItems();

  const placed: PlacedGridItem[] = [];
  const itemMap = new Map(items.map((i) => [i.id, i]));

  for (const c of CURATED_TABLET_LAYOUT) {
    const config = itemMap.get(c.id);
    if (config) {
      placed.push({
        id: c.id,
        type: config.type,
        col: c.col,
        row: c.row,
        colSpan: c.colSpan,
        rowSpan: c.rowSpan,
        weight: config.weight,
        project: config.project,
        social: config.social,
      });
    }
  }

  const occupiedCells = placed.reduce((acc, it) => acc + it.colSpan * it.rowSpan, 0);
  const totalCells = cols * rows;

  return {
    cols,
    rows,
    items: placed,
    emptyCellCount: totalCells - occupiedCells,
    totalCellCount: totalCells,
    density: occupiedCells / totalCells,
  };
}

/**
 * Mobile layout specification (4-column flow with editorial poster pacing).
 */
export const MOBILE_LAYOUT: Array<{
  id: string;
  colSpan: number;
  rowSpan?: number;
}> = [
  { id: 'intro', colSpan: 4 },
  { id: 'about', colSpan: 4 },
  { id: 'hopr', colSpan: 4 },
  { id: 'cardtree', colSpan: 4 },
  { id: 'uber-dynamic-carpooling', colSpan: 4 },
  { id: 'x-perception', colSpan: 4 },
  { id: 'my-tags', colSpan: 4 },
  { id: 'procedural-audio', colSpan: 4 },
  { id: 'colophon', colSpan: 2, rowSpan: 2 },
  { id: 'social-email', colSpan: 1, rowSpan: 1 },
  { id: 'social-linkedin', colSpan: 1, rowSpan: 1 },
  { id: 'social-behance', colSpan: 1, rowSpan: 1 },
  { id: 'social-twitter', colSpan: 1, rowSpan: 1 },
];
