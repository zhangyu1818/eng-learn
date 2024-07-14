'use client'

import { IconLoader } from '@tabler/icons-react'
import { Button, Dialog, DialogTrigger } from 'react-aria-components'

import { useState, useTransition } from 'react'

import { Popover } from '@/components/ui/popover'
import { searchDict } from '@/services/dict'

import type { YoudaoResponse } from '@/services/response'

export interface DictPopoverProps {
  onOpenChange?: (open: boolean) => void
  text: string
}

export const DictPopover = (props: DictPopoverProps) => {
  const { onOpenChange, text } = props
  const [isPending, startTransition] = useTransition()
  const [dictResp, setDictResp] = useState<YoudaoResponse | null>(null)

  const onClickText = () => {
    if (dictResp) {
      return
    }

    startTransition(async () => {
      const resp = await searchDict(text)
      setDictResp(resp)
    })
  }

  let content: React.ReactNode = null

  if (dictResp) {
    const { word } = dictResp.ec

    content = (
      <div>
        {word.trs?.map((tr, index) => (
          <p className='break-words p-2' key={index}>
            {tr.pos && <i className='mr-4'>{tr.pos}</i>}
            {tr.tran}
          </p>
        ))}
      </div>
    )
  }

  return (
    <DialogTrigger onOpenChange={onOpenChange}>
      <Button onPress={onClickText}>{text}</Button>
      <Popover showArrow className='min-w-[250px] max-w-[50vw]'>
        <Dialog className='p-3'>
          {isPending ? (
            <div className='flex justify-center'>
              <IconLoader className='size-6' />
            </div>
          ) : (
            content
          )}
        </Dialog>
      </Popover>
    </DialogTrigger>
  )
}
