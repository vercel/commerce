import { Fetcher } from '@vercel/commerce/utils/types'
import { CommerceError } from '@vercel/commerce/utils/errors'
import { handleFetchResponse } from './utils'
import swell from './swell'

const fetcher: Fetcher = async ({ method = 'get', variables, query }) => {
  async function callSwell() {
    if (Array.isArray(variables)) {
      const arg1 = variables[0]
      const arg2 = variables[1]
      const response = await swell[query!][method](arg1, arg2)
      return handleFetchResponse(response)
    } else {
      const response = await swell[query!][method](variables)
      return handleFetchResponse(response)
    }
  }

  if (query && query in swell) {
    return await callSwell()
  } else {
    throw new CommerceError({ message: 'Invalid query argument!' })
  }
}

export default fetcher
