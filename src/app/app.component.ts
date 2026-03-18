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

  isPrimaryColor(color: string): boolean {
    return Object.values(Color).includes(color as Color);
  }

  saveLastVisit(): void {
    const now = new Date().toISOString();
    localStorage.setItem('lastVisit', now);
  }

  saveVisitCount(): void {
    const visits = localStorage.getItem('visits');

    const count = visits ? Number(visits) : 0;

    localStorage.setItem('visits', String(count + 1));
  }
}
