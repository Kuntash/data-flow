import { getProjectData } from '@main/utils'
import { useQuery } from '@tanstack/react-query'
import { useCurrentUser } from './useCurrentUser'

export const useAllProjectData = () => {
  const { data: currentUser } = useCurrentUser()
  return useQuery(
    ['AllProjectData'],
    () => getProjectData({ projectIds: currentUser?.projects as string[] }),
    {
      enabled: !!currentUser?.projects,
    },
  )
}
