import React from 'react'
import { useAllProjectData } from './reactQuery/useAllProjectData'

export const useSingleProjectData = (props: { projectId: string }) => {
  const { projectId } = props
  const { data: allProjectData } = useAllProjectData()

  return <div>useSingleProjectData</div>
}
