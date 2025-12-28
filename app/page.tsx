'use client'
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from './api';

export default function UserListPage() {
  // useQuery が「通信の全状態」を管理してくれる
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'], // この文字列でキャッシュを識別する（重要！）
    queryFn: fetchUsers, // 実行する関数
  });

  if (isLoading) return <div className="p-8">サーバーに接続中...</div>;
  if (error) return <div className="p-8">エラーが発生しました: {(error as Error).message}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ユーザー一覧 (SaaS管理画面)</h1>
      <ul className="space-y-2">
        {data?.map((user) => (
          <li key={user.id} className="p-4 border rounded shadow-sm bg-white">
            {user.name} <span className="text-sm text-slate-500">({user.role})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
