import { Component } from '@angular/core';
import { faArrowRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPinterest, faSkype, faTelegramPlane, faVk } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
})
export class FooterComponent {

  faArrowRight: IconDefinition = faArrowRight;
  faTelegram: IconDefinition = faTelegramPlane;
  faVk: IconDefinition = faVk;
  faSkype: IconDefinition = faSkype;
  faPinterest: IconDefinition = faPinterest;

  footerLinks: string[] = ['Прогулки в горы летом', 'Зимние походы в горы', 'Посещение храмов в горах', 'Экстремальные виды туризма', 'Походы в джунглях Амазонии', 'Поездка в Африку'];

  travelNotes: string[] = ['Как собрать в долгий поход?', 'Жизненно важные предметы для похода', 'Медицинская страховка, гарантии безопасности', 'Если вы врач - загляните сюда'];

}
