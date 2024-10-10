import { questionTopicConstants } from '../../constants';

const initialQuestionTopicsState = {
  questionTopicList: [] as any[],
  loading: false
};

export function questionTopics(state = initialQuestionTopicsState, action: any) {
  switch (action.type) {
    case questionTopicConstants.GETALL_REQUEST:
      return { loading: true };
    case questionTopicConstants.GETALL_SUCCESS:
      return { ...state, loading: false, questionTopicList: action.payload };
    case questionTopicConstants.GETALL_FAILURE:
      return { error: action.payload };
    default:
      return state;
  }
}
