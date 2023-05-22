const sdk = require('node-appwrite')
/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client()

  if (
    !req.variables['APPWRITE_ENDPOINT'] ||
    !req.variables['APPWRITE_API_KEY'] ||
    !req.variables['APPWRITE_PROJECT_ID']
  ) {
    console.warn(
      'Environment variables are not set. Function cannot use Appwrite SDK.',
    )
    res.json({
      error: {
        message: 'APPWRITE keys not found',
      },
    })
  }

  client
    .setEndpoint(req.variables['APPWRITE_ENDPOINT'])
    .setProject(req.variables['APPWRITE_PROJECT_ID'])
    .setKey(req.variables['APPWRITE_API_KEY'])
    .setSelfSigned(true)

  const eventData = JSON.parse(req.variables.APPWRITE_FUNCTION_EVENT_DATA)
  const databases = new sdk.Databases(client)
  const { $id, $createdAt, $updatedAt, name, email } = eventData

  await databases.createDocument(
    'DataFlowDB',
    'Users',
    $id,
    {
      uid: $id,
      createdAt: $createdAt,
      updatedAt: $updatedAt,
      name,
      email,
    },
    [
      sdk.Permission.read(sdk.Role.any()),
      sdk.Permission.update(sdk.Role.team('admin')),
      sdk.Permission.update(sdk.Role.team('writers')),
      sdk.Permission.update(sdk.Role.user($id)),
      sdk.Permission.delete(sdk.Role.user('admin')),
      sdk.Permission.delete(sdk.Role.user($id)),
    ],
  )
  res.json({
    message: 'Account document successfully created',
  })
}
