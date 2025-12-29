'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPetSchema, type CreatePetInput } from '../../src/schemas/petSchema'
import axios from 'axios'

export default function PetForm() {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePetInput>({
    resolver: zodResolver(createPetSchema),
  })

  const createPetsMutation = useMutation({
    mutationFn: async (data: CreatePetInput) => {
      // リクエストボディを含めてPOSTリクエストを送信
      return await axios.post('/pets', data)
    },
    onSuccess: () => {
      // ペット一覧のキャッシュを無効化して自動再取得
      queryClient.invalidateQueries({ queryKey: ['/pets'] as const })
      // フォームをリセット
      reset()
    },
  })

  const onSubmit = (data: CreatePetInput) => {
    createPetsMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">新規ペット登録</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            名前
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="ペットの名前"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
            タグ
          </label>
          <input
            id="tag"
            type="text"
            {...register('tag')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="例: トイプードル"
          />
          {errors.tag && (
            <p className="mt-1 text-sm text-red-600">{errors.tag.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={createPetsMutation.isPending}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {createPetsMutation.isPending ? '登録中...' : '登録'}
        </button>

        {createPetsMutation.isError && (
          <p className="text-sm text-red-600">
            エラーが発生しました。もう一度お試しください。
          </p>
        )}
      </div>
    </form>
  )
}

