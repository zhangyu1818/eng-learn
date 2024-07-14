'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useFile } from '@/context'

export const UploadSubmit = () => {
  const [{ file, srt }] = useFile()
  const router = useRouter()

  if (!file || !srt) {
    return null
  }

  return (
    <Button
      variant='primary'
      className='mt-2'
      onPress={() => router.push('/player')}
    >
      开始播放
    </Button>
  )
}
