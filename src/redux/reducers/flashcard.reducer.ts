// src/redux/reducer.ts
import { AnyAction } from 'redux';
import { SUBMIT_REQUEST, SUBMIT_SUCCESS, SUBMIT_FAILURE } from '../actions/flashcard.actions'

interface State {
  loading: boolean;
  fileUrl: string | null;
  error: string | null;
}

const initialState: State = {
  loading: false,
  fileUrl: null,
  error: null
};

const reducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case SUBMIT_REQUEST:
      return { ...state, loading: true, error: null };
    case SUBMIT_SUCCESS:
      return { ...state, loading: false, fileUrl: action.payload };
    case SUBMIT_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export type RootState = State; // Xuất RootState

export default reducer;
