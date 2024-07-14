'use client'

import { useRef } from 'react'

import { PlayerProvider } from '@/context/player-context'

export interface AudioPlayerProps {
  children: React.ReactNode
  src: string
}

export const AudioPlayer = (props: AudioPlayerProps) => {
  const { children, src } = props

  const audioRef = useRef<HTMLMediaElement | null>(null)

  return (
    <PlayerProvider audioRef={audioRef}>
      <div className='flex h-svh flex-col gap-4'>
        <div className='flex flex-1 items-center'>{children}</div>
        <audio ref={audioRef} src={src} autoPlay />
      </div>
    </PlayerProvider>
  )
}
