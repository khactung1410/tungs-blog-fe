import React from 'react';
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter as Router,
} from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { ProtectedRoute } from './helpers';
import NotificationContainer from './components/Notification/NotificationContainer';
import Header from './components/Header';
import { pathConstants } from './constants';
import Blog from './components/Blog/Blog';
import FlashCardPDF from './components/FlashCardPDF/FlashCardPDF';

export const AppWrapper = styled.div`
  position: relative;
  min-height: 400px;
`;

const App: React.FC = () => {
  return (
    <div>
      <NotificationContainer />
      <Router>
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
          <Route
            path={pathConstants.FLASHCARD_PDF_CREATE}
            element={
              <ProtectedRoute>
                <FlashCardPDF />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
