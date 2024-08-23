import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { userConstants } from '../../constants';
import { userService } from '../../services';
import { RootState } from '../../store';
import { notificationActions } from './notification.actions';
import jwtDecode from 'jwt-decode';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const login =
  (
    userName: string,
    password: string
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
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
      dispatch(request({ userName }));
      const response = await userService.login(userName, password);
      const loggingInUserInfo = jwtDecode(response.token);
      dispatch(success(loggingInUserInfo)); // pass user data to reducer in the payload of the dispatch
      dispatch(notificationActions.addNotification('Login Successfully!', 'SUCCESS'));
    } catch (error: any) {
      dispatch(failure(error.toString()));
      dispatch(notificationActions.addNotification('Wrong Username or Password!', 'DANGER'));
    }
  };

const signup = (user: any) => {
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

const logout = () => {
  userService.logout();
  return { type: userConstants.LOGOUT };
};

const getAllTeachers = () => {
  userService.logout();
  return { type: userConstants.LOGOUT };
};

export const userActions = {
  login,
  logout,
  signup,
  getAllTeachers
};
