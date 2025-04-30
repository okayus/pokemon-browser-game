import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginButton from '../components/auth/LoginButton';

const LoginPage: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ログイン後のリダイレクト先
  const from = (location.state as any)?.from?.pathname || '/';

  // 認証状態が変わったらリダイレクト
  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [authState.isAuthenticated, navigate, from]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ポケモンブラウザーゲーム
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            モンスターを捕まえて育成し、バトルで勝利しよう！
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            <div className="flex flex-col items-center">
              <p className="mb-4 text-gray-700">
                ゲームをプレイするにはログインが必要です
              </p>
              <LoginButton className="w-full" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">
                ゲーム情報
              </span>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>ポケモンライクなブラウザゲーム</p>
            <p className="mt-1">TypeScriptフルスタック学習プロジェクト</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
