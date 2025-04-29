import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">ポケモンライクなブラウザゲーム</h1>
        <p className="text-xl mb-8">TypeScriptフルスタックで作られたブラウザゲーム</p>
        
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">ゲームの特徴</h2>
          <ul className="text-left list-disc list-inside space-y-2">
            <li>ポケモンライクなキャラクターの捕獲と育成</li>
            <li>グリッドベースのマップ移動</li>
            <li>ターンベースのバトルシステム</li>
            <li>アイテムの収集と使用</li>
          </ul>
          
          <div className="mt-8">
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-bold text-lg transition">
              ゲームを始める
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
