import { Component, inject } from '@angular/core';
import { Color } from '../enums/Color';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessageComponent } from './components/message/message.component';
import { LocalStorageService } from './services/local-storage.service';
import { RouterOutlet } from "@angular/router";
import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, HeaderComponent, FooterComponent, MessageComponent, RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {

  localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
  }

  private isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  private saveLastVisit(): void {
    const now: string = new Date().toISOString();
    this.localStorageService.setValue('last-visit', now);
  }

  private saveVisitCount(): void {
    const count: number = this.localStorageService.getValue<number>('visits') ?? 0;
    this.localStorageService.setValue('visits', count + 1);
  }

}
