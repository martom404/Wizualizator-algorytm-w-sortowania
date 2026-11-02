import { Component, input, output } from '@angular/core';
import { Algorithm, AlgorithmInfo } from '../../sorting/models';
import { SelectModule } from 'primeng/select';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {ALGORITHM_INFO} from '../../sorting/algorithm-info';

@Component({
  selector: 'app-setting-panel',
  imports: [FormsModule, SelectModule, SliderModule, ButtonModule],
  templateUrl: './setting-panel.html',
  styleUrl: './setting-panel.css',
})
export class SettingPanel {
  algorithms = Object.values(ALGORITHM_INFO);

  selectedAlgorithm = input.required<Algorithm>();
  selectedSize = input.required<number>();
  selectedDelay = input.required<number>();


  algorithmChange = output<Algorithm>();
  sizeChange = output<number>();
  delayChange = output<number>();
  restart = output<void>();
}
