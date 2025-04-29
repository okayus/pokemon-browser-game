import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">ページが見つかりません</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        お探しのページは存在しないか、削除された可能性があります。
      </p>
      <Link
        to="/"
        className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition"
      >
        ホームに戻る
      </Link>
    </div>
  );
};

export default NotFoundPage;
