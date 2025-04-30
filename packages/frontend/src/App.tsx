import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MonsterDetailPage from './pages/MonsterDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          {/* 公開ルート */}
          <Route path="/login" element={<LoginPage />} />

          {/* レイアウト付きルート */}
          <Route path="/" element={<Layout />}>
            {/* パブリックページ */}
            <Route index element={<HomePage />} />

            {/* 要認証ページ */}
            <Route element={<ProtectedRoute />}>
              <Route path="monsters/:id" element={<MonsterDetailPage />} />
              {/* 他の要認証ページをここに追加 */}
            </Route>

            {/* 404ページ */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
