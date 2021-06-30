import { FetcherError } from '@commerce/utils/errors'
import type { GraphQLFetcher } from '@commerce/api'
import Commercetools from '@framework/utils/commercetools'
import { provider } from '@framework/api'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {}
) => {
  const { config } = provider
  const commercetools = Commercetools({
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    projectKey: config.projectKey,
    host: config.host,
    oauthHost: config.oauthHost,
    concurrency: config.concurrency,
  })
  const { requestExecute } = commercetools
  try {
    const result = await requestExecute
      .graphql()
      .post({
        body: {
          query,
          variables,
        },
      })
      .execute()

    return result.body
  } catch (err) {
    throw err
  }
}

export default fetchGraphqlApi
