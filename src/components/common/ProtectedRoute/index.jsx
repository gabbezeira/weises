import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import LoadingScreen from '../../ui/LoadingScreen';

const ProtectedRoute = ({ children, requiredRole, ignorePasswordChange = false }) => {
  const { isAuthenticated, profile, loading, mustChangePassword } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (mustChangePassword && !ignorePasswordChange) {
    return <Navigate to="/change-password" replace />;
  }

  if (requiredRole && profile?.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
