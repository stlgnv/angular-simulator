import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

type WidgetType = 'date' | 'counter';

@Component({
  selector: 'app-header',
  imports: [DatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent {

  companyName: string = 'румтибет';
  widget: WidgetType = 'counter';
  currentTime!: Date;
  clickCount: number = 0;

  constructor() {
    setInterval(() => {
        this.currentTime = new Date();
      }, 1000);
  }

  toggleWidget(widget: WidgetType): void {
    this.widget = widget;
  }

}
