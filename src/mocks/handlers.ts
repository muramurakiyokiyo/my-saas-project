import { http, HttpResponse } from 'msw'

export const handlers = [
  // /pets への GET リクエストを待ち伏せする
  http.get('*/pets', () => {
    return HttpResponse.json([
      { id: 1, name: 'チョコ', tag: 'トイプードル' },
      { id: 2, name: 'マロン', tag: '柴犬' },
      { id: 3, name: 'ルナ', tag: '三毛猫' },
    ])
  }),
]

