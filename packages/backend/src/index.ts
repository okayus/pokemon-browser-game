import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';

import apiRoutes from './routes';
// エクスポートされたBindings型をインポート
import type { Bindings } from './types';

// 環境型定義は削除（Honoの型引数で指定するため）
// type Bindings = { ... }; // 削除

// アプリケーションの作成 (型引数を修正)
const app = new Hono<{ Bindings: Bindings }>();

// ... (ミドルウェア、ルート設定などはそのまま) ...
app.use(
  '*',
  logger(),
  cors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://pokemon-browser-game.pages.dev',
    ],
    credentials: true,
  })
);

// ヘルスチェックエンドポイント
app.get('/', c => {
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
  // c.env.NODE_ENV を c.env.Bindings.NODE_ENV に変更する必要があるか確認
  // Honoの型拡張により c.env.NODE_ENV でアクセスできるはず
  return c.json(
    {
      error: {
        message: 'Internal Server Error',
        detail: c.env.NODE_ENV === 'development' ? `${err}` : undefined,
      },
    },
    500
  );
});

// 404 ハンドラー
app.notFound(c => {
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
