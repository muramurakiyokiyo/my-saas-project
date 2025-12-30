'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import MSWProvider from './msw-provider'
import { ErrorHandlerInitializer } from '@/src/api/errorHandler'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <MSWProvider>
        <ErrorHandlerInitializer />
        {children}
      </MSWProvider>
    </QueryClientProvider>
  )
}

