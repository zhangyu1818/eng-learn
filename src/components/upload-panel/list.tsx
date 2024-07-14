'use client'

import { IconTrash } from '@tabler/icons-react'

import { useFile } from '@/context'

export const UploadList = () => {
  const [{ file, srt }, setFile] = useFile()

  const list = [
    [file, '音频文件'],
    [srt, '字幕文件'],
  ] as const

  return (
    <div className='mt-2'>
      {list.map(([file, type]) => {
        if (!file) {
          return null
        }

        return (
          <p key={type} className='flex'>
            <strong>{type}：</strong>
            <span className='flex-1'>{file.name}</span>
            <span
              className='ml-4'
              role='button'
              onClick={() => {
                if (type === '音频文件') {
                  setFile(prev => ({ ...prev, file: null }))
                } else {
                  setFile(prev => ({ ...prev, srt: null }))
                }
              }}
            >
              <IconTrash />
            </span>
          </p>
        )
      })}
    </div>
  )
}
