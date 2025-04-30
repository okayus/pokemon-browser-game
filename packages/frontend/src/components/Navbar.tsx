import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginButton from './auth/LoginButton';
import UserProfile from './auth/UserProfile';

const Navbar = () => {
  const { authState } = useAuth();

  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">ポケモンライクゲーム</Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-200 transition">ホーム</Link>
          
          {authState.isAuthenticated && (
            <>
              <Link to="/monsters" className="hover:text-blue-200 transition">
                モンスター図鑑
              </Link>
              <Link to="/profile" className="hover:text-blue-200 transition">
                マイページ
              </Link>
            </>
          )}

          <div>
            {authState.isLoading ? (
              // ローディング中表示
              <div className="w-8 h-8 rounded-full animate-pulse bg-blue-500"></div>
            ) : (
              <>
                {authState.isAuthenticated ? (
                  <UserProfile />
                ) : (
                  <LoginButton />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
