/**
 * ユーザー関連の型定義
 */

/**
 * ユーザープロフィール基本情報
 */
export interface UserProfile {
  uid: string;           // Firebase Auth UID
  displayName: string | null;  // 表示名
  email: string | null;  // メールアドレス
  photoURL: string | null;  // プロフィール画像URL
  createdAt: number;     // 作成日時（Unix Timestamp）
}

/**
 * ゲーム内プロフィール
 */
export interface GameProfile {
  uid: string;           // Firebase Auth UID (外部キー)
  nickname: string;      // ゲーム内ニックネーム
  avatarId: string;      // アバターID
  level: number;         // レベル
  experience: number;    // 経験値
  lastLogin: number;     // 最終ログイン日時（Unix Timestamp）
  createdAt: number;     // 作成日時（Unix Timestamp）
  updatedAt: number;     // 更新日時（Unix Timestamp）
}

/**
 * 認証状態を表す型
 */
export interface AuthState {
  isAuthenticated: boolean;  // 認証済みかどうか
  isLoading: boolean;        // 認証状態ロード中かどうか
  user: UserProfile | null;  // ユーザー情報
}
