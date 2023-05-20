import { atomWithStore } from 'jotai-zustand'
import { create } from 'zustand'

export type UserState = {
  isLoggedIn: boolean
}

export const UserStore = create<UserState>()(() => ({
  isLoggedIn: false,
}))

export const UserAtom = atomWithStore(UserStore)

export const updateUserState = (data: any) => {
  UserStore.setState(state => ({ ...state, ...data }))
}

export const getUserState = () => UserStore.getState()
