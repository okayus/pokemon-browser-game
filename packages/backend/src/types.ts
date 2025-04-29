// Cloudflare Workers環境変数の型定義
export interface Env {
  // 環境変数
  NODE_ENV: string;
  
  // D1データベース（Cloudflare）
  DB: D1Database;
  
  // KVストア（Cloudflare）
  GAME_STORE: KVNamespace;
}

// ユーザー関連の型
export interface User {
  id: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

// ゲームキャラクター関連の型
export interface Character {
  id: number;
  name: string;
  type: string;
  level: number;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  imageUrl?: string;
}

// API共通レスポンス型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
