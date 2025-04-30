// 本来はHono Clientを使用しますが、TypeScriptの型エラーを解決するため
// 一時的に直接fetchを使用するシンプルなAPI関数を実装
import type { Monster, MonsterSummary } from 'shared';
import { auth } from './firebase';

// 環境に応じたベースURLを設定
const API_BASE_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:8787/api'  // 開発環境
  : 'https://api.pokemon-browser-game.workers.dev/api';  // 本番環境

// 認証ヘッダーの取得
const getAuthHeaders = async (): Promise<HeadersInit> => {
  const user = auth.currentUser;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (user) {
    try {
      const token = await user.getIdToken();
      headers['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
  }

  return headers;
};

// APIクライアント関数
const api = {
  // モンスターリスト取得
  async getMonsters(): Promise<{ monsters: MonsterSummary[], count: number } | null> {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/monsters`, { headers });
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
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/monsters/${id}`, { headers });
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
  
  // ヘルスチェック
  async checkHealth(): Promise<any> {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/health`, { headers });
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'error', error: String(error) };
    }
  },

  // ユーザープロフィール取得
  async getUserProfile(): Promise<any> {
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(`${API_BASE_URL}/user/profile`, { headers });
      const data = await response.json();
      
      if (response.ok && data.data) {
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }
};

export { api, API_BASE_URL };
