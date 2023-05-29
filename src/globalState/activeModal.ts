import { ModalCollectionIds } from '@main/components/organisms/ModalCollection/types'
import { atomWithStore } from 'jotai-zustand'
import { create } from 'zustand'

export type ActiveModalState = {
  modalId?: ModalCollectionIds | null
  modalProps?: any
}

export const ActiveModalStore = create<ActiveModalState>()(() => ({
  modalId: null,
  modalProps: {},
}))

export const ActiveModalAtom = atomWithStore(ActiveModalStore)

export const updateActiveModalState = (data: {
  modalId: ModalCollectionIds | null
  modalProps?: any
}) => {
  ActiveModalStore.setState(state => ({ ...state, ...data }))
}

export const getActiveModalState = () => ActiveModalStore.getState()
