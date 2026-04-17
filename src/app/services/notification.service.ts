import { Injectable } from '@angular/core';
import { INotification } from '../interfaces/INotification';
import { Notification } from '../../enums/Notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private messages: INotification[] = [];

  getMessage(): INotification[] {
    return this.messages
  }

  private addMessage(content: string, type: Notification): void {
    const newMessage: INotification = { content, type };
    this.messages = [newMessage, ...this.messages];
    setTimeout(() => {
      this.closeMessage(newMessage);
    }, 5000);
  }

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

}
