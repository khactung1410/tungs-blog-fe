/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: any) => {
  const user = localStorage.getItem('user');
  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};
