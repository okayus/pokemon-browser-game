import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import apiRoutes from './routes';
import { Api } from 'shared/src/api';

// 環境型定義 - optional型にして開発環境でもエラーが出ないようにする
type Bindings = {
  DB?: D1Database;
  GAME_STORE?: KVNamespace;
};

// アプリケーションの作成
const app = new Hono<{ Bindings: Bindings }>();

// ミドルウェアの設定
app.use(
  '*',
  logger(),
  cors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://pokemon-browser-game.pages.dev'
    ],
    credentials: true,
  })
);

// ヘルスチェックエンドポイント
app.get('/', (c) => {
  return c.json({
    message: 'Pokemon Browser Game API',
    status: 'OK',
    version: 'v1.0.0',
  });
});

// API ルーティング
app.route('/api', apiRoutes);

// グローバルなエラーハンドラー
app.onError((err, c) => {
  console.error(`${err}`);
  return c.json(
    {
      error: {
        message: 'Internal Server Error',
        detail: process.env.NODE_ENV === 'development' ? `${err}` : undefined,
      },
    },
    500
  );
});

// 404 ハンドラー
app.notFound((c) => {
  return c.json(
    {
      error: {
        message: 'Not Found',
        detail: `Route ${c.req.url} not found`,
      },
    },
    404
  );
});

export default app;
