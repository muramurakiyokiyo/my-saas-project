'use client'
import { useListPets } from '../generated/pets/pets'
import PetListItem from './PetListItem'

export default function PetList() {
  const { data: petsData, isLoading: petsLoading, isError: petsError } = useListPets({ limit: 10 })

  if (petsLoading) return <div className="p-8">読み込み中...</div>
  if (petsError) return <div className="p-8">エラーが発生しました</div>

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">自動生成されたAPIから取得</h1>
      <ul className="border-t">
        {petsData?.data.map((pet) => (
          <PetListItem key={pet.id} pet={pet} />
        ))}
      </ul>
    </>
  )
}

