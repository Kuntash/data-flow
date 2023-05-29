import React, { AllHTMLAttributes, PropsWithChildren } from 'react'

type MenuProps = {
  isActive?: boolean
} & AllHTMLAttributes<HTMLDivElement>
export const Menu = (props: PropsWithChildren<MenuProps>) => {
  const { children, isActive, ...rest } = props
  return (
    <div
      className={`${
        isActive && 'bg-white-400'
      } p-3 hover:bg-white-400 rounded-md cursor-pointer`}
      {...rest}
    >
      {children}
    </div>
  )
}
