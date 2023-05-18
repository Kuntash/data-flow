import { Client, Databases } from 'appwrite'

export const readData = async () => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT as string)
    .setProject(process.env.APPWRITE_PROJECT_ID as string)

  const databases = new Databases(client)
  const document = await databases.getDocument(
    '6463eafdbae8f83f8d77',
    '6463eb16be2980859fa4',
    '6463ec0e10744fa0f235',
  )

  return document
}
