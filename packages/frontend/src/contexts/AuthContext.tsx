import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  GoogleAuthProvider, 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AuthState, UserProfile } from 'shared';

// 認証コンテキストの型定義
interface AuthContextType {
  authState: AuthState;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

// デフォルト値の作成
const defaultAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// コンテキストの作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// カスタムフックの作成
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Firebase ユーザーから UserProfile への変換
const convertToUserProfile = (user: User): UserProfile => {
  return {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    createdAt: Date.now(),
  };
};

// 認証プロバイダーコンポーネント
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  // Googleでのサインイン
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  // サインアウト
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // IDトークンの取得
  const getIdToken = async (): Promise<string | null> => {
    try {
      const user = auth.currentUser;
      if (!user) return null;
      return await user.getIdToken();
    } catch (error) {
      console.error('Error getting ID token:', error);
      return null;
    }
  };

  // 認証状態の監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // サインイン状態
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: convertToUserProfile(user),
        });
      } else {
        // サインアウト状態
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
      }
    });

    // クリーンアップ
    return () => unsubscribe();
  }, []);

  // コンテキスト値の作成
  const value = {
    authState,
    signInWithGoogle,
    signOut,
    getIdToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
