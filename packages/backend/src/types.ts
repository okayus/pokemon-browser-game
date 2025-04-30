import { UserProfile } from 'shared';

// Hono環境変数の型定義
export type Bindings = {
  DB?: D1Database;
  GAME_STORE?: KVNamespace;
  NODE_ENV?: string;
  FIREBASE_PROJECT_ID?: string;
  FIREBASE_CLIENT_EMAIL?: string;
  FIREBASE_PRIVATE_KEY?: string;
  ALLOWED_ORIGINS?: string;
};

// Honoコンテキストの型拡張
declare module 'hono' {
  // 認証済みユーザー情報の型
  interface ContextVariableMap {
    user?: AuthUser;
  }
}

// アプリケーション全体で使用する環境型
export type Env = {
  Bindings: Bindings;
};

// 認証ユーザーの型定義
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

// ユーザープロフィールのDBスキーマ
export interface UserProfileDB {
  uid: string; // Firebase Auth UID
  nickname: string;
  avatarId: string;
  level: number;
  experience: number;
  lastLogin: number; // Unix timestamp
  createdAt: number; // Unix timestamp
  updatedAt: number; // Unix timestamp
}

// 内部で使用するユーザープロフィール型（AuthUserとUserProfileDBを結合）
export interface UserProfileFull extends AuthUser, UserProfileDB {}

// APIレスポンスのユーザープロフィール
export interface UserProfileResponse extends UserProfile {
  gameProfile: {
    nickname: string;
    avatarId: string;
    level: number;
    experience: number;
  };
}
