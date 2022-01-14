import type { GraphQLFetcher } from '@commerce/api'
import type { OrdercloudConfig } from '../'

import { FetcherError } from '@commerce/utils/errors'

const fetchGraphqlApi: (getConfig: () => OrdercloudConfig) => GraphQLFetcher =
  () => async () => {
    throw new FetcherError({
      errors: [{ message: 'GraphQL fetch is not implemented' }],
      status: 500,
    })
  }

export default fetchGraphqlApi
