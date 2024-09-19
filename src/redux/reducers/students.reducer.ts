import { studentConstants } from '../../constants';

const initialStudentsState = {
  studentsList: [] as any[],
};

export function students(state = initialStudentsState, action: any) {
  switch (action.type) {
    case studentConstants.GETALL_REQUEST:
      return { loading: true };
    case studentConstants.GETALL_SUCCESS:
      return { ...state, studentsList: action.payload };
    case studentConstants.GETALL_FAILURE:
      return { error: action.payload };
    case studentConstants.CREATE_SUCCESS:
      return { studentsList: [...state.studentsList, action.payload] };
    case studentConstants.DELETE_SUCCESS:
      return { 
        ...state, 
        studentsList: state.studentsList.filter(student => student.id !== action.payload)
      };
    case studentConstants.UPDATE_SUCCESS:
      return { 
        ...state, 
        studentsList: state.studentsList.map(student =>
          student.id === action.payload.id ? action.payload : student
        ),
      };
    default:
      return state;
  }
}
