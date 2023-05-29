import { ICON_COLLECTION } from '@main/components/molecules/IconCollection'
import { openModal } from '@main/utils/modal'
import React from 'react'

export const NewProjectButton = () => {
  const onClick = () => {
    openModal({ modalId: 'CreateNewProjectModal' })
  }

  return (
    <button
      onClick={onClick}
      className="w-full p-2.5 bg-brand-dark rounded-md text-white-100 flex gap-x-2.5 justify-center items-center mb-6"
    >
      <span className="w-4 h-4">{ICON_COLLECTION['plus']}</span>
      <p className="text-base">New project</p>
    </button>
  )
}
