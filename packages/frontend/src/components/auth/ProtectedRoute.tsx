import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  redirectTo?: string;
}

/**
 * 認証が必要なルートを保護するコンポーネント
 * 認証されていない場合は指定されたパスにリダイレクトする
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
}) => {
  const { authState } = useAuth();
  const location = useLocation();

  // 認証状態のロード中はローディング表示
  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // 認証されていない場合はリダイレクト
  if (!authState.isAuthenticated) {
    // 現在のパスを state に保存して、ログイン後に戻れるようにする
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // 認証されている場合は子要素を表示
  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
