import { Injectable, computed, signal } from '@angular/core';
import { generateArray, runAlgorithm } from '../sorting/algorithm';
import { ALGORITHM_INFO } from '../sorting/algorithm-info';
import { buildSnapshots } from '../sorting/playback';
import { Algorithm, SortState } from '../sorting/models';

@Injectable({
  providedIn: 'root',
})
export class SortPlayer {
  //Ustawienia użytkownika
  algorithm = signal<Algorithm>('bubble');
  size = signal(10);
  delay = signal(100);

  snapshots = signal<SortState[]>([]);
  currentStep = signal(0);
  isPlaying = signal(false);

  state = computed(() => this.snapshots()[this.currentStep()]);
  lastStep = computed(() => this.snapshots().length - 1);
  info = computed(() => ALGORITHM_INFO[this.algorithm()]);

  private timer = 0;

  constructor() {
    this.shuffle();
  }

  play(): void {
    if (this.isPlaying()) {
      return;
    }

    if (this.currentStep() === this.lastStep()) {
      this.currentStep.set(0);
    }

    this.isPlaying.set(true);
    this.timer = setInterval(() => this.stepForward(), this.delay());
  }

  pause(): void {
    this.isPlaying.set(false);
    clearInterval(this.timer);
  }

  stepForward(): void {
    if (this.currentStep() === this.lastStep()) {
      this.pause();
      return;
    }

    this.currentStep.set(this.currentStep() + 1);
  }

  stepBack(): void {
    this.pause();
    if (this.currentStep() > 0) {
      this.currentStep.set(this.currentStep() - 1);
    }
  }

  seek(step: number): void {
    this.pause();
    this.currentStep.set(step);
  }

  restart(): void {
    this.pause();
    this.currentStep.set(0);
  }

  togglePlay(): void {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  }

  setDelay(delay: number): void {
    this.delay.set(delay);
    if (this.isPlaying()) {
      this.pause();
      this.play();
    }
  }

  setAlgorithm(algorithm: Algorithm): void {
    this.algorithm.set(algorithm);
    this.shuffle();
  }

  setSize(size: number): void {
    this.size.set(size);
    this.shuffle();
  }

  shuffle(): void {
    this.pause();
    const array = generateArray(this.size(), this.info().maxValue);
    const steps = runAlgorithm(this.algorithm(), array);
    this.snapshots.set(buildSnapshots(array, steps, this.algorithm()));
    this.currentStep.set(0);
  }

}
