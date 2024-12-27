import { attendanceSessionConstants } from "../../constants/attendanceSession.constants";
import { attendanceStudentRecordConstants } from "../../constants/attendanceStudentRecord.constants";
import { attendanceSessionService } from "../../services/attendanceSession.service";
import { attendanceStudentRecordService } from "../../services/attendanceStudentRecord.service";
import { notificationActions } from "./notification.actions";

// attendanceActions.ts
interface AttendanceSessionAttributes {
    id: number;
    classId: number;
    date: Date;
    createdByTeacherId: number;
    lastUpdatedByTeacherId: number;
    note?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  const getAttendanceStudentRecordByMonth = (year: any, month: any) => {
    return async (dispatch: any) => {
      const request = () => ({ type: attendanceStudentRecordConstants.GET_BY_MONTH_REQUEST });
      const success = (attendanceStudentRecords: any) => ({ type: attendanceStudentRecordConstants.GET_BY_MONTH_SUCCESS, payload: attendanceStudentRecords });
      const failure = (error: any) => ({ type: attendanceStudentRecordConstants.GET_BY_MONTH_FAILURE, payload: error });
  
      try {
        const attendanceStudentRecords = await attendanceStudentRecordService.getByMonth(year, month);
        dispatch(success(attendanceStudentRecords));
      } catch (error: any) {
        console.log(error)
        dispatch(failure(error.toString()));
        dispatch(notificationActions.addNotification('dòng 30' + error.toString(), 'DANGER'));
      }
    };
  };


export const attendanceStudentRecordActions = {
    getAttendanceStudentRecordByMonth, 
};