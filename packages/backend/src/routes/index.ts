import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

// 型定義
type Bindings = {
  DB: D1Database;
  GAME_STORE: KVNamespace;
};

// APIルーターの作成
const api = new Hono<{ Bindings: Bindings }>();

// ヘルスチェック
api.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

// サンプルエンドポイント - モンスターリスト取得
api.get('/monsters', async (c) => {
  try {
    // 実際にはDBから取得するが、今はモックデータを返す
    const monsters = [
      { id: 1, name: 'フレイムドラゴン', type: 'fire', level: 10 },
      { id: 2, name: 'ウォーターホース', type: 'water', level: 8 },
      { id: 3, name: 'サンダーバード', type: 'electric', level: 12 },
      { id: 4, name: 'リーフフェアリー', type: 'grass', level: 6 },
    ];

    return c.json({
      monsters,
      count: monsters.length,
    });
  } catch (error) {
    console.error('Error fetching monsters:', error);
    return c.json(
      {
        error: {
          message: 'Failed to fetch monsters',
        },
      },
      500
    );
  }
});

// サンプルエンドポイント - モンスター詳細取得
api.get(
  '/monsters/:id',
  zValidator('param', z.object({ id: z.string() })),
  async (c) => {
    try {
      const { id } = c.req.valid('param');
      const monsterId = parseInt(id);

      // 実際にはDBから取得するが、今はモックデータを返す
      const monsters = {
        1: {
          id: 1,
          name: 'フレイムドラゴン',
          type: 'fire',
          level: 10,
          hp: 100,
          attack: 15,
          defense: 8,
          speed: 12,
          moves: ['ファイアブレス', 'テールスラッシュ', 'バーニングクロー'],
        },
        2: {
          id: 2,
          name: 'ウォーターホース',
          type: 'water',
          level: 8,
          hp: 85,
          attack: 10,
          defense: 12,
          speed: 14,
          moves: ['ウォーターショット', 'ハイドロダイブ', 'アクアテール'],
        },
      };

      const monster = monsters[monsterId as keyof typeof monsters];

      if (!monster) {
        return c.json(
          {
            error: {
              message: `Monster with ID ${id} not found`,
            },
          },
          404
        );
      }

      return c.json({ monster });
    } catch (error) {
      console.error(`Error fetching monster ${c.req.param('id')}:`, error);
      return c.json(
        {
          error: {
            message: 'Failed to fetch monster',
          },
        },
        500
      );
    }
  }
);

export default api;
