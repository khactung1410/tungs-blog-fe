/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Routes,
  Route,
  Navigate,
  Link,
  unstable_HistoryRouter as HistoryBrowerRouter
} from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import HomePage from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { history, ProtectedRoute } from './helpers';
import { alertActions, logout } from './redux/actions';
import Post from './components/Post/Post';
import { useAppDispatch } from './hooks';

export const AppWrapper = styled.div`
  position: relative;
  min-height: 400px;
`;

const App: React.FC = () => {
  const alert = useSelector((state: any) => state.alert);
  const dispatch = useAppDispatch();

  useEffect(() => {
    history.listen(() => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }, []);

  const onLogout = () => {
    dispatch(logout());
    history.push('./');
  };

  return (
    <>
      {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
      <HistoryBrowerRouter history={history}>
        <nav>
          <Link to="/"> Home </Link>
          <Link to="/login"> Sign in </Link>
          <Link to="/register"> Sign up </Link>
          <Link to="/" onClick={() => onLogout()}>
            Log out
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <Post />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HistoryBrowerRouter>
    </>
  );
};

export default App;
