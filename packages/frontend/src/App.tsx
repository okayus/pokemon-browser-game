import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import MonsterDetailPage from './pages/MonsterDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="monsters/:id" element={<MonsterDetailPage />} />
            
            {/* 保護されたルート */}
            <Route element={<ProtectedRoute />}>
              <Route path="profile" element={<div>プロフィールページ (作成中)</div>} />
              <Route path="battles" element={<div>バトルページ (作成中)</div>} />
            </Route>
            
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
