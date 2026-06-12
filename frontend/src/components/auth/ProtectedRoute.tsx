import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'wouter';
import { LoadingScreen } from '../ui/LoadingScreen';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return <LoadingScreen fullScreen text="Authenticating..." />;
  }

  if (!user) {
    setLocation('/login');
    return null;
  }

  return <Component />;
};
