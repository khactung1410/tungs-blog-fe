/* eslint-disable @typescript-eslint/no-explicit-any */
import { userConstants } from '../../constants';

export interface AuthenticationState {
  loggingIn?: boolean;
  loggedIn?: boolean;
  error?: string;
  userInfo: {
    userName?: string;
  };
}

export interface Action {
  type: string;
  payload?: string;
}

const user = JSON.parse(localStorage.getItem('user') || '{"user":""}');
const initialState: AuthenticationState = user
  ? { loggedIn: true, userInfo: user }
  : { userInfo: {} };

export function authentication(state: AuthenticationState = initialState, action: Action) {
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
}
