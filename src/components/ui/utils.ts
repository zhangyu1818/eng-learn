import { composeRenderProps } from 'react-aria-components'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

export const focusRing = tv({
  base: 'outline outline-offset-2 outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight]',
  variants: {
    isFocusVisible: {
      false: 'outline-0',
      true: 'outline-2',
    },
  },
})

export function composeTailwindRenderProps<T>(
  className: ((v: T) => string) | string | undefined,
  tw: string,
): ((v: T) => string) | string {
  return composeRenderProps(className, className => twMerge(tw, className))
}
