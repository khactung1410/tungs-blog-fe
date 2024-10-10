import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { questionTypeConstants } from '../../constants';
import { questionTypeService } from '../../services';
import { notificationActions } from './notification.actions';
const getAll = () => {
    return async (dispatch: any) => {
      const request = () => ({ type: questionTypeConstants.GETALL_REQUEST });
      const success = (questionTypes: any) => ({ type: questionTypeConstants.GETALL_SUCCESS, payload: questionTypes });
      const failure = (error: any) => ({ type: questionTypeConstants.GETALL_FAILURE, payload: error });
  
      try {
        const questionTypes = await questionTypeService.getAll();
        dispatch(success(questionTypes));
      } catch (error: any) {
        dispatch(failure(error.toString()));
        dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
      }
    };
  };

  export const questionTypeActions = {
    getAll
  };