import React, { useEffect } from 'react';
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
import FlashCardPDF from './components/FlashCardPDF/FlashCardPDF';
import RandomTeamPage from './components/RandomTeamPage';
import MatchWordMeaning from './components/MatchWordMeaning/MatchWordMeaning';
import ClassesManage from './components/ClassesManage';
import StudentsManage from './components/StudentsManage';
import StudentInformation from './components/StudentsManage/StudentInformation';
import QuestionsManage from './components/QuestionsManage';
import AttendanceManage from './components/AttendanceManage/AttendanceManage';

export const AppWrapper = styled.div`
  position: relative;
  margin-left: 250px; /* Đặt lề trái để tránh đè lên menu */
  min-height: 400px;
`;

const SnowContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  z-index: 99999;
  pointer-events: none;
`;

const App: React.FC = () => {

  return (
    <AppWrapper>
      <SnowContainer className="snow-container" />
      <NotificationContainer />
      <Router>
        <Header />
        <Routes>
          <Route path={pathConstants.ROOT} element={<HomePage />} />
          <Route path={pathConstants.LOGIN} element={<LoginPage />} />
          <Route path={pathConstants.SIGNUP} element={<SignupPage />} />
          <Route
            path={pathConstants.MATCH_WORD_MEANING}
            element={
              <ProtectedRoute>
                <MatchWordMeaning />
              </ProtectedRoute>
            }
          />
          <Route
            path={pathConstants.CLASSES_MANAGE}
            element={
              <ProtectedRoute>
                <ClassesManage />
              </ProtectedRoute>
            }
          />
          <Route
            path={pathConstants.STUDENTS_MANAGE}
            element={
              <ProtectedRoute>
                <StudentsManage />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${pathConstants.STUDENTS_MANAGE}/:id`}
            element={
              <ProtectedRoute>
                <StudentInformation />
              </ProtectedRoute>
            }
          />
          <Route
            path={pathConstants.QUESTIONS_MANAGE}
            element={
              <ProtectedRoute>
                <QuestionsManage />
              </ProtectedRoute>
            }
          />
          <Route
            path={pathConstants.RANDOM_TEAM}
            element={
              <ProtectedRoute>
                <RandomTeamPage />
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
          <Route
            path={pathConstants.ATTENDANCE_MANAGE}
            element={
              <ProtectedRoute>
                <AttendanceManage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppWrapper>
  );
};

export default App;
