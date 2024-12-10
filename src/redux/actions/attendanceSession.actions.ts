import { attendanceSessionConstants } from "../../constants/attendanceSession.constants";
import { attendanceSessionService } from "../../services/attendanceSession.service";
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
  
  const getAllAttendanceSessions = () => {
    return async (dispatch: any) => {
      const request = () => ({ type: attendanceSessionConstants.GETALL_REQUEST });
      const success = (attendanceSessions: any) => ({ type: attendanceSessionConstants.GETALL_SUCCESS, payload: attendanceSessions });
      const failure = (error: any) => ({ type: attendanceSessionConstants.GETALL_FAILURE, payload: error });
  
      try {
        const attendanceSessions = await attendanceSessionService.getAll();
        dispatch(success(attendanceSessions));
      } catch (error: any) {
        console.log(3333)
        dispatch(failure(error.toString()));
        dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
      }
    };
  };
  

const createAttendanceSession = (classId: number, date: string, studentList: { studentId: number; isPresent: number }[], createdByTeacherId: number, lastUpdatedByTeacherId: number) => {
  return async (dispatch: any) => {
    dispatch(request());

    try {
      const attendanceSession = await attendanceSessionService.create(classId, date, studentList, createdByTeacherId, lastUpdatedByTeacherId);
      console.log(studentList)
      dispatch(success());
      dispatch(notificationActions.addNotification('Điểm danh thành công!', 'SUCCESS'));
    } catch (error: any) {
      dispatch(failure(error.toString()));
      dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
    }
  };

  function request() {
    return { type: attendanceSessionConstants.CREATE_REQUEST, payload: { classId, date, studentList } };
  }
  function success() {
    return { type: attendanceSessionConstants.CREATE_SUCCESS, payload: { classId, date, studentList } };
  }
  function failure(error: any) {
    return { type: attendanceSessionConstants.CREATE_FAILURE, error };
  }
};


export const attendanceActions = {
    getAllAttendanceSessions, 
    createAttendanceSession,
};