import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IMenuItem } from '../../interfaces/IMenuItem';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../services/theme.service';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

type WidgetType = 'date' | 'counter';

@Component({
  selector: 'app-header',
  imports: [DatePipe, RouterLink, RouterLinkActive, FontAwesomeModule, AsyncPipe, ToggleSwitchModule, SelectButtonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);

  companyName: string = 'румтибет';
  widget: WidgetType = 'counter';
  currentTime!: Date;
  clickCount: number = 0;
  faMoon: IconDefinition = faMoon;
  faSun: IconDefinition = faSun;

  headerMenuItems: IMenuItem[] = [
    {
      id: 1,
      label: 'Главная',
      path: '',
      exact: true
    },
    {
      id: 2,
      label: 'Пользователи',
      path: '/users-page',
      exact: false
    }
  ]

  constructor() {
    setInterval(() => {
        this.currentTime = new Date();
      }, 1000);
  }

  toggleWidget(widget: WidgetType): void {
    this.widget = widget;
  }

  toggleDarkMode(event: ToggleSwitchChangeEvent): void {
    this.themeService.toggleDarkMode(event.checked);
  }

}
