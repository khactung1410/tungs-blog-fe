import { notitficationActionTypes } from '../../constants';
import { NotificationType, Notification as NotificationInterface } from '../../types';

const addNotification = (message: string, notiType: NotificationType = 'INFO') => ({
  type: notitficationActionTypes.ADD_NOTIFICATION,
  payload: {
    message,
    notiType
  }
});

const removeNotification = (notification: NotificationInterface) => ({
  type: notitficationActionTypes.REMOVE_NOTIFICATION,
  payload: {
    message: notification.message,
    notiType: notification.notiType
  }
});

export const notificationActions = {
  addNotification,
  removeNotification
};
