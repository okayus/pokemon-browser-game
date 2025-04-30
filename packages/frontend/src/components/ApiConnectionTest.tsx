import { useState, useEffect } from 'react';
// 未使用のclientをインポートしないようにする

export default function ApiConnectionTest() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [apiEndpoint, setApiEndpoint] = useState('');

  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        setStatus('loading');
        
        // APIベースURL - 開発環境のURLを直接指定
        const baseUrl = 'http://127.0.0.1:8787/api';
        setApiEndpoint(baseUrl);
        
        // ヘルスチェックエンドポイントを呼び出す
        const response = await fetch(`${baseUrl}/health`);
        const data = await response.json();
        
        if (response.ok) {
          setStatus('success');
          setMessage(`API接続成功: ${data.message || JSON.stringify(data)}`);
        } else {
          setStatus('error');
          setMessage(`API接続エラー: ${data.error?.message || '不明なエラー'}`);
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
