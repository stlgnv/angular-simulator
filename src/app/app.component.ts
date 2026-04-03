import { Component } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import { FormsModule } from '@angular/forms';
import { IOffer } from './interfaces/IOffer';
import { IParticipant } from './interfaces/IParticipant';
import { DatePipe, NgClass } from '@angular/common';

type WidgetType = 'counter' | 'date';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'румтибет';
  widget: WidgetType = 'counter';
  text: string = '';
  cities: string [] = ['Almaty', 'Astana', 'Aktau'];

  selectedLocation: string | null = null;
  selectedDate: string | null = null;
  selectedParticipants: IParticipant | null = null;

  currentTime: Date = new Date();
  clickCount: number = 0;
  isLoading: boolean = true;

  tourOffers: IOffer[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'guide-icon',
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'safe-icon',
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'size-icon',
    }
  ]

  participants: IParticipant[] = [
    {
      id: 1,
      number: 2,
      title: '2 Участника'
    },
    {
      id: 2,
      number: 4,
      title: '4 Участника'
    },
    {
      id: 3,
      number: 6,
      title: '6 Участника'
    }
  ]

  constructor() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
}

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  private saveLastVisit(): void {
    const now: string = new Date().toISOString();
    localStorage.setItem('last-visit', now);
  }

  private saveVisitCount(): void {
    const visits: string | null = localStorage.getItem('visits');
    const count : number = visits ? Number(visits) : 0;
    localStorage.setItem('visits', String(count + 1));
  }

  increment(): void {
    this.clickCount++;
  }

  decrement(): void {
    if (this.clickCount > 0) {
      this.clickCount--;
    }
  }

  toggleWidget():void {
    this.widget = this.widget === 'counter' ? 'date' : 'counter';
    if (this.widget === 'date') {
      this.currentTime = new Date();
    }
}

}
