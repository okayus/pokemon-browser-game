import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  redirectTo?: string;
}

/**
 * 認証が必要なルートを保護するコンポーネント
 * 認証されていない場合はリダイレクトします
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
}) => {
  const { authState } = useAuth();
  const location = useLocation();

  // ロード中は何も表示しない
  if (authState.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 認証されていない場合はリダイレクト
  if (!authState.isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // 認証済みの場合は子要素を表示
  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
