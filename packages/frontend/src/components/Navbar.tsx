import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">ポケモンライクゲーム</Link>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-primary-300 transition">ホーム</Link>
          <button className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded transition">
            ログイン
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
