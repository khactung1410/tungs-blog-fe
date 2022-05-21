/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { userConstants } from '../../constants';
import { userService } from '../../services';
import { history } from '../../helpers';
import { RootState } from '../../store';
import { notificationActions } from './notification.actions';

const login =
  (
    username: string,
    password: string,
    from: string
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
      dispatch(request({ username }));
      const response = await userService.login(username, password);
      dispatch(success(response)); // pass user data to reducer in the payload of the dispatch
      history.push(from);
      dispatch(notificationActions.addNotification('Login Successfully!', 'SUCCESS'));
    } catch (error: any) {
      dispatch(
        failure(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      );
      dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
    }

    // dispatch(request({ username }));

    // userService.login(username, password).then(
    //   (user: any) => {
    //     dispatch(success(user));
    //     history.push(from);
    //   },
    //   (error: any) => {
    //     dispatch(failure(error.toString()));
    //     dispatch(alertActions.error(error.toString()));
    //   }
    // );
  };

export const logout = () => {
  userService.logout();
  return { type: userConstants.LOGOUT };
};

// function register(user: any) {
//   return (dispatch: any) => {
//     dispatch(request(user));

//     userService.register(user).then(
//       (user: any) => {
//         dispatch(success(user));
//         history.push('/login');
//         dispatch(alertActions.success('Registration successful'));
//       },
//       (error: any) => {
//         dispatch(failure(error.toString()));
//         dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };

//   function request(user: any) {
//     return { type: userConstants.REGISTER_REQUEST, user };
//   }
//   function success(user: any) {
//     return { type: userConstants.REGISTER_SUCCESS, user };
//   }
//   function failure(error: any) {
//     return { type: userConstants.REGISTER_FAILURE, error };
//   }
// }

// function getAll() {
//   return (dispatch: any) => {
//     dispatch(request());

//     userService.getAll().then(
//       (users: any) => dispatch(success(users)),
//       (error: any) => dispatch(failure(error.toString()))
//     );
//   };

//   function request() {
//     return { type: userConstants.GETALL_REQUEST };
//   }
//   function success(users: any) {
//     return { type: userConstants.GETALL_SUCCESS, users };
//   }
//   function failure(error: any) {
//     return { type: userConstants.GETALL_FAILURE, error };
//   }
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function delete_user(id: any) {
//   return (dispatch: any) => {
//     dispatch(request(id));

//     userService.delete(id).then(
//       () => dispatch(success(id)),
//       (error: any) => dispatch(failure(id, error.toString()))
//     );
//   };

//   function request(id: any) {
//     return { type: userConstants.DELETE_REQUEST, id };
//   }
//   function success(id: any) {
//     return { type: userConstants.DELETE_SUCCESS, id };
//   }
//   function failure(id: any, error: any) {
//     return { type: userConstants.DELETE_FAILURE, id, error };
//   }
// }

export const userActions = {
  login
};
