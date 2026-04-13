import { NotificationType } from "../../enums/NotificationType";

export interface INotification {
  content: string;
  type: NotificationType;
}
