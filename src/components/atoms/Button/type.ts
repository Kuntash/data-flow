import { ICON_COLLECTION } from '@main/components/molecules/IconCollection'
import { ButtonHTMLAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  iconName?: keyof typeof ICON_COLLECTION
  variant: 'primary' | 'secondary'
}
