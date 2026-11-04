import {Algorithm, Step, SortState} from './models';

// Stan przed pierwszym krokiem
export function initialState(array: number[], algorithm: Algorithm): SortState {
  // Tablica zliczeń tylko dla Counting Sort
  let counts: number[] | null = null;
  if (algorithm === 'counting') {
    // Rozmiar zależy od największej wartości w tablicy
    counts = new Array(Math.max(9, ...array) + 1).fill(0);
  }

  // 10 pustych kubełków tylko dla Radix i Bucket Sort
  let buckets: number[][] | null = null;
  if (algorithm === 'radix' || algorithm === 'bucket') {
    buckets = [[], [], [], [], [], [], [], [], [], []];
  }

  return {
    array: [...array],
    sorted: [],
    highlights: [],
    highlightKind: null,
    counts: counts,
    buckets: buckets,
    activeSlot: null,
    comparisons: 0,
    swaps: 0,
    writes: 0,
    description: 'Gotowe do rozpoczęcia sortowania. Naciśnij przycisk "Start", aby rozpocząć wizualizację.',
  };
}

export function applyStep(previous: SortState, step: Step): SortState {
  const next: SortState = {
    array: [...previous.array],
    sorted: [...previous.sorted],
    highlights: [],
    highlightKind: null,
    counts: previous.counts ? [...previous.counts] : null,
    buckets: previous.buckets ? previous.buckets.map((bucket) => [...bucket]) : null,
    activeSlot: null,
    comparisons: previous.comparisons,
    swaps: previous.swaps,
    writes: previous.writes,
    description: '',
  }

  switch(step.type) {
    case 'compare': {
      const a = next.array[step.indexA];
      const b = next.array[step.indexB];
      next.comparisons++;
      next.highlights = [step.indexA, step.indexB];
      next.highlightKind = 'compare';
      next.description = `Porównanie: ${a} (poz. ${step.indexA + 1}) z ${b} (poz. ${step.indexB + 1})`;
      break;
    }
    case 'swap': {
      const a = next.array[step.indexA];
      const b = next.array[step.indexB];
      next.array[step.indexA] = b;
      next.array[step.indexB] = a;
      next.swaps++;
      next.highlights = [step.indexA, step.indexB];
      next.highlightKind = 'swap';
      if (step.indexA === step.indexB) {
        next.description = `Element ${a} zostaje na pozycji ${step.indexA + 1}`;
      } else {
        next.description = `Zamiana: ${a} <--> ${b}`;
      }
      break;
    }
    case 'sorted': {
      next.sorted.push(step.index);
      next.description = `Element ${next.array[step.index]} jest na swoim miejscu.`;
      break;
    }
    case 'count': {
      next.counts![step.value]++;
      next.highlights = [step.index];
      next.highlightKind = 'write';
      next.activeSlot = step.value;
      next.description = `Wartość: ${step.value}, wystąpiła już ${next.counts![step.value]} raz(y).`;
      break;
    }
    case 'place': {
      next.counts![step.value]--;
      next.array[step.index] = step.value;
      next.sorted.push(step.index);
      next.writes++;
      next.highlights = [step.index];
      next.highlightKind = 'write';
      next.activeSlot = step.value;
      next.description = `Wpisanie wartości ${step.value} na pozycję ${step.index + 1}`;
      break;
    }
    case 'toBucket': {
      next.buckets![step.bucket].push(step.value);
      next.writes++;
      next.highlights = [step.index];
      next.highlightKind = 'write';
      next.activeSlot = step.bucket;
      next.description = `Element ${step.value} trafia do kubełka ${step.bucket}`;
      break;
    }

    case 'fromBucket': {
      const bucket = next.buckets![step.bucket];
      const position = bucket.indexOf(step.value);
      bucket.splice(position, 1);
      next.array[step.index] = step.value;
      if (step.isFinal) {
        next.sorted.push(step.index);
      }
      next.writes++;
      next.highlights = [step.index];
      next.highlightKind = 'write';
      next.activeSlot = step.bucket;
      next.description = `Z kubełka ${step.bucket}: wartość ${step.value} na pozycję ${step.index + 1}`;
      break;
    }
  }

  return next;
}

export function buildSnapshots(array: number[], steps: Step[], algorithm: Algorithm): SortState[] {
  const snapshots: SortState[] = [];
  let current = initialState(array, algorithm);
  snapshots.push(current);

  for (const step of steps) {
    current = applyStep(current, step);
    snapshots.push(current);
  }

  current.description = 'Tablica została posortowana.';
  current.highlights = [];
  current.highlightKind = null;
  current.activeSlot = null;


  return snapshots;
}
