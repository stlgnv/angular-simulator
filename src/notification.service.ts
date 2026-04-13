import { Injectable } from '@angular/core';
import { INotification } from './app/interfaces/INotification';
import { NotificationType } from './enums/NotificationType';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  messages: INotification[] = [];

  showWarnMessage(content: string): void {
    this.addMessage(content, NotificationType.WARN);
  }

  showSuccessMessage(content: string): void {
    this.addMessage(content, NotificationType.SUCCESS);
  }

  showErrorMessage(content: string): void {
    this.addMessage(content, NotificationType.ERROR);
  }

  showInfoMessage(content: string): void {
    this.addMessage(content, NotificationType.INFO);
  }

  closeMessage(message: INotification): void {
    this.messages = this.messages.filter(m => m !== message);
  }

  private addMessage(content: string, type: NotificationType): void {
    const newMessage: INotification = { content, type };
    this.messages.unshift(newMessage);
    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }

}
