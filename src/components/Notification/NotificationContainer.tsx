/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from '../../hooks';
import { Notification as NotificationInterface } from '../../types';
import Notification from './Notification';
import { NotificationBox } from './Notification.styled';

const NotificationContainer = () => {
  const notifications = useAppSelector((state: any) => state.notification);

  return (
    <NotificationBox>
      {notifications.map((notification: NotificationInterface, index: number) => (
        <Notification key={index} notification={notification} />
      ))}
    </NotificationBox>
  );
};

export default NotificationContainer;
