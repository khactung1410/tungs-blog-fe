import React from 'react';
import {
  Routes,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
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
import StudentPage from './components/StudentPage';
import TuitionManage from './components/TuitionManage';

export const AppWrapper = styled.div`
  position: relative;
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
    <Router>
      <AppWrapper>
        <SnowContainer className="snow-container" />
        <NotificationContainer />
        <Routes>
          {/* Các route không có Header */}
          <Route path="/" element={<HomePage />} />
          <Route path={pathConstants.LOGIN} element={<LoginPage />} />
          <Route path={pathConstants.STUDENT_PAGE} element={<StudentPage />} />

          {/* Các route có Header - được khai báo trong AppWithHeader */}
          <Route path={pathConstants.MATCH_WORD_MEANING} element={<AppWithHeader><MatchWordMeaning /></AppWithHeader>} />
          <Route path={pathConstants.CLASSES_MANAGE} element={<AppWithHeader><ClassesManage /></AppWithHeader>} />
          <Route path={pathConstants.STUDENTS_MANAGE} element={<AppWithHeader><StudentsManage /></AppWithHeader>} />
          <Route path={`${pathConstants.STUDENTS_MANAGE}/:id`} element={<AppWithHeader><StudentInformation /></AppWithHeader>} />
          <Route path={pathConstants.QUESTIONS_MANAGE} element={<AppWithHeader><QuestionsManage /></AppWithHeader>} />
          <Route path={pathConstants.RANDOM_TEAM} element={<AppWithHeader><RandomTeamPage /></AppWithHeader>} />
          <Route path={pathConstants.FLASHCARD_PDF_CREATE} element={<AppWithHeader><FlashCardPDF /></AppWithHeader>} />
          <Route path={pathConstants.ATTENDANCE_MANAGE} element={<AppWithHeader><AttendanceManage /></AppWithHeader>} />
          <Route path={pathConstants.TUITION_MANAGE} element={<AppWithHeader><TuitionManage /></AppWithHeader>} />
          <Route path={pathConstants.SIGNUP} element={<AppWithHeader><SignupPage /></AppWithHeader>} />
        </Routes>
      </AppWrapper>
    </Router>
  );
};

const AppWithHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default App;
