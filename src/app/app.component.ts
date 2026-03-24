import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Color';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  public readonly companyName = 'РУМТИБЕТ';

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
  }

  isPrimaryColor(color: Color): boolean {
  const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
  return primaryColors.includes(color);
}

  saveLastVisit(): void {
    const now: string = new Date().toISOString();
    localStorage.setItem('lastVisit', now);
  }

  saveVisitCount(): void {
    const visits: string | null = localStorage.getItem('visits');

    const count : number = visits ? Number(visits) : 0;

    localStorage.setItem('visits', String(count + 1));
  }
}

