'use client'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdatePet, useDeletePet } from '../generated/pets/pets'
import type { Pet } from '../generated/petstore.schemas'

interface PetListItemProps {
  pet: Pet
}

export default function PetListItem({ pet }: PetListItemProps) {
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(pet.name)
  const [editTag, setEditTag] = useState(pet.tag || '')

  const updatePetMutation = useUpdatePet({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/pets'] })
        setIsEditing(false)
      },
    },
  })

  const deletePetMutation = useDeletePet({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['/pets'] })
      },
    },
  })

  const handleSave = () => {
    updatePetMutation.mutate({
      petId: pet.id,
      data: {
        id: pet.id,
        name: editName,
        tag: editTag || undefined,
      },
    })
  }

  const handleCancel = () => {
    setEditName(pet.name)
    setEditTag(pet.tag || '')
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (confirm(`「${pet.name}」を削除してもよろしいですか？`)) {
      deletePetMutation.mutate({ petId: pet.id })
    }
  }

  const isPending = updatePetMutation.isPending || deletePetMutation.isPending

  if (isEditing) {
    return (
      <li className="p-4 border-b flex items-center gap-2 bg-gray-50">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="名前"
            disabled={isPending}
          />
          <input
            type="text"
            value={editTag}
            onChange={(e) => setEditTag(e.target.value)}
            className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="タグ"
            disabled={isPending}
          />
        </div>
        <button
          onClick={handleSave}
          disabled={isPending || !editName.trim()}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          保存
        </button>
        <button
          onClick={handleCancel}
          disabled={isPending}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          キャンセル
        </button>
      </li>
    )
  }

  return (
    <li className="p-4 border-b flex items-center justify-between hover:bg-gray-50">
      <div>
        <span className="font-medium">{pet.name}</span>
        {pet.tag && <span className="text-xs text-blue-500 ml-2">#{pet.tag}</span>}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          disabled={isPending}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          編集
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          削除
        </button>
      </div>
    </li>
  )
}

