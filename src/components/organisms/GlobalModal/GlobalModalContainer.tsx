import { ICON_COLLECTION } from '@main/components/molecules/IconCollection'
import { closeModal } from '@main/utils/modal'
import React, { PropsWithChildren } from 'react'

export const GlobalModalContainer = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <div
      className="fixed w-full h-full flex justify-center items-center bg-black-200/20 z-20"
      aria-modal
    >
      <div className="px-4 pb-4 pt-8 bg-white-200 rounded-lg relative">
        <button
          className="hover:bg-white-400 rounded-md absolute top-2 right-2 h-6 w-6"
          onClick={() => {
            closeModal()
          }}
        >
          {ICON_COLLECTION['cross']}
        </button>
        {children}
      </div>
    </div>
  )
}
