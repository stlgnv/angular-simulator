import { Notification } from "../../enums/Notification";

export interface INotification {
  id: number;
  content: string;
  type: Notification;
}
