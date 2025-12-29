import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { getListPetsQueryOptions } from './generated/pets/pets'
import PetForm from './components/PetForm'
import PetList from './components/PetList'

export default async function PetPage() {
  const queryClient = new QueryClient()

  // サーバー側でペット一覧データをプリフェッチ
  // MSWがサーバーサイドでも動作するため、プリフェッチが成功する
  await queryClient.prefetchQuery(getListPetsQueryOptions({ limit: 10 }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="p-8">
        <PetForm />
        <PetList />
      </div>
    </HydrationBoundary>
  )
}
