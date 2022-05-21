import React, { useEffect } from 'react';
import { notificationTypes } from '../../constants';
import { useAppDispatch } from '../../hooks';
import { notificationActions } from '../../redux/actions';
import { Notification as NotificationInterface } from '../../types';

interface Props {
  notification: NotificationInterface;
}

const Notification: React.FC<Props> = ({ notification }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(notificationActions.removeNotification(notification)), 3000);
  }, []);

  const colorByNotiType = () => {
    switch (notification.notiType) {
      case notificationTypes.SUCCESS:
        return 'alert alert-success';
      case notificationTypes.DANGER:
        return 'alert alert-danger';
      default:
        return 'alert alert-primary';
    }
  };

  return (
    <div className={`${colorByNotiType()} text-center shadow`}>
      {notification.message}
      <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={() => dispatch(notificationActions.removeNotification(notification))}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export { Notification };
