import React from 'react'
import { ButtonProps } from './type'
import { roboto } from '@main/utils/fonts'
import { ICON_COLLECTION } from '@main/components/molecules/IconCollection'

export const Button = (props: ButtonProps) => {
  const { iconName, label, variant, ...rest } = props

  const variantStyles =
    variant === 'primary'
      ? {
          button: 'text-white-100 bg-brand-base',
          icon: 'bg-white-100',
        }
      : {
          button: 'text-black-300 border-[0.5px] border-white-300',
          icon: '',
        }
  return (
    <button
      className={`${roboto.className} ${variantStyles.button} text-sm font-normal py-2.5 px-2.5 rounded-md flex gap-x-2.5`}
      {...rest}
    >
      {iconName && (
        <div
          className={`${variantStyles.icon} border-[0.5px] border-white-300 rounded-full w-5 h-5 text-brand-base flex items-center justify-center`}
        >
          {ICON_COLLECTION[iconName]}
        </div>
      )}
      {label}
    </button>
  )
}
