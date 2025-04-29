import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { Api } from 'shared/src/api';

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

// モンスターリスト取得 - Hono RPCに対応
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
      data: {
        monsters,
        count: monsters.length,
      }
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

// モンスター詳細取得 - Hono RPCに対応
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

      return c.json({ 
        data: { 
          monster 
        } 
      });
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

// ユーザープロフィール取得API
api.get('/user/profile', async (c) => {
  try {
    // モックデータ
    const profile = {
      id: 'user123',
      displayName: 'ポケモントレーナー',
      avatarUrl: 'https://example.com/avatar.png',
    };

    return c.json({
      data: { profile }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return c.json(
      {
        error: {
          message: 'Failed to fetch user profile',
        },
      },
      500
    );
  }
});

// ユーザープロフィール更新API
api.put('/user/profile', async (c) => {
  try {
    const data = await c.req.json();
    
    // 実際にはDBに保存する処理
    console.log('Updating user profile:', data);
    
    return c.json({
      data: { 
        success: true 
      }
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return c.json(
      {
        error: {
          message: 'Failed to update user profile',
        },
      },
      500
    );
  }
});

// プレイヤーデータ取得API
api.get('/gameplay/player-data', async (c) => {
  try {
    // モックデータ
    const playerData = {
      playerId: 'player123',
      monsters: [
        { id: 1, name: 'フレイムドラゴン', type: 'fire', level: 12 },
        { id: 3, name: 'サンダーバード', type: 'electric', level: 8 },
      ],
      inventory: [
        { id: 1, name: 'モンスターボール', type: 'ball', quantity: 5 },
        { id: 2, name: '回復薬', type: 'potion', quantity: 3 },
      ],
    };

    return c.json({
      data: playerData
    });
  } catch (error) {
    console.error('Error fetching player data:', error);
    return c.json(
      {
        error: {
          message: 'Failed to fetch player data',
        },
      },
      500
    );
  }
});

// ゲーム進行状況保存API
api.post('/gameplay/save', async (c) => {
  try {
    const data = await c.req.json();
    
    // 実際にはDBに保存する処理
    console.log('Saving game progress:', data);
    
    return c.json({
      data: { 
        success: true,
        savedAt: new Date().toISOString(),
      }
    });
  } catch (error) {
    console.error('Error saving game progress:', error);
    return c.json(
      {
        error: {
          message: 'Failed to save game progress',
        },
      },
      500
    );
  }
});

// 型アサーションでHono RPCの型を付ける
export default api as Hono<{ Bindings: Bindings }, Api>;
