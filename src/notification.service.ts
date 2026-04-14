import { Injectable } from '@angular/core';
import { INotification } from './app/interfaces/INotification';
import { Notification } from './enums/Notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  messages: INotification[] = [];

  showWarnMessage(content: string): void {
    this.addMessage(content, Notification.WARN);
  }

  showSuccessMessage(content: string): void {
    this.addMessage(content, Notification.SUCCESS);
  }

  showErrorMessage(content: string): void {
    this.addMessage(content, Notification.ERROR);
  }

  showInfoMessage(content: string): void {
    this.addMessage(content, Notification.INFO);
  }

  closeMessage(message: INotification): void {
    this.messages = this.messages.filter(m => m !== message);
  }

  private addMessage(content: string, type: Notification): void {
    const newMessage: INotification = { content, type };
    this.messages = [newMessage, ...this.messages];
    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }

}
