/* eslint-disable @typescript-eslint/no-explicit-any */
import { userConstants } from '../../constants';

export interface SignupState {
  signingUp: boolean;
}

const initialState: SignupState = {
  signingUp: false
};

export function registration(state: SignupState = initialState, action: any) {
  switch (action.type) {
    case userConstants.SIGNUP_REQUEST:
      return { signingUp: true };
    case userConstants.SIGNUP_SUCCESS:
      return { signingUp: false };
    case userConstants.SIGNUP_FAILURE:
      return {};
    default:
      return state;
  }
}
