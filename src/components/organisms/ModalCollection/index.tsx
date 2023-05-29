import { CreateNewProjectModal } from './CreateNewProjectModal'

export const ModalCollection = (props: any) => {
  const data = {
    CreateNewProjectModal: <CreateNewProjectModal {...props} />,
  }

  return data
}
