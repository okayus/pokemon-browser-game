import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
// 型のインポート
import type { Env } from '../types';

// APIルーター (型引数を修正)
export const apiRouter = new Hono<Env>();

// バージョン情報を返すエンドポイント
apiRouter.get('/version', c => {
  // c.env.NODE_ENV でアクセス可能
  return c.json({
    success: true,
    data: {
      version: '0.1.0',
      environment: c.env.NODE_ENV || 'development',
    },
  });
});

// ... (他のルートはそのまま) ...
// キャラクター一覧を返すエンドポイント（モック）
apiRouter.get('/characters', c => {
  const characters = [
    {
      id: 1,
      name: 'ヒトカゲ',
      type: '炎',
      level: 5,
      hp: 39,
      attack: 52,
      defense: 43,
      speed: 65,
    },
    {
      id: 2,
      name: 'ゼニガメ',
      type: '水',
      level: 5,
      hp: 44,
      attack: 48,
      defense: 65,
      speed: 43,
    },
    {
      id: 3,
      name: 'フシギダネ',
      type: '草',
      level: 5,
      hp: 45,
      attack: 49,
      defense: 49,
      speed: 45,
    },
  ];

  return c.json({
    success: true,
    data: { characters },
  });
});

// キャラクター詳細を返すエンドポイント
apiRouter.get(
  '/characters/:id',
  zValidator(
    'param',
    z.object({
      id: z.string().transform(val => parseInt(val, 10)),
    })
  ),
  async c => {
    const { id } = c.req.valid('param');

    // 本来はDBから取得する処理
    const character = {
      id,
      name: 'ヒトカゲ',
      type: '炎',
      level: 5,
      hp: 39,
      attack: 52,
      defense: 43,
      speed: 65,
    };

    return c.json({
      success: true,
      data: { character },
    });
  }
);

// APIルーターをエクスポート
export type ApiRouterType = typeof apiRouter;
