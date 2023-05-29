import { ModalCollectionIds } from '@main/components/organisms/ModalCollection/types'
import { updateActiveModalState } from '@main/globalState/activeModal'

export const openModal = (options: {
  modalId: ModalCollectionIds
  modalProps?: any
}) => {
  const { modalId, modalProps } = options
  updateActiveModalState({ modalId, modalProps })
}

export const closeModal = () => {
  updateActiveModalState({ modalId: null, modalProps: null })
}
