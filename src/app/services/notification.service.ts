import { Injectable } from '@angular/core';
import { INotification } from '../interfaces/INotification';
import { Notification } from '../../enums/Notification';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private messagesSubject$: BehaviorSubject<INotification[]> = new BehaviorSubject<INotification[]>([]);
  messages$: Observable<INotification[]> = this.messagesSubject$.asObservable();

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
    const updatedMessages: INotification[] = this.messagesSubject$
      .getValue()
      .filter((msg: INotification) => msg.id !== id);
    this.messagesSubject$.next(updatedMessages);
  }

  private addMessage(content: string, type: Notification): void {
    const id: number = Date.now();
    const newMessage: INotification = { content, type, id };
    const currentMessages: INotification[] = this.messagesSubject$.getValue();
    const messages: INotification[] = [newMessage, ...currentMessages]
    this.messagesSubject$.next(messages);
    setTimeout(() => {
      this.closeMessage(id);
    }, 5000);
  }

}
