// @ts-ignore
import {
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2'
import {
  COMMERCETOOLS_PROJECT_KEY,
  COMMERCETOOLS_CLIENT_ID,
  COMMERCETOOLS_CLIENT_SECRET,
  COMMERCETOOLS_REGION,
} from './const'

const scopes = [`manage_project:${COMMERCETOOLS_PROJECT_KEY}`]

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${COMMERCETOOLS_REGION}.commercetools.com`,
  projectKey: COMMERCETOOLS_PROJECT_KEY!,
  credentials: {
    clientId: COMMERCETOOLS_CLIENT_ID!,
    clientSecret: COMMERCETOOLS_CLIENT_SECRET!,
  },
  scopes,
  fetch,
}

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${COMMERCETOOLS_REGION}.commercetools.com`,
  fetch,
}

// Export the ClientBuilder
const client = new ClientBuilder()
  .withProjectKey(COMMERCETOOLS_PROJECT_KEY!) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .build()

export default { client, COMMERCETOOLS_PROJECT_KEY }
