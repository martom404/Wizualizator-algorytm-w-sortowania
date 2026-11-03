import { Component, input, computed } from '@angular/core';
import { AlgorithmInfo} from '../../sorting/models';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-info-panel',
  imports: [TableModule, TagModule],
  templateUrl: './info-panel.html',
  styleUrl: './info-panel.css',
})
export class InfoPanel {
  info = input.required<AlgorithmInfo>();
  rows = computed(() => [this.info()]);
}
