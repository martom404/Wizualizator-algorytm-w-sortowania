import { Component, inject } from '@angular/core';
import { SortPlayer } from '../../services/sort-player';
import { SortBars } from '../../components/sort-bars/sort-bars';
import { PlayerControls } from '../../components/player-controls/player-controls';
import { SettingPanel } from '../../components/setting-panel/setting-panel';
import { InfoPanel } from '../../components/info-panel/info-panel';
import { Bucket } from '../../components/bucket/bucket';

@Component({
  selector: 'app-visualizer',
  imports: [SortBars, PlayerControls, SettingPanel, InfoPanel, Bucket],
  templateUrl: './visualizer.html',
  styleUrl: './visualizer.css',
})
export class Visualizer {
  sortPlayer = inject(SortPlayer);
}
