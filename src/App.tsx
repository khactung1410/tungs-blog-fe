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
  useEffect(() => {
    const snowContainer = document.createElement('div');
    snowContainer.classList.add('snow-container');
    document.body.appendChild(snowContainer);

    const particlesPerThousandPixels = 0.1;
    const fallSpeed = 1.25;
    const pauseWhenNotActive = true;
    const maxSnowflakes = 200;
    const snowflakes: HTMLDivElement[] = [];

    let snowflakeInterval: NodeJS.Timeout;
    let isTabActive = true;

    function resetSnowflake(snowflake: HTMLDivElement) {
      const size = Math.random() * 5 + 1;
      const viewportWidth = window.innerWidth - size; // Adjust for snowflake size
      const viewportHeight = window.innerHeight;

      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.left = `${Math.random() * viewportWidth}px`; // Constrain within viewport width
      snowflake.style.top = `-${size}px`;

      const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
      snowflake.style.animationDuration = `${animationDuration}s`;
      snowflake.style.animationTimingFunction = 'linear';
      snowflake.style.animationName =
        Math.random() < 0.5 ? 'fall' : 'diagonal-fall';

      setTimeout(() => {
        if (parseInt(snowflake.style.top, 10) < viewportHeight) {
          resetSnowflake(snowflake);
        } else {
          snowflake.remove(); // Remove when it goes off the bottom edge
        }
      }, animationDuration * 1000);
    }

    function createSnowflake() {
      if (snowflakes.length < maxSnowflakes) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflakes.push(snowflake);
        snowContainer.appendChild(snowflake);
        resetSnowflake(snowflake);
      }
    }

    function generateSnowflakes() {
      const numberOfParticles =
        Math.ceil((window.innerWidth * window.innerHeight) / 1000) *
        particlesPerThousandPixels;
      const interval = 5000 / numberOfParticles;

      clearInterval(snowflakeInterval);
      snowflakeInterval = setInterval(() => {
        if (isTabActive && snowflakes.length < maxSnowflakes) {
          requestAnimationFrame(createSnowflake);
        }
      }, interval);
    }

    function handleVisibilityChange() {
      if (!pauseWhenNotActive) return;

      isTabActive = !document.hidden;
      if (isTabActive) {
        generateSnowflakes();
      } else {
        clearInterval(snowflakeInterval);
      }
    }

    generateSnowflakes();

    window.addEventListener('resize', () => {
      clearInterval(snowflakeInterval);
      setTimeout(generateSnowflakes, 1000);
    });

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(snowflakeInterval);
      snowContainer.remove();
    };
  }, []);

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
