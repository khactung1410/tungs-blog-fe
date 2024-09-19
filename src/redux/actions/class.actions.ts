import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { classConstants, userConstants } from '../../constants';
import { classService, userService } from '../../services';
import { AppDispatch, RootState } from '../../store';
import { notificationActions } from './notification.actions';
import jwtDecode from 'jwt-decode';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface FormData {
    className: string;
    teacherId: string;
    perSessionFee: string;
    perMonthFee: string;
    notes: string;
    id: number | null;
}

const getAll = () => {
  return async (dispatch: any) => {
    const request = (classObj: any) => {
      return { type: classConstants.GETALL_REQUEST, payload: classObj };
    };
    const success = (classes: any) => {
      return { type: classConstants.GETALL_SUCCESS, payload: classes };
    };
    const failure = (classObj: any) => {
      return { type: classConstants.GETALL_FAILURE, payload: classObj };
    };

    try {
      classService.getAll().then(
        (classes: any) => {
          dispatch(success(classes));
        },
        (error: any) => {
          dispatch(failure(error.toString()));
          dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
        }
      );
    } catch (error: any) {
      dispatch(failure(error.toString()));
      dispatch(notificationActions.addNotification('Error when GET_ALL_CLASSES!', 'DANGER'));
    }
  };
}

const createClass = (formData: any) => {
  return (dispatch: any) => {
    dispatch(request(formData));

    classService.create(formData).then(
      (classObj: any) => {
        dispatch(success(classObj));
        dispatch(notificationActions.addNotification('Create Class Successfully!', 'SUCCESS'));
      },
      (error: any) => {
        dispatch(failure(error.toString()));
        dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
      }
    );
  };

  function request(classObj: any) {
    return { type: classConstants.CREATE_REQUEST, payload: classObj };
  }
  function success(classObj: any) {
    return { type: classConstants.CREATE_SUCCESS, payload: classObj };
  }
  function failure(error: any) {
    return { type: classConstants.CREATE_FAILURE, error };
  }
};

const deleteClass = (classId: any) => {
  return (dispatch: any) => {
    dispatch(request(classId));
    classService.remove(classId).then(
      () => {
        dispatch(success(classId));
        dispatch(notificationActions.addNotification('Delete Class Successfully!', 'SUCCESS'));
      },
      (error: any) => {
        dispatch(failure(error.toString()));
        dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
      }
    );
  };

  function request(classId: number) {
    return { type: classConstants.DELETE_REQUEST, payload: classId };
  }
  function success(deletedClassId: number) {
    return { type: classConstants.DELETE_SUCCESS, payload: deletedClassId };
  }
  function failure(error: any) {
    return { type: classConstants.DELETE_FAILURE, error };
  }
};

const updateClass = (formData: any) => {
  return (dispatch: any) => {
    dispatch(request(formData));

    classService.update(formData).then(
      (updatedClassObj: any) => {
        dispatch(success(updatedClassObj));
        dispatch(notificationActions.addNotification('Update Class Successfully!', 'SUCCESS'));
      },
      (error: any) => {
        dispatch(failure(error.toString()));
        dispatch(notificationActions.addNotification(error.toString(), 'DANGER'));
      }
    );
  };

  function request(updatingClassObj: any) {
    return { type: classConstants.UPDATE_REQUEST, payload: updatingClassObj };
  }
  function success(updatedClassObj: any) {
    return { type: classConstants.UPDATE_SUCCESS, payload: updatedClassObj };
  }
  function failure(error: any) {
    return { type: classConstants.UPDATE_FAILURE, error };
  }
};

export const classActions = {
    getAll, 
    createClass, 
    updateClass,
    deleteClass
};
