import { Component, OnDestroy, OnInit } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import { FormsModule } from '@angular/forms';
import { ILocation } from './interfaces/ILocations';
import { IOffer } from './interfaces/IOffer';
import { IParticipant } from './interfaces/IParticipant';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule,DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy{

  companyName: string = 'РУМТИБЕТ';

  selectedLocation: ILocation | null = null;
  selectedDate: string | null= null;
  selectedParticipants: IParticipant | null = null;

  currentTime: Date = new Date();
  clickCount: number = 0;
  isShowTime: boolean = false;
  text: string = '';
  isLoading: boolean = true;

  private timerId?: ReturnType<typeof setInterval>;

  tourOffers: IOffer[] = [
    {
      title: 'Опытный гид',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      img: 'assets/img/guide.svg',
      background: '#E5EEEB',
    },
    {
      title: 'Безопасный поход',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      img: 'assets/img/safe.svg',
      background: '#E3E6EE',
    },
    {
      title: 'Лояльные цены',
      text: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      img: 'assets/img/size.svg',
      background: '#F3F1E1',
    }
  ]

  cities: ILocation[] = [
    {
      name: 'Almaty',
      id: 1
    },
    {
      name: 'Astana',
      id: 2
    },
    {
      name: 'Aktau',
      id: 3
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

  ngOnInit() {
  this.saveLastVisit();
  this.saveVisitCount();

  setInterval(() => {
    this.isLoading = false;
  }, 2000);
}

  ngOnDestroy() {
    clearInterval(this.timerId);
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

  increment() {
    this.clickCount++;
  }

  decrement() {
    if (this.clickCount > 0) {
      this.clickCount--;
    }
  }

  toggleTime() {
    this.isShowTime = !this.isShowTime;

    if (this.isShowTime) {
      this.currentTime = new Date();

      this.timerId = setInterval(() => {

        this.currentTime = new Date();
      }, 1000);
    } else {
      clearInterval(this.timerId);
    }
  }

}
