//Dostępne algorytmy
export type Algorithm = 'bubble' | 'quick' | 'counting' | 'radix' | 'bucket';

// Rodzaj podświetlenia słupka (od niego zależy kolor)
export type HighlightKind = 'compare' | 'swap' | 'write';

export type Step =
  | { type: 'compare'; indexA: number; indexB: number }
  | { type: 'swap'; indexA: number; indexB: number }
  | { type: 'sorted'; index: number }
  | { type: 'count'; index: number; value: number }
  | { type: 'place'; index: number; value: number }
  | { type: 'toBucket'; index: number; bucket: number; value: number }
  | { type: 'fromBucket'; index: number; bucket: number; value: number; isFinal: boolean };

export interface SortState {
  array: number[];
  sorted: number[]; // indeksy elementów już na swoim miejscu
  highlights: number[]; // indeksy podświetlone w tym kroku
  highlightKind: HighlightKind | null;
  counts: number[] | null;
  buckets: number[][] | null;
  activeSlot: number | null; // podświetlony kubełek / pole tablicy zliczeń
  comparisons: number;
  swaps: number;
  writes: number;
  description: string;
}

//Opis algorytmu do karty informacyjnej
export interface AlgorithmInfo {
  id: Algorithm;
  name: string;
  summary: string;
  best: string;
  average: string;
  worst: string;
  note: string;
  maxValue: number;
}
