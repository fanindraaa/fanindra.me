import { Project as ProjectType } from '@/content/projects';

export type GridItemType =
  | 'project'
  | 'intro'
  | 'about'
  | 'social'
  | 'colophon';

export type PreferredArea =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'edges'
  | 'any';

export interface GridItemConfig {
  id: string;
  type: GridItemType;
  /**
   * Candidate dimensions as [colSpan, rowSpan].
   * The placement engine evaluates these candidate dimensions.
   */
  candidateSizes: Array<[number, number]>;
  preferredArea?: PreferredArea;
  /**
   * Visual weight: 1 (lightest, e.g. 1x1 icon) to 5 (heavy hero project).
   * Used to prevent clustering of heavy elements.
   */
  weight: number;
  priority?: number;
  /**
   * Associated data (e.g. Project data or social link info).
   */
  project?: ProjectType;
  social?: {
    platform: 'email' | 'linkedin' | 'behance' | 'twitter';
    label: string;
    url: string;
  };
}

export interface PlacedGridItem {
  id: string;
  type: GridItemType;
  col: number; // 1-indexed column start
  row: number; // 1-indexed row start
  colSpan: number;
  rowSpan: number;
  weight: number;
  project?: ProjectType;
  social?: {
    platform: 'email' | 'linkedin' | 'behance' | 'twitter';
    label: string;
    url: string;
  };
}

export interface GridLayoutResult {
  cols: number;
  rows: number;
  items: PlacedGridItem[];
  emptyCellCount: number;
  totalCellCount: number;
  density: number; // occupied / total
}
