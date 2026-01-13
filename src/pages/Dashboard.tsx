import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import UserDashboard from './UserDashboard';
import AssessorDashboard from './AssessorDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'assessor':
      return <AssessorDashboard />;
    default:
      return <UserDashboard />;
  }
};

export default Dashboard;
