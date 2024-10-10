import { multipleChoiceQuestionConstants } from '../../constants';

const initialMultipleChoiceQuestionsState = {
  multipleChoiceQuestionList: [] as any[],
  loading: false
};

export function multipleChoiceQuestions(state = initialMultipleChoiceQuestionsState, action: any) {
  switch (action.type) {
    case multipleChoiceQuestionConstants.GETALL_REQUEST:
      return { loading: true };
    case multipleChoiceQuestionConstants.GETALL_SUCCESS:
      return { ...state, loading: false, multipleChoiceQuestionList: action.payload };
    case multipleChoiceQuestionConstants.GETALL_FAILURE:
      return { error: action.payload };
    default:
      return state;
  }
}
