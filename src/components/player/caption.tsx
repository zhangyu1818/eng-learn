'use client'

import { clsx } from 'clsx'
import { animate, type Controls } from 'from-to.js'
import List, { type ListRef } from 'rc-virtual-list'

import { Fragment, useEffect, useRef, useState } from 'react'

import { DictPopover } from '@/components/dict-popover'
import { usePlayerRef } from '@/context'

import type { Line } from 'srt-parser-2'

export interface CaptionProps {
  srt: Line[]
}

interface Text {
  type: 'non-word' | 'word'
  value: string
}

export const Caption = (props: CaptionProps) => {
  const { srt } = props

  const [currentLine, setCurrentLine] = useState(srt[0])

  const listRef = useRef<ListRef | null>(null)
  const audioRef = usePlayerRef()

  const isScrolling = useRef(false)
  const isAnimateScrolling = useRef(false)
  const scrollTimerId = useRef(-1)

  const findCurrentLineIndex = (currentTime: number) => {
    let low = 0
    let high = srt.length - 1

    while (low <= high) {
      const mid = Math.floor((low + high) / 2)
      if (
        currentTime >= srt[mid].startSeconds &&
        currentTime <= srt[mid].endSeconds
      ) {
        return mid
      } else if (currentTime < srt[mid].startSeconds) {
        high = mid - 1
      } else {
        low = mid + 1
      }
    }

    return -1
  }

  useEffect(() => {
    if (!audioRef.current || !listRef.current) {
      return
    }

    let controls: Controls
    let prevIndex = -1

    const onTimeUpdate = () => {
      const currentTime = audioRef.current!.currentTime
      const currentIndex = findCurrentLineIndex(currentTime)

      if (currentIndex === -1 || currentIndex === prevIndex) {
        return
      }

      const currentLine = srt[currentIndex]

      prevIndex = currentIndex

      setCurrentLine(currentLine)

      if (isScrolling.current || !listRef.current) {
        return
      }

      controls?.stop()

      const { y: currentScrollTop } = listRef.current.getScrollInfo()
      controls = animate(
        currentScrollTop,
        currentIndex * 84 - window.innerHeight / 2,
        {
          duration: 0.3,
          onComplete() {
            isAnimateScrolling.current = false
          },
          onPlay() {
            isAnimateScrolling.current = true
          },
          onUpdate(value) {
            listRef.current?.scrollTo(Math.round(value))
          },
        },
      )
    }

    audioRef.current.addEventListener('timeupdate', onTimeUpdate)

    return () => {
      audioRef.current?.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [])

  const onDictOpenChange = (open: boolean) => {
    if (open) {
      audioRef.current?.pause()
    } else {
      void audioRef.current?.play()
    }
  }

  const onClickLine = (line: Line) => {
    if (!audioRef.current) {
      return
    }
    audioRef.current.currentTime = line.startSeconds
  }

  const height = window.innerHeight

  return (
    <List
      ref={listRef}
      className='w-full px-8'
      data={srt}
      itemKey='id'
      height={height}
      itemHeight={84}
      onVirtualScroll={() => {
        window.clearTimeout(scrollTimerId.current)

        if (isAnimateScrolling.current) {
          isScrolling.current = false
          return
        }

        isScrolling.current = true
        scrollTimerId.current = window.setTimeout(() => {
          isScrolling.current = false
        }, 3000)
      }}
    >
      {line => {
        const texts = splitLine(line.text)

        return (
          <p
            onClick={() => onClickLine(line)}
            key={line.id}
            className={clsx(
              'cursor-pointer py-6 text-center text-3xl transition-all',
              {
                'text-4xl font-bold': currentLine.id === line.id,
              },
            )}
          >
            {texts.map((text, index) => {
              const { type, value } = text
              if (type === 'word') {
                return (
                  <DictPopover
                    onOpenChange={onDictOpenChange}
                    key={index}
                    text={value}
                  />
                )
              }
              return <Fragment key={index}>{value}</Fragment>
            })}
          </p>
        )
      }}
    </List>
  )
}

function splitLine(text: string): Text[] {
  const words = text.match(/\b[\w']+\b/g)
  const nonWords = text.split(/\b[\w']+\b/)

  if (!words) {
    return []
  }

  return nonWords.flatMap((text, index) => {
    const nonWord: Text = {
      type: 'non-word',
      value: text,
    }

    if (words[index]) {
      return [
        nonWord,
        {
          type: 'word',
          value: words[index],
        },
      ]
    }
    return nonWord
  })
}
