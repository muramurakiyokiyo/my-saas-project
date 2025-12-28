'use client'
import { useEffect, useState } from 'react'

export default function MSWProvider({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(false)

  useEffect(() => {
    // ブラウザ環境かつ開発環境の時のみMSWを起動
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      async function initMsw() {
        const { worker } = await import('../src/mocks/browser')
        await worker.start({
          onUnhandledRequest: 'bypass',
        })
        setMswReady(true)
      }
      initMsw()
    } else {
      // 本番環境やサーバーサイドでは即座に表示
      setMswReady(true)
    }
  }, [])

  // 初期化が完了するまで何も表示しない
  if (!mswReady) {
    return null
  }

  return <>{children}</>
}

