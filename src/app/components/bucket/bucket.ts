import { Component, input } from '@angular/core';

@Component({
  selector: 'app-bucket',
  imports: [],
  templateUrl: './bucket.html',
  styleUrl: './bucket.css',
})
export class Bucket {
  buckets = input.required<number[][] | null>();   // zawartość kubełków z bieżącej klatki
  active = input<number | null>(null);      // numer kubełka używanego w tym kroku
}


