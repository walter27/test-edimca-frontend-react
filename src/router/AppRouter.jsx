import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '../auth';
import { DashboardRoutes } from '../dashboard';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <>
      <Routes>
        {status === 'not-authenticated' ? (
          <Route path='login' element={<LoginPage />} />
        ) : (
          <Route path='/*' element={<DashboardRoutes />} />
        )}
        <Route path='/*' element={<Navigate to='/login' />} />
      </Routes>
    </>
  );
};
