'use client'

import { clsx } from 'clsx'
import List from 'rc-virtual-list'

import { Fragment, useEffect, useState } from 'react'

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

  const audioRef = usePlayerRef()

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
    if (!audioRef.current) {
      return
    }

    const onTimeUpdate = () => {
      const currentTime = audioRef.current!.currentTime
      const index = findCurrentLineIndex(currentTime)
      const currentLine = srt[index]

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!currentLine) {
        return
      }

      setCurrentLine(currentLine)

      const { id } = currentLine

      const element = document.querySelector(`[data-line="${id}"]`)
      element?.scrollIntoView({ block: 'center' })
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
      className='w-full px-8'
      data={srt}
      itemKey='id'
      height={height}
      itemHeight={84}
    >
      {line => {
        const texts = splitLine(line.text)

        return (
          <p
            onClick={() => onClickLine(line)}
            key={line.id}
            data-line={line.id}
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
                  >
                    <span>{value}</span>
                  </DictPopover>
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
