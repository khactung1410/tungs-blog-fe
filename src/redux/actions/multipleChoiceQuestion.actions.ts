import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { multipleChoiceQuestionConstants } from '../../constants';
import { multipleChoiceQuestionService } from '../../services';
import { notificationActions } from './notification.actions';
const getAll = () => {
    return async (dispatch: any) => {
      const request = () => ({ type: multipleChoiceQuestionConstants.GETALL_REQUEST });
      const success = (multipleChoiceQuestions: any) => ({ type: multipleChoiceQuestionConstants.GETALL_SUCCESS, payload: multipleChoiceQuestions });
      const failure = (error: any) => ({ type: multipleChoiceQuestionConstants.GETALL_FAILURE, payload: error });
  
      try {
        const multipleChoiceQuestions = await multipleChoiceQuestionService.getAll();
        dispatch(success(multipleChoiceQuestions));
      } catch (error: any) {
        dispatch(failure(error.toString()));
        dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
      }
    };
  };

  export const multipleChoiceQuestionActions = {
    getAll
  };