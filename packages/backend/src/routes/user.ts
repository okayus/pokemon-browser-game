import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';
import { AuthUser, UserProfileDB, UserProfileResponse, Bindings } from '../types';

// ユーザーAPIルーターの作成
const userRouter = new Hono<{ Bindings: Bindings }>();

// ユーザープロフィール取得API
userRouter.get('/profile', authMiddleware(), async (c) => {
  const user = c.get('user') as AuthUser;
  
  // ユーザーIDが見つからない場合は401を返す
  if (!user || !user.uid) {
    return c.json(
      {
        error: {
          message: 'Unauthorized',
          detail: 'Valid user authentication required',
        },
      },
      401
    );
  }

  try {
    // 実際のプロジェクトではDBからプロフィールを取得
    // 今回はモックデータで対応
    const userProfile: UserProfileDB = {
      uid: user.uid,
      nickname: user.displayName || 'トレーナー',
      avatarId: '1', // デフォルトアバター
      level: 1,
      experience: 0,
      lastLogin: Date.now(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // レスポンス用のプロフィールデータを作成
    const profileResponse: UserProfileResponse = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: null, // Firebase Authからの情報
      createdAt: userProfile.createdAt,
      gameProfile: {
        nickname: userProfile.nickname,
        avatarId: userProfile.avatarId,
        level: userProfile.level,
        experience: userProfile.experience,
      },
    };

    // 成功レスポンスを返す
    return c.json({
      data: profileResponse,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    // エラーレスポンスを返す
    return c.json(
      {
        error: {
          message: 'Internal Server Error',
          detail: 'Failed to fetch user profile',
        },
      },
      500
    );
  }
});

// ユーザープロフィール更新API
userRouter.post('/profile', authMiddleware(), async (c) => {
  const user = c.get('user') as AuthUser;
  
  try {
    // リクエストボディを取得
    await c.req.json(); // 読み取りだけして利用しない（将来的な実装のため）
    
    // 実際のプロジェクトではバリデーションとDBへの保存が必要
    // 今回は成功レスポンスのみ返す
    return c.json({
      data: {
        message: 'Profile updated successfully',
        uid: user.uid,
      },
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return c.json(
      {
        error: {
          message: 'Internal Server Error',
          detail: 'Failed to update user profile',
        },
      },
      500
    );
  }
});

export default userRouter;
