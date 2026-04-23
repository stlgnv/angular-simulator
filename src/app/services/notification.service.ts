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

  closeMessage(id: number): void {
    this.messages = this.messages.filter((m: INotification) => m.id !== id);
  }

  private addMessage(content: string, type: Notification): void {
    const id: number = Date.now();

    const newMessage: INotification = { content, type, id };
    this.messages = [newMessage, ...this.messages];

    setTimeout(() => {
      this.closeMessage(id);
    }, 5000);
  }

}
