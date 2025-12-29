import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// サーバーサイド用のMSWサーバーをセットアップ
export const server = setupServer(...handlers)

