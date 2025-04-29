import { ApiResponse, Monster, MonsterSummary } from '..';
/**
 * API型定義
 * Hono RPCで利用する型定義
 *
 */

// モンスター関連API
export type MonstersApi = {
  // モンスター一覧取得
  'GET /monsters': {
    response: ApiResponse<{
      monsters: MonsterSummary[];
      count: number;
    }>;
  };
  // モンスター詳細取得
  'GET /monsters/:id': {
    param: { id: string };
    response: ApiResponse<{
      monster: Monster;
    }>;
  };
};

// ユーザー関連API
export type UserApi = {
  // ユーザープロフィール取得
  'GET /user/profile': {
    response: ApiResponse<{
      profile: {
        id: string;
        displayName: string;
        avatarUrl?: string;
      };
    }>;
  };
  // ユーザープロフィール更新
  'PUT /user/profile': {
    json: {
      displayName?: string;
      avatarUrl?: string;
    };

    response: ApiResponse<{
      success: boolean;
    }>;
  };
};

// ゲームプレイ関連API
export type GameplayApi = {
  // プレイヤーデータ取得
  'GET /gameplay/player-data': {
    response: ApiResponse<{
      playerId: string;
      monsters: {
        id: number;
        name: string;
        type: string;
        level: number;
      }[];
      inventory: {
        id: number;
        name: string;
        type: string;
        quantity: number;
      }[];
    }>;
  };
  // ゲーム進行状況保存
  'POST /gameplay/save': {
    json: {
      position: { x: number; y: number; mapId: number };
      monsters: { id: number; experience: number; hp: number }[];
      inventory: { id: number; quantity: number }[];
    };
    response: ApiResponse<{
      success: boolean;
      savedAt: string;
    }>;
  };
};

// 合成型としてAPIを定義
export type Api = MonstersApi & UserApi & GameplayApi;
