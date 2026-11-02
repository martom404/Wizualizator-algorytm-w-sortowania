import { Algorithm, Step } from './models';

export function bubbleSort(array: number[]): Step[] {
  /*Algorytm sortuje kopię, a nie oryginał.
  Oryginalna tablica jest potrzebna, żeby zacząć animację od stanu nieposortowanego.
  */
  const copy: number[] = [...array];
  const steps: Step[] = [];

  for (let i = 0; i < copy.length - 1; i++) {
    for (let j = 0; j < copy.length - i - 1; j++) {
      steps.push({ type: 'compare', indexA: j, indexB: j + 1 });

      if (copy[j] > copy[j + 1]) {
        const temp = copy[j];
        copy[j] = copy[j + 1];
        copy[j + 1] = temp;
        steps.push({ type: 'swap', indexA: j, indexB: j + 1 });
      }
    }
    steps.push({ type: 'sorted', index: copy.length - i - 1 });
  }

  //Ostatni element tablicy
  steps.push({ type: 'sorted', index: 0 });

  return steps;
}

export function quickSort(array: number[]): Step[] {
  const copy: number[] = [...array];
  const steps: Step[] = [];

  //Zamiana miejsc + zapisanie kroku
  function swap(a: number, b: number): void {
    const temp = copy[a];
    copy[a] = copy[b];
    copy[b] = temp;
    steps.push({ type: 'swap', indexA: a, indexB: b });
  }

  /*low - numer pierwszego elementu, high - ostatniego elementu
   */
  function partition(low: number, high: number): number {
    // i - to granica, wszystko na lewo od i jest mniejsze od pivota
    const pivot = copy[high];
    let i = low;
    for (let j = low; j < high; j++) {
      steps.push({ type: 'compare', indexA: j, indexB: high });
      /*
      Gdy j znajdzie element mniejszy od pivota, przenosi go na pozycję i
      oraz przesuwa granicę o jeden w prawo
       */
      if (copy[j] < pivot) {
        swap(i, j);
        i++;
      }
    }
    swap(i, high);
    return i;
  }

  function sort(low: number, high: number): void {
    if (low > high) {
      return;
    }
    if (low === high) {
      steps.push({ type: 'sorted', index: low });
      return;
    }

    const pivotIndex = partition(low, high);
    steps.push({ type: 'sorted', index: pivotIndex });
    sort(low, pivotIndex - 1);
    sort(pivotIndex + 1, high);
  }

  sort(0, copy.length - 1);
  return steps;
}

export function countingSort(array: number[]): Step[] {
  const steps: Step[] = [];
  const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //1. Liczenie
  for (let i = 0; i < array.length; i++) {
    counts[array[i]]++;
    steps.push({ type: 'count', index: i, value: array[i] });
  }

  //2. Wpisywanie od najmniejszej wartosci
  let position = 0;
  for (let value = 1; value <= 9; value++) {
    while (counts[value] > 0) {
      steps.push({ type: 'place', index: position, value: value });
      counts[value]--;
      position++;
    }
  }

  return steps;
}

export function radixSort(array: number[]): Step[] {
  const copy = [...array];
  const steps: Step[] = [];

  for (const divisor of [1, 10]) {
    const buckets: number[][] = [[], [], [], [], [], [], [], [], [], []];

    //Wrzucanie wartości do "kubełków"
    for (let i = 0; i < copy.length; i++) {
      const digit = Math.floor(copy[i] / divisor) % 10;
      buckets[digit].push(copy[i]);
      steps.push({ type: 'toBucket', index: i, bucket: digit, value: copy[i] });
    }

    //Wyjmowanie po kolei z kubełków wartości
    let position = 0;
    for (let bucket = 0; bucket < 10; bucket++) {
      for (const value of buckets[bucket]) {
        copy[position] = value;
        steps.push({ type: 'fromBucket', index: position, bucket: bucket, value: value, isFinal: divisor === 10 });
        position++;
      }
    }
  }

  return steps;
}

export function bucketSort(input: number[]): Step[] {
  const copy = [...input];
  const steps: Step[] = [];
  const buckets: number[][] = [[], [], [], [], [], [], [], [], [], []];

  //Wrzucanie
  for (let i = 0; i < copy.length; i++) {
    const bucket = Math.floor(copy[i] / 10);
    buckets[bucket].push(copy[i]);
    steps.push({ type: 'toBucket', index: i, bucket: bucket, value: copy[i] });
  }

  //Sortowanie każdego kubełka.
  for (const bucket of buckets) {
    bucket.sort((a, b) => a - b);
  }

  // 3. Wyjmowanie po kolei z kubełków 0–9
  let position = 0;
  for (let bucket = 0; bucket < 10; bucket++) {
    for (const value of buckets[bucket]) {
      copy[position] = value;
      steps.push({ type: 'fromBucket', index: position, bucket: bucket, value: value, isFinal: true });
      position++;
    }
  }

  return steps;
}

export function runAlgorithm(algorithm: Algorithm, array: number[]): Step[] {
  switch (algorithm) {
    case 'bubble':
      return bubbleSort(array);
    case 'quick':
      return quickSort(array);
    case 'counting':
      return countingSort(array);
    case 'radix':
      return radixSort(array);
    case 'bucket':
      return bucketSort(array);
  }
}

export function generateArray(size: number, maxValue: number): number[] {
  const result: number[] = [];

  for (let i = 0; i < size; i++) {
    const randomValue = Math.floor(Math.random() * maxValue) + 1;
    result.push(randomValue);
  }

  return result;
}
