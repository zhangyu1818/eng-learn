'use client'

import { clsx } from 'clsx'
import UploadImp from 'rc-upload'

import { useFile } from '@/context'

export interface UploadProps {
  children?: React.ReactNode
}

export const Upload = (props: UploadProps) => {
  const { children } = props

  const [{ file, srt }, setFile] = useFile()

  const emptyFile = !file
  const emptySrt = !srt
  const disable = !emptyFile && !emptySrt

  const accept = [emptyFile ? '.mp3' : '', emptySrt ? '.srt' : ''].join(', ')

  return (
    <UploadImp
      prefixCls='upload'
      className={clsx('rounded-xl border border-zinc-500 p-36', {
        'opacity-50 cursor-not-allowed': disable,
      })}
      accept={accept}
      disabled={disable}
      beforeUpload={file => {
        if (file.name.endsWith('.mp3')) {
          setFile(prev => ({ ...prev, file }))
        } else if (file.name.endsWith('.srt')) {
          setFile(prev => ({ ...prev, srt: file }))
        }

        return false
      }}
      type='drag'
    >
      {children}
    </UploadImp>
  )
}
