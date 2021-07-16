import { FetcherOptions } from '@commerce/utils/types'
import throwUserErrors from './throw-user-errors'

import {
  MutationCustomerActivateArgs,
  MutationCustomerActivateByUrlArgs,
} from '../schema'
import { Mutation } from '../schema'
import { customerActivateByUrlMutation } from './mutations'

const handleAccountActivation = async (
  fetch: <T = any, B = Body>(options: FetcherOptions<B>) => Promise<T>,
  input: MutationCustomerActivateByUrlArgs
) => {
  try {
    const { customerActivateByUrl } = await fetch<
      Mutation,
      MutationCustomerActivateArgs
    >({
      query: customerActivateByUrlMutation,
      variables: {
        input,
      },
    })

    throwUserErrors(customerActivateByUrl?.customerUserErrors)
  } catch (error) {}
}

export default handleAccountActivation
