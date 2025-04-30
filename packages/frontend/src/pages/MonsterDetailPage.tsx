import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import type { Monster } from 'shared';

const MonsterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [monster, setMonster] = useState<Monster | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMonsterDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);
        
        // 新しいAPIクライアントを使用
        const result = await api.getMonsterById(id);
        
        if (result) {
          setMonster(result.monster);
        } else {
          setError('モンスター情報の取得に失敗しました');
        }
      } catch (err) {
        console.error('Error fetching monster details:', err);
        setError('モンスター詳細の取得中にエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchMonsterDetail();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center p-8">読み込み中...</div>;
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          戻る
        </button>
      </div>
    );
  }

  if (!monster) {
    return <div className="p-4">モンスターが見つかりませんでした</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button 
        onClick={() => navigate(-1)} 
        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded mb-6"
      >
        ← 戻る
      </button>
      
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold">{monster.name}</h1>
          <span className={`px-3 py-1 rounded-full text-white ${getTypeColor(monster.type)}`}>
            {monster.type}
          </span>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">基本情報</h2>
            <div className="space-y-2">
              <p><span className="font-medium">レベル:</span> {monster.level}</p>
              <p><span className="font-medium">HP:</span> {monster.hp}</p>
              <p><span className="font-medium">攻撃力:</span> {monster.attack}</p>
              <p><span className="font-medium">防御力:</span> {monster.defense}</p>
              <p><span className="font-medium">素早さ:</span> {monster.speed}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">わざ</h2>
            <ul className="space-y-2">
              {monster.moves.map((move, index) => (
                <li 
                  key={index}
                  className="px-3 py-2 bg-gray-100 rounded border border-gray-200"
                >
                  {move}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-8">
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded font-bold">
            捕獲する
          </button>
        </div>
      </div>
    </div>
  );
};

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

export default MonsterDetailPage;
