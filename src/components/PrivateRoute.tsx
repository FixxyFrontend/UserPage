import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
 
  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
