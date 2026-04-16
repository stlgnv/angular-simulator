import { Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { NgTemplateOutlet } from '@angular/common';
import { INotification } from '../../interfaces/INotification';

@Component({
  selector: 'app-message',
  imports: [NgTemplateOutlet],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  standalone: true,
})
export class MessageComponent {

  notificationService: NotificationService = inject(NotificationService);

  closeMessage(message: INotification) {
    this.notificationService.closeMessage(message);
  }

}
