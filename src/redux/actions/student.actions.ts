import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { studentConstants } from '../../constants';
import { studentService } from '../../services';
import { notificationActions } from './notification.actions';

const getAll = () => {
  return async (dispatch: any) => {
    const request = () => ({ type: studentConstants.GETALL_REQUEST });
    const success = (students: any) => ({ type: studentConstants.GETALL_SUCCESS, payload: students });
    const failure = (error: any) => ({ type: studentConstants.GETALL_FAILURE, payload: error });

    try {
      const students = await studentService.getAll();
      dispatch(success(students));
    } catch (error: any) {
      dispatch(failure(error.toString()));
      dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
    }
  };
};

const createStudent = (formData: any) => {
  return async (dispatch: any) => {
    dispatch(request(formData));

    try {
      const student = await studentService.create(formData);
      dispatch(success(student));
      dispatch(notificationActions.addNotification('Create Student Successfully!', 'SUCCESS'));
    } catch (error: any) {
      dispatch(failure(error.toString()));
      dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
    }
  };

  function request(student: any) {
    return { type: studentConstants.CREATE_REQUEST, payload: student };
  }
  function success(student: any) {
    return { type: studentConstants.CREATE_SUCCESS, payload: student };
  }
  function failure(error: any) {
    return { type: studentConstants.CREATE_FAILURE, error };
  }
};

const deleteStudent = (studentId: any) => {
  return async (dispatch: any) => {
    dispatch(request(studentId));

    try {
      await studentService.remove(studentId);
      dispatch(success(studentId));
      dispatch(notificationActions.addNotification('Delete Student Successfully!', 'SUCCESS'));
    } catch (error: any) {
      dispatch(failure(error.toString()));
      dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
    }
  };

  function request(studentId: number) {
    return { type: studentConstants.DELETE_REQUEST, payload: studentId };
  }
  function success(studentId: number) {
    return { type: studentConstants.DELETE_SUCCESS, payload: studentId };
  }
  function failure(error: any) {
    return { type: studentConstants.DELETE_FAILURE, error };
  }
};

const updateStudent = (formData: any) => {
  return async (dispatch: any) => {
    dispatch(request(formData));

    try {
      const updatedStudent = await studentService.update(formData);
      dispatch(success(updatedStudent));
      dispatch(notificationActions.addNotification('Update Student Successfully!', 'SUCCESS'));
    } catch (error: any) {
      dispatch(failure(error.toString()));
      dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
    }
  };

  function request(student: any) {
    return { type: studentConstants.UPDATE_REQUEST, payload: student };
  }
  function success(student: any) {
    return { type: studentConstants.UPDATE_SUCCESS, payload: student };
  }
  function failure(error: any) {
    return { type: studentConstants.UPDATE_FAILURE, error };
  }
};
const addStudentListFromGoogleSheet = () => {
  return async (dispatch: any) => {
    const request = () => ({ type: studentConstants.ADD_FROM_GG_SHEET_REQUEST });
    const success = (studentList: any) => ({ type: studentConstants.ADD_FROM_GG_SHEET_SUCCESS, payload: studentList });
    const failure = (error: any) => ({ type: studentConstants.ADD_FROM_GG_SHEET_FAILURE, payload: error });

    try {
      const studentList = await studentService.addListFromGoogleSheet();
      dispatch(notificationActions.addNotification('Thành công: Cập nhật danh sách học sinh', 'SUCCESS'));
      dispatch(success(studentList));
    } catch (error: any) {
      dispatch(failure(error.toString()));
      dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
    }
  };
};

export const studentActions = {
  getAll,
  createStudent,
  deleteStudent,
  updateStudent,
  addStudentListFromGoogleSheet
};
