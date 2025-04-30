import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { Api } from 'shared/src/api';
import healthRoutes from './health';
import userRoutes from './user';
import { optionalAuthMiddleware } from '../middleware/auth';
import { Env } from '../types';

// APIルーターの作成
const api = new Hono<Env>();

// ルートへのマウント
api.route('/health', healthRoutes);
api.route('/user', userRoutes);

// 一般APIには任意認証ミドルウェアを適用
api.use('*', optionalAuthMiddleware());

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
    // ESLint警告を抑制
    // eslint-disable-next-line no-console
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
        3: {
          id: 3, 
          name: 'サンダーバード',
          type: 'electric',
          level: 12,
          hp: 90,
          attack: 14,
          defense: 7,
          speed: 16,
          moves: ['ライトニングボルト', 'ウィングアタック', 'チャージ'],
        },
        4: {
          id: 4,
          name: 'リーフフェアリー',
          type: 'grass',
          level: 6,
          hp: 75,
          attack: 8,
          defense: 10,
          speed: 11,
          moves: ['リーフストーム', 'フェアリーダスト', 'ヒーリングポレン'],
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
      // ESLint警告を抑制
      // eslint-disable-next-line no-console
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

// プレイヤーデータ取得API（認証が必要）
api.get('/gameplay/player-data', async (c) => {
  try {
    // ユーザー情報を取得
    const user = c.get('user');
    
    if (!user) {
      return c.json(
        {
          error: {
            message: 'Authentication required',
          },
        },
        401
      );
    }

    // モックデータ（実際には認証済みユーザーIDを使用してDBから取得）
    const playerData = {
      userId: user.uid,
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
    // eslint-disable-next-line no-console
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

// ゲーム進行状況保存API（認証が必要）
api.post('/gameplay/save', async (c) => {
  try {
    // ユーザー情報を取得
    const user = c.get('user');
    
    if (!user) {
      return c.json(
        {
          error: {
            message: 'Authentication required',
          },
        },
        401
      );
    }

    const data = await c.req.json();
    
    // 実際にはDBに保存する処理
    // eslint-disable-next-line no-console
    console.log('Saving game progress:', data);
    
    return c.json({
      data: { 
        success: true,
        savedAt: new Date().toISOString(),
        userId: user.uid,
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
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
export default api as Hono<Env, Api>;
