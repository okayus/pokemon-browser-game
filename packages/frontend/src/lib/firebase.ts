import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebaseの設定
// 実際の値は環境変数から取得するか、実際のプロジェクト設定から取得します
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'your-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'your-auth-domain',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'your-storage-bucket',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'your-messaging-sender-id',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'your-app-id',
};

// Firebase アプリケーションの初期化
const app = initializeApp(firebaseConfig);

// Authentication インスタンスの取得
const auth = getAuth(app);

export { app, auth };
