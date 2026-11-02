import { Algorithm, AlgorithmInfo } from './models';

export const ALGORITHM_INFO: Record<Algorithm, AlgorithmInfo> = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    summary:
      'Porównuje sąsiednie elementy i zamienia je, gdy stoją w złej kolejności. Po każdym przejściu największy element z nieposortowanej części trafia na koniec.',
    best: 'O(n)',
    average: 'O(n²)',
    worst: 'O(n²)',
    note: 'Przypadek O(n) wymaga flagi przerywającej pętlę, gdy w przejściu nie było zamian. Ta wersja jej nie ma, więc zawsze wykonuje pełne przejścia.',
    maxValue: 99,
  },
  quick: {
    id: 'quick',
    name: 'Quick Sort',
    summary:
      'Wybiera element osiowy (pivot) i przestawia tablicę tak, by mniejsze elementy były przed nim, a większe za nim. Potem rekurencyjnie sortuje obie części.',
    best: 'O(n log n)',
    average: 'O(n log n)',
    worst: 'O(n²)',
    note: 'Pivotem jest ostatni element zakresu. Dla tablicy już posortowanej daje to najgorszy przypadek O(n²).',
    maxValue: 99,
  },
  counting: {
    id: 'counting',
    name: 'Counting Sort',
    summary:
      'Liczy, ile razy występuje każda wartość, a potem odtwarza tablicę, wypisując wartości w kolejności rosnącej tyle razy, ile wystąpiły.',
    best: 'O(n + k)',
    average: 'O(n + k)',
    worst: 'O(n + k)',
    note: 'k to zakres wartości. Opłaca się tylko przy małym zakresie, dlatego wartości są tu losowane z przedziału 1–9.',
    maxValue: 9,
  },
  radix: {
    id: 'radix',
    name: 'Radix Sort (LSD)',
    summary:
      'Sortuje liczby cyfra po cyfrze, zaczynając od cyfry jedności. W każdym przebiegu rozkłada elementy do 10 kubełków według bieżącej cyfry i zbiera je z powrotem po kolei.',
    best: 'O(d · (n + b))',
    average: 'O(d · (n + b))',
    worst: 'O(d · (n + b))',
    note: 'd to liczba cyfr (tu 2), b to podstawa systemu (10).',
    maxValue: 99,
  },
  bucket: {
    id: 'bucket',
    name: 'Bucket Sort',
    summary:
      'Rozdziela elementy do kubełków według przedziałów wartości (dziesiątki), sortuje każdy kubełek osobno i skleja je w jedną tablicę.',
    best: 'O(n + k)',
    average: 'O(n + k)',
    worst: 'O(n²)',
    note: 'Najgorszy przypadek występuje, gdy wszystkie elementy trafią do jednego kubełka.',
    maxValue: 99,
  },
};
