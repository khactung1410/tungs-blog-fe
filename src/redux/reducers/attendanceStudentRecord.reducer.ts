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
    case attendanceStudentRecordConstants.ADD_NEW_STUDENT_RECORDS_SUCCESS:
      const updatedAttendanceStudentRecordsList = [...state.attendanceStudentRecordsList, ...action.payload]
      return { ...state, attendanceStudentRecordsList: updatedAttendanceStudentRecordsList };
    case attendanceStudentRecordConstants.UPDATE_NEW_STUDENT_RECORDS_SUCCESS:
      return { ...state,
        attendanceStudentRecordsList: state.attendanceStudentRecordsList.map((record: { id: any; }) => {
          const updatedRecord = action.payload.find((newRecord: { id: any; }) => newRecord.id === record.id)
          return updatedRecord ? updatedRecord : record
        }) 
      };
    case attendanceStudentRecordConstants.GET_BY_MONTH_FAILURE:
      return { error: action.payload };    
    default:
      return state;
  }
}
