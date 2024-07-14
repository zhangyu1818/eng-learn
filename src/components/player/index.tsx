'use client'

import SRTParser, { type Line } from 'srt-parser-2'

import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import { useToast } from '@/components/ui/use-toast'
import { useFile } from '@/context'

import { Caption } from './caption'
import { AudioPlayer } from './player'

const parser = new SRTParser()

interface PlayerInfo {
  src: string
  srt: Line[]
}

export const Player = () => {
  const router = useRouter()
  const { toast } = useToast()

  const [{ file, srt }] = useFile()

  const [playInfo, setPlayInfo] = useState<PlayerInfo | null>(null)

  const isFileExist = file && srt

  useEffect(() => {
    if (!isFileExist) {
      toast({
        description: '请先上传音频文件和字幕文件',
        title: '未找到播放文件',
        variant: 'destructive',
      })
      router.replace('/')
      return
    }

    const srtPromise = new Promise<string>(resolve => {
      const srtReader = new FileReader()
      srtReader.onload = event => {
        if (!event.target) {
          return
        }

        resolve(event.target.result as string)
      }
      srtReader.readAsText(srt)
    })

    srtPromise.then(srtStr => {
      const src = URL.createObjectURL(file)
      const srt = parser.fromSrt(srtStr)

      setPlayInfo({ src, srt })
    })
  }, [isFileExist])

  if (!playInfo) {
    return null
  }

  return (
    <AudioPlayer src={playInfo.src}>
      <Caption srt={playInfo.srt} />
    </AudioPlayer>
  )
}
