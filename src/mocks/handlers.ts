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
    const newPet = await request.json() as { name: string; tag: string }
    const pet = {
      id: pets.length + 1,
      name: newPet.name,
      tag: newPet.tag,
    }
    pets.push(pet)
    return HttpResponse.json(null, { status: 201 })
  }),
]

