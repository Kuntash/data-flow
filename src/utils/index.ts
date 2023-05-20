import { Account, Client, Databases, ID } from 'appwrite'
import { CreateAccountType, LoginAccountType } from './types'
import { getAppWriteState, setAppWriteClient } from '@main/globalState/appwrite'
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  DATA_FLOW_DB,
  USER_COLLECTION,
} from '@main/constants/appwrite'
import { updateUserState } from '@main/globalState/user'

export const getAppWriteClient = () => {
  const { client: clientState } = getAppWriteState()
  if (clientState) return clientState
  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT as string)
    .setProject(APPWRITE_PROJECT_ID as string)

  setAppWriteClient(client)
  return client
}

export const createAccount = async (formData: CreateAccountType) => {
  const { name, email, password } = formData
  const client = getAppWriteClient()
  const account = new Account(client)
  const databases = new Databases(client)

  const userId = ID.unique()
  try {
    await account.create(userId, email, password, name)
    await account.createEmailSession(email, password)
    const { $id } = await account.get()

    setTimeout(async () => {
      const document = await databases.getDocument(
        DATA_FLOW_DB,
        USER_COLLECTION,
        $id,
      )
      updateUserState({ ...document, isLoggedIn: true })
    }, 1000)
    console.log('Sign up successful')
  } catch (error) {
    console.error('An error happened while creating account', error)
  }
}

export const loginAccount = async (formData: LoginAccountType) => {
  const { email, password } = formData
  const client = getAppWriteClient()
  const account = new Account(client)
  const databases = new Databases(client)
  try {
    await account.createEmailSession(email, password)
    const { $id } = await account.get()
    const document = await databases.getDocument(
      DATA_FLOW_DB,
      USER_COLLECTION,
      $id,
    )
    updateUserState({ ...document, isLoggedIn: true })
  } catch (error) {
    console.error('An error happened while logging into account')
  }
}

export const signOutAccount = async () => {}

export const readData = async () => {
  const client = getAppWriteClient()

  const databases = new Databases(client)
  const document = await databases.getDocument(
    '6463eafdbae8f83f8d77',
    '6463eb16be2980859fa4',
    '6463ec0e10744fa0f235',
  )

  return document
}
