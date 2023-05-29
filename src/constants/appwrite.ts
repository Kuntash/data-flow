import { QueryClient } from '@tanstack/react-query'

export const DATA_FLOW_DB = 'DataFlowDB'
export const USER_COLLECTION = 'Users'
export const ATTRIBUTES_COLLECTION = 'Attributes'
export const PROJECT_COLLECTION = 'Projects'
export const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1'
export const APPWRITE_PROJECT_ID = '6463e57130cb10943169'
export const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } },
})
