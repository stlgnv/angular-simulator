import { Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMessage, faXmark, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, AsyncPipe, FontAwesomeModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  standalone: true,
})
export class MessageComponent {

  notificationService: NotificationService = inject(NotificationService);

  faMessage: IconDefinition = faMessage;
  faXmark: IconDefinition = faXmark;

  closeMessage(id: number) {
    this.notificationService.closeMessage(id);
  }

}
