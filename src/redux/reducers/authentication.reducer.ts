/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt_decode from 'jwt-decode';
import { userConstants } from '../../constants';

export interface UserInfo {
  id?: string;
  email?: string;
  userName?: string;
  createAt?: string;
}
export interface AuthenticationState {
  loggingIn?: boolean;
  loggedIn?: boolean;
  error?: string;
  userInfo?: UserInfo;
}

export interface Action {
  type: string;
  payload?: string;
}
const checkEmpty = (obj: Object) => Object.keys(obj).length === 0;

const token = JSON.parse(localStorage.getItem('token') || '{}');
const initialState: AuthenticationState = checkEmpty(token)
  ? {}
  : { loggedIn: true, userInfo: token };

export const authentication = (state: AuthenticationState = initialState, action: Action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        loggedIn: false
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggingIn: false,
        loggedIn: true,
        userInfo: action.payload
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggingIn: false,
        loggedIn: false,
        error: action.payload
      };
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};
