import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { authentication, registration, users, notification } from './redux/reducers';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  notification
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
