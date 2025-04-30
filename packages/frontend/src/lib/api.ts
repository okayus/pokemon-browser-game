// 本来はHono Clientを使用しますが、TypeScriptの型エラーを解決するため
// 一時的に直接fetchを使用するシンプルなAPI関数を実装
import type { Monster, MonsterSummary } from 'shared';

// 環境に応じたベースURLを設定
const API_BASE_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:8787/api'  // 開発環境
  : 'https://api.pokemon-browser-game.workers.dev/api';  // 本番環境

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
