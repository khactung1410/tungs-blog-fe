import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { authentication, registration, users, alert } from './redux/reducers';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
