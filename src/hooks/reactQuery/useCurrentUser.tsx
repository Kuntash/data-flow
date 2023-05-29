import { UserState } from '@main/globalState/user'
import { getCurrentUser } from '@main/utils'
import { useQuery } from '@tanstack/react-query'

export const useCurrentUser = () => {
  return useQuery<UserState>(['UserData'], () => getCurrentUser())
}
