import { IconMusic } from '@tabler/icons-react'

import { UploadSubmit } from './button'
import { UploadList } from './list'
import { Upload } from './upload'

export const UploadPanel = () => {
  return (
    <div className='flex min-h-svh flex-col items-center gap-4 pt-[15vh]'>
      <Upload>
        <div className='flex flex-col items-center gap-6'>
          <IconMusic className='size-12' />
          <p className='text-lg font-semibold'>
            点击或拖拽到此处上传音频文件<small>(.mp3)</small>和字幕文件
            <small>(.srt)</small>
          </p>
        </div>
      </Upload>
      <UploadList />
      <UploadSubmit />
    </div>
  )
}
