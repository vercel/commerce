import type { GraphQLFetcher } from '@vercel/commerce/api'
import type { CommercejsConfig } from '../'

import { FetcherError } from '@vercel/commerce/utils/errors'

const fetchGraphqlApi: (getConfig: () => CommercejsConfig) => GraphQLFetcher =
  () => async () => {
    throw new FetcherError({
      errors: [{ message: 'GraphQL fetch is not implemented' }],
      status: 500,
    })
  }

export default fetchGraphqlApi
