import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { userConstants } from '../../constants';
import { userService } from '../../services';
import { RootState } from '../../store';
import { notificationActions } from './notification.actions';
import jwtDecode from 'jwt-decode';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface FormData {
    className: string;
    teacherId: string;
    perSessionFee: string;
    perMonthFee: string;
    notes: string;
    id: number | null;
}

const getAllClasses = () =>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
    const request = (user: any) => {
      return { type: userConstants.LOGIN_REQUEST, payload: user };
    };
    const success = (user: any) => {
      return { type: userConstants.LOGIN_SUCCESS, payload: user };
    };
    const failure = (error: string) => {
      return { type: userConstants.LOGIN_FAILURE, payload: error };
    };

    try {
    } catch (error: any) {
      dispatch(failure(error.toString()));
      dispatch(notificationActions.addNotification('Wrong Username or Password!', 'DANGER'));
    }
  };

const createClass = (user: any) => {
  return (dispatch: any) => {
    dispatch(request(user));

    userService.signup(user).then(
      (user: any) => {
        dispatch(success(user));
        dispatch(notificationActions.addNotification('Sign Up Successfully!', 'SUCCESS'));
      },
      (error: any) => {
        dispatch(failure(error.toString()));
        dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
      }
    );
  };

  function request(user: any) {
    return { type: userConstants.SIGNUP_REQUEST, user };
  }
  function success(user: any) {
    return { type: userConstants.SIGNUP_SUCCESS, user };
  }
  function failure(error: any) {
    return { type: userConstants.SIGNUP_FAILURE, error };
  }
};

const updateClass = () => {
  userService.logout();
  return { type: userConstants.LOGOUT };
};

export const classActions = {
    getAllClasses, 
    createClass, 
    updateClass
};
