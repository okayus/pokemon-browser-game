// ゲーム内のモンスターの型定義
export interface Monster {
  id: number;
  name: string;
  type: MonsterType;
  level: number;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  moves: string[];
}

// モンスターの種類
export type MonsterType = 'fire' | 'water' | 'electric' | 'grass' | 'normal' | 'rock' | 'flying';

// モンスターの簡易情報（リスト表示用）
export interface MonsterSummary {
  id: number;
  name: string;
  type: MonsterType;
  level: number;
}

// ゲーム内プレイヤー情報
export interface PlayerData {
  userId: string;
  monsters: CapturedMonster[];
  items: InventoryItem[];
  progress: GameProgress;
  stats: PlayerStats;
}

// 捕獲済みモンスター
export interface CapturedMonster extends Monster {
  nickname?: string;
  capturedAt: string;
}

// インベントリアイテム
export interface InventoryItem {
  id: number;
  name: string;
  type: 'potion' | 'ball' | 'key' | 'other';
  quantity: number;
}

// ゲーム進行状況
export interface GameProgress {
  currentMapId: number;
  completedMaps: number[];
  visitedLocations: number[];
  unlockedFeatures: string[];
}

// プレイヤー統計
export interface PlayerStats {
  battlesWon: number;
  battlesLost: number;
  monstersCapture: number;
  timePlayed: number; // 秒単位
}

// APIレスポンス型
export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    detail?: string;
  };
}

// ユーザー関連の型をエクスポート
export * from './types/user';

// API型定義をエクスポート
export * from './api';
