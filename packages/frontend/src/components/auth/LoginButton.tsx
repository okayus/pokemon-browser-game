import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginButtonProps {
  className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ className = '' }) => {
  const { authState, signInWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Login failed:', error);
      // エラー処理（必要に応じてToastなどで表示）
    }
  };

  // 既にログイン済み、またはロード中の場合はボタンを表示しない
  if (authState.isAuthenticated || authState.isLoading) {
    return null;
  }

  return (
    <button
      onClick={handleLogin}
      className={`px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors ${className}`}
      disabled={authState.isLoading}
    >
      <div className="flex items-center justify-center">
        <svg
          className="w-5 h-5 mr-2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
            fill="currentColor"
          />
        </svg>
        <span>Googleでログイン</span>
      </div>
    </button>
  );
};

export default LoginButton;
