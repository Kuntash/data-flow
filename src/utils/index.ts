import { Account, Client, Databases, ID } from 'appwrite'
import { CreateAccountType } from './types'
import { getAppWriteState, setAppWriteClient } from '@main/globalState/appwrite'
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
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

  const userId = ID.unique()
  console.log('user id', userId)
  try {
    await account.create(userId, email, password, name)
    await account.createEmailSession(email, password)
    const { $id, email: userEmail, name: userName } = await account.get()
    updateUserState({ uid: $id, name: userName, email: userEmail })
    console.log('Account successfully created')
  } catch (error) {
    console.error('An error happened while creating account', error)
  }
}

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
