/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  unstable_HistoryRouter as HistoryBrowerRouter
} from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { history, ProtectedRoute } from './helpers';
import NotificationContainer from './components/Notification/NotificationContainer';
import Header from './components/Header';
import { pathConstants } from './constants';
import Blog from './components/Blog/Blog';

export const AppWrapper = styled.div`
  position: relative;
  min-height: 400px;
`;

const App: React.FC = () => {
  return (
    <div>
      <NotificationContainer />
      <HistoryBrowerRouter history={history}>
        <Header />
        <Routes>
          <Route path={pathConstants.ROOT} element={<HomePage />} />
          <Route path={pathConstants.LOGIN} element={<LoginPage />} />
          <Route path={pathConstants.SIGNUP} element={<SignupPage />} />
          <Route
            path={pathConstants.BLOG_CREATE}
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HistoryBrowerRouter>
    </div>
  );
};

export default App;
