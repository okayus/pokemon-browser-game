import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

/**
 * Firebase Admin SDKの初期化
 * 
 * 注意: Cloudflare Workersは依存関係のサイズ制限があるため、
 * 実際のプロダクションでは適切に最適化してください。
 */
const initializeFirebaseAdmin = (env: any) => {
  // 環境変数からservice accountの情報を取得
  // Cloudflare Workersの場合、Secretsを使用するか、KVから読み込む方法もあります
  const serviceAccount = {
    projectId: env.FIREBASE_PROJECT_ID,
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: (env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  };

  try {
    // Firebase Adminを初期化
    const app = initializeApp({
      credential: cert(serviceAccount),
      projectId: env.FIREBASE_PROJECT_ID,
    });

    // Auth インスタンスを取得
    const auth = getAuth(app);

    return { app, auth };
  } catch (error) {
    console.error('Firebase Admin初期化エラー:', error);
    throw error;
  }
};

// トークン検証関数
export const verifyIdToken = async (idToken: string, env: any) => {
  try {
    // アプリの初期化
    const { auth } = initializeFirebaseAdmin(env);

    // トークンを検証
    const decodedToken = await auth.verifyIdToken(idToken);
    return { valid: true, uid: decodedToken.uid, token: decodedToken };
  } catch (error) {
    console.error('トークン検証エラー:', error);
    return { valid: false, error };
  }
};

export { initializeFirebaseAdmin };
