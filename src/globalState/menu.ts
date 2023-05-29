import { atomWithStore } from 'jotai-zustand'
import { create } from 'zustand'

export type MenuState = {
  selectedMenuId: string
  expandedMenuIds: string[]
}

export const MenuStore = create<MenuState>()(() => ({
  selectedMenuId: 'overview',
  expandedMenuIds: [],
}))

export const MenuAtom = atomWithStore(MenuStore)

export const updateMenuState = (data: any) => {
  MenuStore.setState(state => ({ ...state, ...data }))
}

export const getMenuState = () => MenuStore.getState()
