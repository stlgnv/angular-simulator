import { Component, inject } from '@angular/core';
import './training';
import { Color } from '../enums/Color';
import { FormsModule } from '@angular/forms';
import { IOffer } from './interfaces/IOffer';
import { DatePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { IGallery } from './interfaces/IGallery';
import { IArticles } from './interfaces/IArticles';
import { LocalStorageService } from '../local-storage.service';
import { NotificationService } from '../notification.service';

type WidgetType = 'date' | 'counter';

@Component({
  selector: 'app-root',
  imports: [FormsModule, DatePipe, NgClass, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  localStorageService: LocalStorageService = inject(LocalStorageService);
  notificationService: NotificationService = inject(NotificationService);

  companyName: string = 'румтибет';
  widget: WidgetType = 'counter';
  text!: string ;
  cities: string [] = ['Almaty', 'Astana', 'Aktau'];
  participants: string [] = ['2 участника', '4 участника', '6 участника'];

  selectedLocation: string | null = null;
  selectedDate: string | null = null;
  selectedParticipants: string | null = null;

  currentTime!: Date;
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
      icon: 'label-icon',
    }
  ];

  galleryCards: IGallery[] = [
    {
      id: 1,
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      price: 480,
      rating: 4.9,
      image: 'lake-mountains',
    },
    {
      id: 2,
      title: 'Ночь в горах',
      description: 'в компании друзей',
      price: 500,
      rating: 4.5,
      image: 'night-mountains',
    },
    {
      id: 3,
      title: 'Растяжка в горах',
      description: 'для тех, кто забоится о себе',
      price: 230,
      rating: 5.0,
      image: 'stretching-mountains',
    }
  ];

  articles: IArticles[] = [
    {
      id: 1,
      title: 'Красивая Италия, какая она в реальности?',
      image: 'italy-coast',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.'
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      image: 'airplane',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...'
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку? ',
      image: 'backpack-traveler',
      description: 'Для современного мира базовый вектор развития предполагает.'
    },
    {
      id: 4,
      title: 'Индия ... летим?',
      image: 'tajmaxal',
      description: 'Для современного мира базовый.'
    }
  ]

  constructor() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);

    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
}

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  private saveLastVisit(): void {
    const now: string = new Date().toISOString();
    this.localStorageService.setValue('last-visit', now)
  }

  private saveVisitCount(): void {
    const count: number = this.localStorageService.getValue<number>('visits') ?? 0;
    this.localStorageService.setValue('visits', count + 1);
  }

  toggleWidget(widget: WidgetType): void {
    this.widget = widget;
}

}
