import { Component, input, computed } from '@angular/core';
import { ALGORITHM_INFO } from '../../sorting/algorithm-info';
import { Algorithm } from '../../sorting/models';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-info-panel',
  imports: [TableModule],
  templateUrl: './info-panel.html',
  styleUrl: './info-panel.css',
})
export class InfoPanel {
  algorithm = input.required<Algorithm>();

  algorithmInfo = computed(() => ALGORITHM_INFO[this.algorithm()]);
  rows = computed(() => [this.algorithmInfo()]);
}
