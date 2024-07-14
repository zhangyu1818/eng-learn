'use client'

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'

export interface FileContextType {
  file: File | null
  srt: File | null
}

const defaultValue: FileContextType = {
  file: null,
  srt: null,
}

const fileContext = createContext<
  [FileContextType, Dispatch<SetStateAction<FileContextType>>]
>([defaultValue, () => {}])

export interface FileProviderProps {
  children: React.ReactNode
}

export const FileProvider = (props: FileProviderProps) => {
  const { children } = props

  const state = useState(defaultValue)

  return <fileContext.Provider value={state}>{children}</fileContext.Provider>
}

export const useFile = () => {
  return useContext(fileContext)
}
