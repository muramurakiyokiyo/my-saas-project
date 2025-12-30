import { http, HttpResponse } from 'msw'

// 簡易的なメモリ内ストレージ（実際のアプリではサーバー側で管理）
const pets = [
  { id: 1, name: 'チョコ', tag: 'トイプードル' },
  { id: 2, name: 'マロン', tag: '柴犬' },
  { id: 3, name: 'ルナ', tag: '三毛猫' },
]

export const handlers = [
  // /pets への GET リクエストを待ち伏せする
  http.get('*/pets', () => {
    return HttpResponse.json(pets)
  }),
  // /pets への POST リクエストを待ち伏せする
  http.post('*/pets', async ({ request }) => {
    // ネットワークエラー（接続拒否など）をシミュレート
    ///return HttpResponse.error() 
        
    // もし 500 エラーなどを試したい場合はこちら
    return new HttpResponse(null, { status: 500 })
  }),
  // /pets/{petId} への PUT リクエストを待ち伏せする
  http.put('*/pets/:petId', async ({ request, params }) => {
    const petId = Number(params.petId)
    const updatedPet = await request.json() as { id: number; name: string; tag?: string }
    const index = pets.findIndex(p => p.id === petId)
    if (index === -1) {
      return HttpResponse.json({ error: 'ペットが見つかりません' }, { status: 404 })
    }
    pets[index] = { ...pets[index], ...updatedPet }
    return HttpResponse.json(pets[index], { status: 200 })
  }),
  // /pets/{petId} への DELETE リクエストを待ち伏せする
  http.delete('*/pets/:petId', async ({ params }) => {
    const petId = Number(params.petId)
    const index = pets.findIndex(p => p.id === petId)
    if (index === -1) {
      return HttpResponse.json({ error: 'ペットが見つかりません' }, { status: 404 })
    }
    pets.splice(index, 1)
    return HttpResponse.json(null, { status: 204 })
  }),
]

