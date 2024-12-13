import { attendanceStudentRecordConstants } from '../../constants/attendanceStudentRecord.constants';

const initialAttendanceStudentRecordsState = {
    attendanceStudentRecordsList: [] as any[],
};

export function attendanceStudentRecords(state = initialAttendanceStudentRecordsState, action: any) {
  switch (action.type) {
    case attendanceStudentRecordConstants.GET_BY_MONTH_REQUEST:
      return { loading: true };
    case attendanceStudentRecordConstants.GET_BY_MONTH_SUCCESS:
      return { ...state, attendanceStudentRecordsList: action.payload };
    case attendanceStudentRecordConstants.GET_BY_MONTH_FAILURE:
      return { error: action.payload };    
    default:
      return state;
  }
}
