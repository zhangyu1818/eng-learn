import React, { startTransition, useContext, useReducer, useRef } from 'react'

import { playerContext } from '@/context/player-context'

export type AudioStatus =
  | 'canplay'
  | 'ended'
  | 'pause'
  | 'play'
  | 'playing'
  | 'seeked'
  | 'seeking'
  | 'waiting'

export type PlayStatus = 'paused' | 'playing' | 'waiting'

export interface AudioControls {
  currentTime: number
  element: HTMLAudioElement | null
  get duration(): number
  get paused(): boolean
  get playStatus(): PlayStatus
  get status(): AudioStatus

  loop: boolean
  muted: boolean
  pause: () => void
  play: () => Promise<void>

  playbackRate: number
  volume: number
}

export interface UsePlayerParams {
  defaultLoop?: boolean
  defaultMute?: boolean
  defaultPlayRate?: number
  defaultVolume?: number
}

export const usePlayer = (params: UsePlayerParams = {}) => {
  const {
    defaultLoop = false,
    defaultMute = false,
    defaultPlayRate = 1,
    defaultVolume = 1,
  } = params

  const audioRef = useContext(playerContext)

  const forceUpdateImp = useReducer(() => ({}), {})[1]

  const audioStatusRef = useRef<AudioStatus>('pause')
  const playStatusRef = useRef<PlayStatus>('paused')

  const forceUpdate = () => {
    startTransition(() => {
      forceUpdateImp()
    })
  }

  const forceUpdateRefValue = <T>(ref: React.MutableRefObject<T>, value: T) => {
    if (ref.current !== value) {
      ref.current = value
      forceUpdate()
    }
  }

  const addVideoEventListener = <K extends keyof HTMLMediaElementEventMap>(
    type: K,
    listener: (event: HTMLMediaElementEventMap[K]) => void,
  ) => {
    audioRef.current?.addEventListener(type, listener)
    return function removeListener() {
      audioRef.current?.removeEventListener(type, listener)
    }
  }

  React.useLayoutEffect(() => {
    if (!audioRef.current) {
      console.error('audio element is not defined')
      return
    }

    // set default params
    audioRef.current.muted = defaultMute
    audioRef.current.volume = defaultVolume
    audioRef.current.playbackRate = defaultPlayRate
    audioRef.current.loop = defaultLoop

    let waitingStatusTimer = 0

    const removeListeners = [
      addVideoEventListener('canplay', () =>
        forceUpdateRefValue(audioStatusRef, 'canplay'),
      ),
      addVideoEventListener('play', () =>
        forceUpdateRefValue(audioStatusRef, 'play'),
      ),
      addVideoEventListener('playing', () =>
        forceUpdateRefValue(audioStatusRef, 'playing'),
      ),
      addVideoEventListener('pause', () =>
        forceUpdateRefValue(audioStatusRef, 'pause'),
      ),
      addVideoEventListener('waiting', () =>
        forceUpdateRefValue(audioStatusRef, 'waiting'),
      ),
      addVideoEventListener('seeking', () =>
        forceUpdateRefValue(audioStatusRef, 'seeking'),
      ),
      addVideoEventListener('seeked', () =>
        forceUpdateRefValue(audioStatusRef, 'seeked'),
      ),
      addVideoEventListener('ended', () =>
        forceUpdateRefValue(audioStatusRef, 'ended'),
      ),

      addVideoEventListener('playing', () => {
        clearTimeout(waitingStatusTimer)
        forceUpdateRefValue(playStatusRef, 'playing')
      }),
      addVideoEventListener('pause', () => {
        clearTimeout(waitingStatusTimer)
        forceUpdateRefValue(playStatusRef, 'paused')
      }),
      addVideoEventListener('waiting', () => {
        waitingStatusTimer = window.setTimeout(() => {
          forceUpdateRefValue(playStatusRef, 'waiting')
        }, 500)
      }),

      addVideoEventListener('seeking', forceUpdate),
      addVideoEventListener('seeked', forceUpdate),
      addVideoEventListener('timeupdate', forceUpdate),
      addVideoEventListener('durationchange', forceUpdate),
      addVideoEventListener('volumechange', forceUpdate),
      addVideoEventListener('ratechange', forceUpdate),
    ]
    return () => {
      clearTimeout(waitingStatusTimer)
      removeListeners.forEach(remove => remove())
    }
  }, [])

  const audioControls = React.useMemo<AudioControls>(
    () => ({
      set currentTime(value: number) {
        if (audioRef.current) {
          audioRef.current.currentTime = value
        }
      },
      get currentTime() {
        return audioRef.current?.currentTime ?? 0 /* default value */
      },
      get duration() {
        return audioRef.current?.duration ?? 0 /* default value */
      },
      get element() {
        return audioRef.current
      },
      set loop(value: boolean) {
        forceUpdate()
        if (audioRef.current) {
          audioRef.current.loop = value
        }
      },
      get loop() {
        return audioRef.current?.loop ?? defaultLoop
      },
      set muted(value: boolean) {
        forceUpdate()
        if (audioRef.current) {
          audioRef.current.muted = value
        }
      },
      get muted() {
        return audioRef.current?.muted ?? defaultMute
      },
      pause() {
        return audioRef.current?.pause()
      },
      get paused() {
        return !!audioRef.current?.paused
      },
      async play() {
        return audioRef.current?.play()
      },
      get playStatus() {
        return playStatusRef.current
      },
      set playbackRate(value: number) {
        if (audioRef.current) {
          audioRef.current.playbackRate = value
        }
      },
      get playbackRate() {
        return audioRef.current?.playbackRate ?? defaultPlayRate
      },
      get status() {
        return audioStatusRef.current
      },
      set volume(value: number) {
        this.muted = value === 0
        if (audioRef.current) {
          audioRef.current.volume = value
        }
      },
      get volume() {
        return audioRef.current?.volume ?? defaultVolume
      },
    }),
    [],
  )

  return audioControls
}
