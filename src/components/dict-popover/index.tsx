'use client'

import { IconLoader } from '@tabler/icons-react'

import { useState, useTransition } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { searchDict } from '@/services/dict'

import type { YoudaoResponse } from '@/services/response'

export interface DictPopoverProps {
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
  text: string
}

export const DictPopover = (props: DictPopoverProps) => {
  const { children, onOpenChange, text } = props
  const [isPending, startTransition] = useTransition()
  const [dictResp, setDictResp] = useState<YoudaoResponse | null>(null)

  const onClickText: React.MouseEventHandler<HTMLElement> = event => {
    event.stopPropagation()

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
          <p className='p-2' key={index}>
            {tr.pos && (
              <i className='mr-4 text-secondary-foreground'>{tr.pos}</i>
            )}
            {tr.tran}
          </p>
        ))}
      </div>
    )
  }

  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger onClick={onClickText}>{children}</PopoverTrigger>
      <PopoverContent className='p-4'>
        {isPending ? <IconLoader className='size-6' /> : content}
      </PopoverContent>
    </Popover>
  )
}
