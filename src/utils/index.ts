import { Account, Client, Databases, ID, Permission, Role } from 'appwrite'
import {
  CreateAccountType,
  CreateAttributeType,
  CreateNodeType,
  CreateProjectType,
  LoginAccountType,
  ProjectSchema,
} from './types'
import { getAppWriteState, setAppWriteClient } from '@main/globalState/appwrite'
import {
  APPWRITE_ENDPOINT,
  APPWRITE_PROJECT_ID,
  ATTRIBUTES_COLLECTION,
  DATA_FLOW_DB,
  PROJECT_COLLECTION,
  USER_COLLECTION,
  queryClient,
} from '@main/constants/appwrite'
import { getUserState, updateUserState } from '@main/globalState/user'

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
      queryClient.setQueryData(['UserData'], {
        ...document,
        isLoggedIn: true,
      })
    }, 1000)
    console.log('Sign up successful')
  } catch (error) {
    console.error('An error happened while creating account', error)
  }
}

export const getCurrentUser = async () => {
  const client = getAppWriteClient()
  const account = new Account(client)
  const databases = new Databases(client)
  const { $id } = await account.get()

  if ($id) {
    const document = await databases.getDocument(
      DATA_FLOW_DB,
      USER_COLLECTION,
      $id,
    )
    return { ...document, isLoggedIn: true }
  }

  return { isLoggedIn: false }
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
    queryClient.setQueryData(['UserData'], {
      ...document,
      isLoggedIn: true,
    })
  } catch (error) {
    console.error('An error happened while logging into account')
  }
}

export const signOutAccount = async () => {}

export const createAttribute = async (formData: CreateAttributeType) => {
  const { label, createdBy, description, type } = formData
  const client = getAppWriteClient()
  const databases = new Databases(client)
  const docId = ID.unique()

  try {
    await databases.createDocument(
      DATA_FLOW_DB,
      ATTRIBUTES_COLLECTION,
      docId,
      {
        label,
        type,
        description,
        createdBy,
      },
      [
        Permission.read(Role.any()),
        Permission.update(Role.team('admin')),
        Permission.update(Role.user(createdBy)),
        Permission.delete(Role.team('admin')),
        Permission.delete(Role.user(createdBy)),
      ],
    )
  } catch (error) {
    console.error('Error while creating attribute', error)
  }
}

export const getProjectData = async (formData: { projectIds: string[] }) => {
  const { projectIds } = formData
  if (!projectIds || projectIds?.length === 0)
    return { allProjects: [], projectsMap: {} }

  /* Fetching al projects */

  try {
    const client = getAppWriteClient()
    const databases = new Databases(client)
    const projects = []
    const projectsMap: { [key: string]: ProjectSchema } = {}
    for (let index = 0; index < projectIds?.length; index += 1) {
      const document = await databases.getDocument<ProjectSchema>(
        DATA_FLOW_DB,
        PROJECT_COLLECTION,
        projectIds[index],
      )
      projects.push({ ...document, id: document?.$id })
      projectsMap[document?.$id] = { ...document, id: document?.$id }
    }

    return {
      allProjects: projects,
      projectsMap,
    }
  } catch (error) {
    console.error('Error fetching all projects', error)
  }
}

export const createProject = async (formData: CreateProjectType) => {
  const { name, createdBy, nodes, description } = formData
  const client = getAppWriteClient()
  const databases = new Databases(client)
  const docId = ID.unique()

  try {
    await databases.createDocument(
      DATA_FLOW_DB,
      PROJECT_COLLECTION,
      docId,
      {
        createdBy,
        name,
        nodes,
        description,
      },
      [
        Permission.read(Role.any()),
        Permission.update(Role.team('admin')),
        Permission.update(Role.user(createdBy)),
        Permission.delete(Role.team('admin')),
        Permission.delete(Role.user(createdBy)),
      ],
    )
  } catch (error) {
    console.error('Error while creating the project', error)
  }
}

export const createNode = async (formData: CreateNodeType) => {
  const { data, position, type } = formData
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
