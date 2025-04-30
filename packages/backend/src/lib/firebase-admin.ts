import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import type { Env } from 'hono';

// 環境変数を受け取るように修正
// Cloudflare Workersでは process.env が使えないため、c.env から環境変数を取得する
const initFirebaseAdmin = (env: Env) => {
  // Firebase設定
  const firebaseConfig = {
    projectId: env.FIREBASE_PROJECT_ID || '',
    clientEmail: env.FIREBASE_CLIENT_EMAIL || '',
    privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
  };

  // Firebase Admin SDKの初期化
  try {
    // すでに初期化されている場合はエラーになるため、try-catchで囲む
    const app = initializeApp({
      credential: cert({
        projectId: firebaseConfig.projectId,
        clientEmail: firebaseConfig.clientEmail,
        privateKey: firebaseConfig.privateKey,
      }),
    });
    
    // Firebase Auth Adminの取得
    return getAuth(app);
  } catch (error) {
    // 開発環境ではログを出力
    console.info('Firebase Admin初期化エラー（既に初期化されている場合も含む）:', error);
    
    // すでに初期化済みの場合は、既存のAuthインスタンスを取得
    return getAuth();
  }
};

export { initFirebaseAdmin };
