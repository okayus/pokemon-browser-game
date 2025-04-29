import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import type { Env } from './types';
import { apiRouter } from './routes/api';

// アプリケーションのメインインスタンス
const app = new Hono<{ Bindings: Env }>();

// ミドルウェアの設定
app.use('*', logger());
app.use('*', cors({
  origin: ['http://localhost:3000', 'https://pokemon-browser-game.pages.dev'],
  credentials: true,
}));

// ヘルスチェック用エンドポイント
app.get('/', (c) => {
  return c.json({
    status: 'ok',
    message: 'Pokemon Browser Game API',
    version: '0.1.0',
  });
});

// APIルーターをマウント
app.route('/api', apiRouter);

// Workerのエクスポート
export default app;
