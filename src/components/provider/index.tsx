'use client'

import { FileProvider } from '@/context'

export interface ProviderProps {
  children: React.ReactNode
}

export const Provider = (props: ProviderProps) => {
  const { children } = props

  return <FileProvider>{children}</FileProvider>
}
