/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from 'react-router-dom';
import { pathConstants } from '../constants';

export const ProtectedRoute = ({ children }: any) => {
  const accessToken = localStorage.getItem('accessToken'); 
  if (!accessToken) {
    // Nếu không có accessToken, người dùng không được phép truy cập
    return <Navigate to={pathConstants.LOGIN} />;
  }
  return children;
};
