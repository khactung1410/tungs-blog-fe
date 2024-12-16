import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { userConstants } from '../../constants';
import { userService } from '../../services';
import { RootState } from '../../store';
import { notificationActions } from './notification.actions';
import jwtDecode from 'jwt-decode';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const login =(userName: string, password: string) =>
  async (dispatch: any) => {
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
      console.log(response)
      const loggingInTeacherInfo = jwtDecode(response.accessToken);
      console.log('loggingInTeacherInfo: ', loggingInTeacherInfo)

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem('userInfo', JSON.stringify(loggingInTeacherInfo));

      dispatch(success(loggingInTeacherInfo));
      dispatch(notificationActions.addNotification('Login Successfully!', 'SUCCESS'));
    } catch (error: any) {
      dispatch(failure(error.toString()));
      dispatch(notificationActions.addNotification('Wrong Username or Password!!', 'DANGER'));
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

const getTeacherById = (id: number) => {
  return (dispatch: any) => {
    dispatch(request(id));

    userService.getById(id).then(
      (teacherInfor: any) => {
        dispatch(success(teacherInfor));
      },
      (error: any) => {
        dispatch(failure(error.toString()));
        dispatch(notificationActions.addNotification('getTeacherById() bị lỗi: '+error.toString(), 'DANGER'));
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
  // Xóa thông tin người dùng khỏi localStorage khi đăng xuất
  localStorage.removeItem('userInfo');
  return { type: userConstants.LOGOUT };
};

const loginSuccess = (userInfo: any) => {
  return { type: userConstants.LOGIN_SUCCESS, payload: userInfo };
};

const getAllTeachers = () => {
  return (dispatch: any) => {
    const request = () => {
      return { type: userConstants.GETALL_REQUEST };
    };
    const success = (teachers: any) => {
      return { type: userConstants.GETALL_SUCCESS, payload: teachers };
    };
    const failure = (errorObj: any) => {
      return { type: userConstants.GETALL_FAILURE, payload: errorObj };
    };

    try {
      userService.getAll().then(
        (teachers: any) => {
          dispatch(success(teachers));
        },
        (error: any) => {
          dispatch(failure(error.toString()));
          dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
        }
      );
    } catch (error: any) {
      dispatch(failure(error.toString()));
      dispatch(notificationActions.addNotification('Error when GET_ALL_TEACHERS!', 'DANGER'));
    }
  }
};

export const userActions = {
  login,
  loginSuccess,
  logout,
  signup,
  getAllTeachers,
  getTeacherById
};
