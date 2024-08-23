/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useAppSelector } from '../../hooks';
import LandingPage from '../LandingPage';


const HomePage: React.FC = () => {
  const isUserLoggedIn = useAppSelector((state: any) => state.authentication.loggedIn);
  return (
    <>
      {!isUserLoggedIn && (
        <LandingPage />
      )}
      {isUserLoggedIn && (
        <LandingPage />
    )}
    </>
  );
};

export default HomePage;
