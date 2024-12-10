import { attendanceSessionConstants } from '../../constants';

const initialAttendanceSessionsState = {
    attendanceSessionsList: [] as any[],
};

export function attendanceSessions(state = initialAttendanceSessionsState, action: any) {
  switch (action.type) {
    case attendanceSessionConstants.GETALL_REQUEST:
      return { loading: true };
    case attendanceSessionConstants.GETALL_SUCCESS:
      return { ...state, attendanceSessionsList: action.payload };
    case attendanceSessionConstants.GETALL_FAILURE:
      return { error: action.payload };    
    case attendanceSessionConstants.CREATE_SUCCESS:
      return { attendanceSessionsList: [...state.attendanceSessionsList, action.payload] };
    case attendanceSessionConstants.DELETE_SUCCESS:
      return { 
        ...state, 
        attendanceSessionsList: state.attendanceSessionsList.filter(session => session.id !== action.payload)
      };
    case attendanceSessionConstants.UPDATE_SUCCESS:
      return { 
        ...state, 
        attendanceSessionsList: state.attendanceSessionsList.map(session =>
            session.id === action.payload.id ? action.payload : session
        ),
      };
    default:
      return state;
  }
}
