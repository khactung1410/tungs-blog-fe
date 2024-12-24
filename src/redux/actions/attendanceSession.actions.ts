import { attendanceSessionConstants } from "../../constants/attendanceSession.constants";
import { attendanceStudentRecordConstants } from "../../constants/attendanceStudentRecord.constants";
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
        dispatch(failure(error.toString()));
        dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
      }
    };
  };
  

const createAttendanceSession = (classId: number, date: string, studentList: { studentId: number; isPresent: number }[], createdByTeacherId: number, lastUpdatedByTeacherId: number) => {
  return async (dispatch: any) => {
    dispatch(request());

    try {
      const attendanceSession_studentRecords = await attendanceSessionService.create(classId, date, studentList, createdByTeacherId, lastUpdatedByTeacherId);
      const attendanceSession = attendanceSession_studentRecords.session
      const studentRecords = attendanceSession_studentRecords.studentRecords
      dispatch(success(attendanceSession));
      dispatch(successStudentRecords(studentRecords));
      dispatch(notificationActions.addNotification('Điểm danh thành công!', 'SUCCESS'));
    } catch (error: any) {
      dispatch(failure(error.toString()));
      dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
    }
  };

  function request() {
    return { type: attendanceSessionConstants.CREATE_REQUEST, payload: { classId, date, studentList } };
  }
  function success(attendanceSession: any) {
    return { type: attendanceSessionConstants.CREATE_SUCCESS, payload: attendanceSession };
  }
  function successStudentRecords(attendanceStudentRecords: any) {
    return { type: attendanceStudentRecordConstants.ADD_NEW_STUDENT_RECORDS_SUCCESS, payload: attendanceStudentRecords }
  };
  function failure(error: any) {
    return { type: attendanceSessionConstants.CREATE_FAILURE, error };
  }
};

const updateAttendanceSession = (attendanceSessionId: number, date: string, studentList: { studentId: number; isPresent: number }[], lastUpdatedByTeacherId: number) => {
  return async (dispatch: any) => {
    dispatch(request());

    try {
      const updatedAttendanceSession_updatedStudentRecords = await attendanceSessionService.update(attendanceSessionId, date, studentList, lastUpdatedByTeacherId);
      const updatedAttendanceSession = updatedAttendanceSession_updatedStudentRecords.updatedSession
      const updatedStudentRecords = updatedAttendanceSession_updatedStudentRecords.updatedStudentRecords
      dispatch(success(updatedAttendanceSession));
      dispatch(successStudentRecords(updatedStudentRecords));
      dispatch(notificationActions.addNotification('Sửa điểm danh thành công!', 'SUCCESS'));
    } catch (error: any) {
      dispatch(failure(error.toString()));
      dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
    }
  };

  function request() {
    return { type: attendanceSessionConstants.UPDATE_REQUEST, payload: { attendanceSessionId, date, studentList } };
  }
  function success(updatedAttendanceSession: any) {
    return { type: attendanceSessionConstants.UPDATE_SUCCESS, payload: updatedAttendanceSession };
  }
  function successStudentRecords(attendanceStudentRecords: any) {
    return { type: attendanceStudentRecordConstants.UPDATE_NEW_STUDENT_RECORDS_SUCCESS, payload: attendanceStudentRecords }
  };
  function failure(error: any) {
    return { type: attendanceSessionConstants.UPDATE_FAILURE, error };
  }
};


export const attendanceActions = {
    getAllAttendanceSessions, 
    createAttendanceSession,
    updateAttendanceSession,
};