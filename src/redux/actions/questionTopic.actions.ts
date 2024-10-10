import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { questionTopicConstants } from '../../constants';
import { questionTopicService } from '../../services';
import { notificationActions } from './notification.actions';
const getAll = () => {
    return async (dispatch: any) => {
      const request = () => ({ type: questionTopicConstants.GETALL_REQUEST });
      const success = (questionTopics: any) => ({ type: questionTopicConstants.GETALL_SUCCESS, payload: questionTopics });
      const failure = (error: any) => ({ type: questionTopicConstants.GETALL_FAILURE, payload: error });
  
      try {
        const questionTopics = await questionTopicService.getAll();
        dispatch(success(questionTopics));
      } catch (error: any) {
        dispatch(failure(error.toString()));
        dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
      }
    };
  };

  export const questionTopicActions = {
    getAll
  };