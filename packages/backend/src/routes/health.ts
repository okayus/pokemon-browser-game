import { Hono } from 'hono';

// 型定義
type Bindings = {
  DB?: D1Database;
  GAME_STORE?: KVNamespace;
};

// ヘルスチェックルーター
const health = new Hono<{ Bindings: Bindings }>();

// ヘルスチェックエンドポイント
health.get('/', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'API Server is running correctly'
  });
});

export default health;
