import { hc } from 'hono/client';
import type { Api } from 'shared/src/api';

// 環境に応じたベースURLを設定
const BASE_URL = import.meta.env.DEV
  ? 'http://127.0.0.1:8787/api'  // 開発環境
  : 'https://api.pokemon-browser-game.workers.dev/api';  // 本番環境

// Hono Client インスタンスの作成 - 型アサーションを使用して型エラーを解決
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const client = hc<Api>(BASE_URL) as any;

export { client };
