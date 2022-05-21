export type NotificationType = 'SUCCESS' | 'DANGER' | 'INFO';

export interface Notification {
  message: string;
  notiType: NotificationType;
}
