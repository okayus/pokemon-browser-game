import { useState, useEffect } from 'react';
import { api, API_BASE_URL } from '../lib/api';

export default function ApiConnectionTest() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        setStatus('loading');
        setApiEndpoint(API_BASE_URL);
        
        // 新しいAPIクライアントを使用
        const healthData = await api.checkHealth();
        
        if (healthData && healthData.status === 'healthy') {
          setStatus('success');
          setMessage(`API接続成功: ${healthData.status}`);
        } else {
          setStatus('error');
          // エラー表示部分を修正
          if (healthData.error && typeof healthData.error === 'object') {
            setMessage(`API接続エラー: ${healthData.error.message || '不明なエラー'}`);
          } else {
            setMessage(`API接続エラー: ${String(healthData.error) || '不明なエラー'}`);
          }
        }
      } catch (err) {
        console.error('API接続テスト中にエラーが発生:', err);
        setStatus('error');
        setMessage(`API接続テスト中にエラーが発生: ${err instanceof Error ? err.message : String(err)}`);
      }
    };

    checkApiConnection();
  }, []);

  return (
    <div className="my-4 p-4 border rounded">
      <h3 className="text-lg font-bold mb-2">APIサーバー接続テスト</h3>
      <div className="mb-2">
        <span className="font-medium">API Endpoint: </span>
        <code className="bg-gray-100 px-2 py-1 rounded">{apiEndpoint}</code>
      </div>
      {status === 'loading' ? (
        <p className="text-blue-600">接続テスト中...</p>
      ) : status === 'success' ? (
        <p className="text-green-600">{message}</p>
      ) : (
        <p className="text-red-600">{message}</p>
      )}
    </div>
  );
}
