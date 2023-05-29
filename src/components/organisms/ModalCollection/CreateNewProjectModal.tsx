import { roboto } from '@main/utils/fonts'
import React from 'react'

export type CreateNewProjectModalProps = {}
export const CreateNewProjectModal = () => {
  return (
    <div className={`${roboto.className} p-2 w-[400px] text-center`}>
      <h3 className="text-xl text-black-200/90 mb-4 font-medium">
        Create a new project
      </h3>

      {/*  Inputs for create new project */}
    </div>
  )
}
