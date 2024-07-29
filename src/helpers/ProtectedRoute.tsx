/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from 'react-router-dom';
import { pathConstants } from '../constants';

export const ProtectedRoute = ({ children }: any) => {
  const token = localStorage.getItem('token');
  if (!token) {
    // user is not authenticated
    return <Navigate to={pathConstants.LOGIN} />;
  }
  return children;
};
