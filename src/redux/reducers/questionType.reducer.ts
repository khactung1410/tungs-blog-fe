import { questionTypeConstants } from '../../constants';

const initialQuestionTypesState = {
  questionTypeList: [] as any[],
  loading: false
};

export function questionTypes(state = initialQuestionTypesState, action: any) {
  switch (action.type) {
    case questionTypeConstants.GETALL_REQUEST:
      return { loading: true };
    case questionTypeConstants.GETALL_SUCCESS:
      return { ...state, loading: false, questionTypeList: action.payload };
    case questionTypeConstants.GETALL_FAILURE:
      return { error: action.payload };
    default:
      return state;
  }
}
