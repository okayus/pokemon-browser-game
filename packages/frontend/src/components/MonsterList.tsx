import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../lib/api';
import type { MonsterSummary } from 'shared';

export default function MonsterList() {
  const [monsters, setMonsters] = useState<MonsterSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        setLoading(true);
        
        // 型エラー回避のため、fetch APIを直接使用
        const response = await fetch('http://127.0.0.1:8787/api/monsters');
        const data = await response.json();
        
        if (response.ok && data.data) {
          setMonsters(data.data.monsters);
        } else {
          setError(data.error?.message || 'モンスターの取得に失敗しました');
        }
      } catch (err) {
        console.error('Error fetching monsters:', err);
        setError('モンスターデータの取得中にエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchMonsters();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8">読み込み中...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">モンスター一覧</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {monsters.map((monster) => (
          <Link
            to={`/monsters/${monster.id}`}
            key={monster.id}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h3 className="font-bold text-lg">{monster.name}</h3>
            <div className="mt-2">
              <span className={`inline-block px-2 py-1 rounded-full text-xs text-white ${getTypeColor(monster.type)}`}>
                {monster.type}
              </span>
            </div>
            <p className="mt-2 text-gray-600">レベル: {monster.level}</p>
            <p className="mt-3 text-blue-500 text-sm">詳細を見る →</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function getTypeColor(type: string): string {
  switch (type) {
    case 'fire':
      return 'bg-red-500';
    case 'water':
      return 'bg-blue-500';
    case 'electric':
      return 'bg-yellow-500';
    case 'grass':
      return 'bg-green-500';
    case 'rock':
      return 'bg-gray-500';
    case 'flying':
      return 'bg-indigo-400';
    default:
      return 'bg-gray-400';
  }
}
