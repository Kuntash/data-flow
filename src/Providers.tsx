'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'
import { queryClient } from './constants/appwrite'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  )
}
