/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from 'react-router-dom';
import { pathConstants } from '../constants';

export const ProtectedRoute = ({ children }: any) => {
  const user = localStorage.getItem('user');
  if (!user) {
    // user is not authenticated
    return <Navigate to={pathConstants.LOGIN} />;
  }
  return children;
};
