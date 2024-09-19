import { classConstants } from '../../constants';

const initialClassesState = {
  classesList: [] as any[]
};

export function classes(state = initialClassesState, action: any) {
  switch (action.type) {
    case classConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case classConstants.GETALL_SUCCESS:
      return {
        ...state,
        classesList: action.payload
      };
    case classConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case classConstants.CREATE_SUCCESS:
      return {
        ...state,
        classesList: [...state.classesList, action.payload]
      };
    case classConstants.DELETE_SUCCESS:
      return {
        ...state,
        classesList: state.classesList.filter(cls => cls.id !== action.payload)
      };
    case classConstants.UPDATE_SUCCESS:
      return {
        ...state,
        classesList: state.classesList.map(cls =>
          cls.id === action.payload.id ? action.payload : cls
        ),
      };
    default:
      return state;
  }
}
