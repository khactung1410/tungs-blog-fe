/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useAppSelector } from '../../hooks';
import LandingPage from '../LandingPage';


const StudentsManage: React.FC = () => {
  const isUserLoggedIn = useAppSelector((state: any) => state.authentication.loggedIn);
  return (
    <>
      <p>Student manage</p>
    </>
  );
};

export default StudentsManage;
