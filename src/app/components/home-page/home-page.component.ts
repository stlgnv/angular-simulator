import { Component, inject } from '@angular/core';
import { IOffer } from '../../interfaces/IOffer';
import { NotificationService } from '../../services/notification.service';
import { IGallery } from '../../interfaces/IGallery';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IArticle } from '../../interfaces/IArticle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faDollarSign, faPeopleLine, faPlay, faShieldHalved, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  imports: [NgClass, FormsModule, FontAwesomeModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  standalone: true,
})
export class HomePageComponent {

  notificationService: NotificationService = inject(NotificationService);

  faArrowRight: IconDefinition = faArrowRight;
  faPlay: IconDefinition = faPlay;
  faPeopleLine: IconDefinition = faPeopleLine;
  faShieldHalved: IconDefinition = faShieldHalved;
  faDollarSign: IconDefinition = faDollarSign;
  text!: string;
  cities: string[] = ['Almaty', 'Astana', 'Aktau'];
  participants: string[] = ['2 участника', '4 участника', '6 участника'];

  selectedLocation: string | null = null;
  selectedDate: string | null = null;
  selectedParticipants: string | null = null;

  tourOffers: IOffer[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: faPeopleLine,
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: faShieldHalved,
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: faDollarSign,
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

  articles: IArticle[] = [
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

  galleryPhotos: string[] = ['air-balloons', 'travel-essentials-flatlay', 'burj-al-arab-dubai', 'coast', 'grand-canyon', 'explorer-desc'];

}
