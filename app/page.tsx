'use client'
// 生成された場所からインポート（パスは生成先に合わせて調整してください）
import { useListPets } from './generated/pets/pets';
import type { Pet } from './generated/petstore.schemas';
import PetForm from './components/PetForm';

export default function PetPage() {
  // 自分で作ったフックのように呼ぶだけ。型補完も完璧！
  const { data: petsData, isLoading: petsLoading, isError: petsError } = useListPets({ limit: 10 });

  if (petsLoading) return <div className="p-8">読み込み中...</div>;
  if (petsError) return <div className="p-8">エラーが発生しました</div>;

  return (
    <div className="p-8">
      <PetForm />
      <h1 className="text-2xl font-bold mb-4">自動生成されたAPIから取得</h1>
      <ul>
        {petsData?.data.map((pet: Pet) => (
          <li key={pet.id} className="p-2 border-b">
            {pet.name} <span className="text-xs text-blue-500">#{pet.tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
