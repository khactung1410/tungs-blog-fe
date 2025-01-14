import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { authentication, registration, users, notification, classes, students, questionTypes, questionTopics, multipleChoiceQuestions, attendanceSessions, attendanceStudentRecords } from './redux/reducers';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  notification,
  classes,
  students,
  questionTypes,
  questionTopics,
  multipleChoiceQuestions,
  attendanceSessions,
  attendanceStudentRecords
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true
});
// Định nghĩa các kiểu cho dispatch và state

export type AppState = RootState;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, undefined, any>;
