import { Component, input } from '@angular/core';
import { SortState } from '../../sorting/models';

@Component({
  selector: 'app-sort-bars',
  imports: [],
  templateUrl: './sort-bars.html',
  styleUrl: './sort-bars.css',
})
export class SortBars {
  state = input.required<SortState>();
  maxValue = input.required<number>();

  color(index: number): string {
    const state = this.state();

    const isHighlighted = state.highlights.includes(index);
    const isSorted = state.sorted.includes(index);

    if (isHighlighted && state.highlightKind !== null) {
      return state.highlightKind;
    }

    if (isSorted) {
      return 'sorted';
    }

    return 'idle';
  }
}
