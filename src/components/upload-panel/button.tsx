'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useFile } from '@/context'

export const UploadSubmit = () => {
  const [{ file, srt }] = useFile()

  if (!file || !srt) {
    return null
  }

  return (
    <Button className='mt-4' size='lg' asChild>
      <Link href='/player'>开始播放</Link>
    </Button>
  )
}
