import type { GraphQLFetcher } from '@vercel/commerce/api'
import type { OlistConfig } from '../'

import { FetcherError } from '@vercel/commerce/utils/errors'

const fetchGraphqlApi: (getConfig: () => OlistConfig) => GraphQLFetcher =
  () => async () => {
    throw new FetcherError({
      errors: [{ message: 'GraphQL fetch is not implemented' }],
      status: 500,
    })
  }

export default fetchGraphqlApi
