import { Component } from '@angular/core';
import { Visualizer } from './visualizer/visualizer/visualizer';
import { ThemeToggle } from './core/theme-toggle';

@Component({
  selector: 'app-root',
  imports: [ThemeToggle, Visualizer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
