import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface UserProfileProps {
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ className = '' }) => {
  const { authState, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsDropdownOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
      // エラー処理
    }
  };

  // 認証されていない場合は何も表示しない
  if (!authState.isAuthenticated || !authState.user) {
    return null;
  }

  const { displayName, photoURL } = authState.user;

  return (
    <div className={`relative ${className}`}>
      <button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
          {photoURL ? (
            <img
              src={photoURL}
              alt={displayName || 'User'}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-blue-500 text-white">
              {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
        </div>
        <span className="text-sm font-medium hidden md:block">
          {displayName || 'ゲストユーザー'}
        </span>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-md shadow-xl z-20">
          <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
            <div className="font-semibold">{displayName || 'ゲストユーザー'}</div>
            <div className="text-xs text-gray-500 truncate">
              {authState.user.email || ''}
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
