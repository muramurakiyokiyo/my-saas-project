import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getListPetsQueryOptions } from './generated/pets/pets'
import PetForm from './components/PetForm'
import PetList from './components/PetList'

export default async function PetPage() {
  const queryClient = new QueryClient()

  // サーバー側でペット一覧データをプリフェッチ
  // 開発環境ではMSWが動作しないため、エラーが発生する可能性があるが、
  // クライアント側で再取得されるため問題なし
  try {
    await queryClient.prefetchQuery(getListPetsQueryOptions({ limit: 10 }))
  } catch (error) {
    // サーバー側でのプリフェッチに失敗しても、クライアント側で取得される
    console.error('Server-side prefetch failed:', error)
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-8">
        <PetForm />
        <PetList />
      </div>
    </HydrationBoundary>
  )
}
