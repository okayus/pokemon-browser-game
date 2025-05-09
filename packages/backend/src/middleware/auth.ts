import { Context, MiddlewareHandler } from 'hono';
import { initFirebaseAdmin } from '../lib/firebase-admin';
import { Env } from '../types';

// 認証エラーのレスポンス生成
const unauthorizedResponse = (c: Context) => {
  return c.json(
    {
      error: {
        message: 'Unauthorized',
        detail: 'Authentication required',
      }
    },
    401
  );
};

// 認証ミドルウェア（必須認証）
export const authMiddleware = (skipOnDev = false): MiddlewareHandler<Env> => {
  return async (c, next) => {
    // 開発環境で認証スキップ（オプション）
    if (skipOnDev && c.env.NODE_ENV === 'development') {
      // 開発環境用のモックユーザー情報を設定
      c.set('user', {
        uid: 'dev-user-123',
        email: 'dev@example.com',
        displayName: '開発用ユーザー',
      });
      return next();
    }

    // Authorizationヘッダーの取得
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return unauthorizedResponse(c);
    }

    // トークンの取得
    const token = authHeader.substring(7); // "Bearer "の後の部分

    try {
      // Firebase Adminを初期化
      const auth = initFirebaseAdmin(c.env);
      
      // トークンの検証
      const decodedToken = await auth.verifyIdToken(token);
      
      // ユーザー情報をコンテキストに設定
      c.set('user', {
        uid: decodedToken.uid,
        email: decodedToken.email || null,
        displayName: decodedToken.name || null,
      });
      
      // 次の処理へ
      return next();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Authentication error:', error);
      return unauthorizedResponse(c);
    }
  };
};

// 任意認証ミドルウェア（認証があれば情報を取得、なければスキップ）
export const optionalAuthMiddleware = (): MiddlewareHandler<Env> => {
  return async (c, next) => {
    // 開発環境の場合
    if (c.env.NODE_ENV === 'development') {
      // 開発環境用のモックユーザー情報を設定
      c.set('user', {
        uid: 'dev-user-123',
        email: 'dev@example.com',
        displayName: '開発用ユーザー',
      });
      return next();
    }

    // Authorizationヘッダーの取得
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // 認証がなくてもNextへ進む
      return next();
    }

    // トークンの取得
    const token = authHeader.substring(7);

    try {
      // Firebase Adminを初期化
      const auth = initFirebaseAdmin(c.env);
      
      // トークンの検証
      const decodedToken = await auth.verifyIdToken(token);
      
      // ユーザー情報をコンテキストに設定
      c.set('user', {
        uid: decodedToken.uid,
        email: decodedToken.email || null,
        displayName: decodedToken.name || null,
      });
    } catch (error) {
      // 認証エラーがあっても次へ進む（未認証として扱う）
      // eslint-disable-next-line no-console
      console.error('Optional authentication error:', error);
    }
    
    // 次の処理へ
    return next();
  };
};
