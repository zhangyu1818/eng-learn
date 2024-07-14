'use client'

import { createContext, useContext } from 'react'

export const playerContext = createContext<
  React.MutableRefObject<HTMLAudioElement | null>
>({ current: null })

interface VideoControlsProviderProps {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>
  children?: React.ReactNode
}

export const PlayerProvider = (props: VideoControlsProviderProps) => {
  const { audioRef, children } = props
  return (
    <playerContext.Provider value={audioRef}>{children}</playerContext.Provider>
  )
}

export const usePlayerRef = () => {
  return useContext(playerContext)
}
