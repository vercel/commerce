import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'
import { createQueueMiddleware } from '@commercetools/sdk-middleware-queue'
import { createClient } from '@commercetools/sdk-client'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'
import fetch from 'node-fetch'

interface Props {
  clientId: string
  clientSecret: string
  projectKey: string
  host: string
  oauthHost: string
  concurrency: string | number
}

export default ({
  clientId,
  clientSecret,
  projectKey,
  host,
  oauthHost,
  concurrency = 10,
}: Props) => {
  interface Commercetools {
    requestExecute: any
  }

  const ctpClient = createClient({
    middlewares: [
      createAuthMiddlewareForClientCredentialsFlow({
        host: oauthHost,
        projectKey,
        credentials: {
          clientId,
          clientSecret,
        },
        fetch,
      }),
      createQueueMiddleware({ concurrency }),
      createHttpMiddleware({ host, fetch }),
    ],
  })

  const apiRoot = createApiBuilderFromCtpClient(ctpClient)
  const commercetools = <Commercetools>{
    requestExecute: apiRoot.withProjectKey({ projectKey }),
  }

  return commercetools
}
