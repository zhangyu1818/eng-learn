import {
  Button as RACButton,
  composeRenderProps,
  type ButtonProps as RACButtonProps,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import React from 'react'

import { focusRing } from './utils'

export interface ButtonProps extends RACButtonProps {
  variant?: 'destructive' | 'icon' | 'primary' | 'secondary'
}

const button = tv({
  base: 'cursor-default rounded-lg border border-black/10 px-5 py-2 text-center text-sm shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition dark:border-white/10 dark:shadow-none',
  defaultVariants: {
    variant: 'primary',
  },
  extend: focusRing,
  variants: {
    isDisabled: {
      true: 'border-black/5 bg-gray-100 text-gray-300 dark:border-white/5 dark:bg-zinc-800 dark:text-zinc-600 forced-colors:text-[GrayText]',
    },
    variant: {
      destructive: 'bg-red-700 text-white hover:bg-red-800 pressed:bg-red-900',
      icon: 'flex items-center justify-center border-0 p-1 text-gray-600 hover:bg-black/[5%] pressed:bg-black/10 disabled:bg-transparent dark:text-zinc-400 dark:hover:bg-white/10 dark:pressed:bg-white/20',
      primary: 'bg-blue-600 text-white hover:bg-blue-700 pressed:bg-blue-800',
      secondary:
        'bg-gray-100 text-gray-800 hover:bg-gray-200 pressed:bg-gray-300 dark:bg-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-500 dark:pressed:bg-zinc-400',
    },
  },
})

export function Button(props: ButtonProps) {
  return (
    <RACButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        button({ ...renderProps, className, variant: props.variant }),
      )}
    />
  )
}
