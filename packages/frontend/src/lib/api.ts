// 本来はHono Clientを使用しますが、TypeScriptの型エラーを解決するため
// 一時的に直接fetchを使用するシンプルなAPI関数を実装
import type { Monster, MonsterSummary } from 'shared';
import { useAuth } from '../contexts/AuthContext';

// 環境に応じたベースURLを設定
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8787/api';

/**
 * 認証付きリクエストを送信する
 * @param endpoint エンドポイント
 * @param options FetchのOptions
 * @returns レスポンス
 */
export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const { getIdToken } = useAuth();
  
  // 認証トークンを取得
  const token = await getIdToken();
  
  // ヘッダーにトークンを追加
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };
  
  // リクエスト送信
  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
};

// APIクライアント関数
const api = {
  // モンスターリスト取得
  async getMonsters(): Promise<{ monsters: MonsterSummary[], count: number } | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/monsters`);
      const data = await response.json();
      
      if (response.ok && data.data) {
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching monsters:', error);
      return null;
    }
  },
  
  // モンスター詳細取得
  async getMonsterById(id: string): Promise<{ monster: Monster } | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/monsters/${id}`);
      const data = await response.json();
      
      if (response.ok && data.data) {
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching monster details:', error);
      return null;
    }
  },
  
  // ユーザープロフィール取得 (認証必須)
  async getUserProfile(): Promise<any> {
    try {
      const { getIdToken } = useAuth();
      const token = await getIdToken();
      
      if (!token) {
        throw new Error('認証が必要です');
      }
      
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (response.ok && data.data) {
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  },
  
  // ヘルスチェック
  async checkHealth(): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'error', error: String(error) };
    }
  }
};

export { api, API_BASE_URL };
