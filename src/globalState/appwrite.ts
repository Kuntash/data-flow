import { Client } from 'appwrite'
import { create } from 'zustand'

export type AppWriteState = {
  client: Client | null
}

export const AppWriteStore = create<AppWriteState>()(() => ({
  client: null,
}))

export const setAppWriteClient = (client: Client) => {
  AppWriteStore.setState(state => ({ ...state, client }))
}

export const getAppWriteState = () => AppWriteStore.getState()
