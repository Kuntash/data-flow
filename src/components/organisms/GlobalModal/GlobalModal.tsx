'use client'

import { ActiveModalAtom } from '@main/globalState/activeModal'
import { useAtom } from 'jotai'
import React from 'react'
import { createPortal } from 'react-dom'

import { ModalCollection } from '../ModalCollection'
import { GlobalModalContainer } from './GlobalModalContainer'

export const GlobalModal = () => {
  const [activeModal] = useAtom(ActiveModalAtom)

  if (!activeModal.modalId) return null

  const modalElement = ModalCollection(activeModal.modalProps)[
    'CreateNewProjectModal'
  ]

  return createPortal(
    <GlobalModalContainer>{modalElement}</GlobalModalContainer>,
    document.getElementById('modal-root') as HTMLElement,
  )
}
