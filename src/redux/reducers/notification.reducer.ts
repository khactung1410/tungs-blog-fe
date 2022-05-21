/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { notitficationActionTypes } from '../../constants';
import { Notification } from '../../types';

export interface NotificationAction {
  type: string;
  payload?: Notification;
}

const initialState: Notification[] = [];

export const notification = (state: Notification[] = initialState, action: NotificationAction) => {
  switch (action.type) {
    case notitficationActionTypes.ADD_NOTIFICATION:
      return [...state, action.payload];
    case notitficationActionTypes.REMOVE_NOTIFICATION:
      return [...state.filter((noti) => JSON.stringify(noti) !== JSON.stringify(action.payload))];
    default:
      return state;
  }
};
