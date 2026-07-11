import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useApp } from '../context/AppContext';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { loggedIn } = useApp();
  if (!loggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
