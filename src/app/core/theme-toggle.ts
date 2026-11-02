import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-theme-toggle',
  imports: [ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p-button
      [icon]="icon()"
      [ariaLabel]="label()"
      [text]="true"
      severity="contrast"
      (onClick)="toggle()"
    />
  `,
})
export class ThemeToggle {
  protected readonly isDark = signal(localStorage.getItem('theme') !== 'light');

  protected readonly icon = computed(() => (this.isDark() ? 'pi pi-sun' : 'pi pi-moon'));
  protected readonly label = computed(() =>
    this.isDark() ? 'Włącz jasny motyw' : 'Włącz ciemny motyw',
  );

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('app-dark', this.isDark());
      localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');
    });
  }

  protected toggle(): void {
    this.isDark.update((dark) => !dark);
  }
}
