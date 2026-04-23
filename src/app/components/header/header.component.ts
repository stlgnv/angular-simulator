import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { IMenuItem } from '../../interfaces/IMenuItem';
import { RouterLink, RouterLinkActive } from "@angular/router";

type WidgetType = 'date' | 'counter';

@Component({
  selector: 'app-header',
  imports: [DatePipe, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {

  companyName: string = 'румтибет';
  widget: WidgetType = 'counter';
  currentTime!: Date;
  clickCount: number = 0;

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

}
