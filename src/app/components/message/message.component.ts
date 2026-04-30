import { Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet, AsyncPipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  standalone: true,
})
export class MessageComponent {

  notificationService: NotificationService = inject(NotificationService);

  closeMessage(id: number) {
    this.notificationService.closeMessage(id);
  }

}
