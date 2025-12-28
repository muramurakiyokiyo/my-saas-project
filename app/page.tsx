'use client'
import { useUsers } from './hooks/useUsers';
// 生成された場所からインポート（パスは生成先に合わせて調整してください）
import { useListPets } from './generated/pets/pets';
import type { Pet } from './generated/petstore.schemas';

export default function PetPage() {
  const { data: usersData, isLoading: usersLoading, error: usersError } = useUsers();
  // 自分で作ったフックのように呼ぶだけ。型補完も完璧！
  const { data: petsData, isLoading: petsLoading, isError: petsError } = useListPets({ limit: 10 });

  if (usersLoading || petsLoading) return <div className="p-8">読み込み中...</div>;
  if (usersError) return <div className="p-8">エラーが発生しました: {(usersError as Error).message}</div>;
  if (petsError) return <div className="p-8">動物園が閉まっています（エラー）</div>;

  return (
    <div className="p-8 space-y-8">
      <section>
        <h1 className="text-2xl font-bold mb-4">ユーザー一覧 (SaaS管理画面)</h1>
        <ul className="space-y-2">
          {usersData?.map((user) => (
            <li key={user.id} className="p-4 border rounded shadow-sm bg-white">
              {user.name} <span className="text-sm text-slate-500">({user.role})</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-4">自動生成されたAPIから取得</h1>
        <ul>
          {petsData?.data.map((pet: Pet) => (
            <li key={pet.id} className="p-2 border-b">
              {pet.name} <span className="text-xs text-blue-500">#{pet.tag}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
