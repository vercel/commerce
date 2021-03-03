import { ValidationError } from '@commerce/utils/errors'
import { FetcherOptions } from '@commerce/utils/types'
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

    const errors = customerActivateByUrl?.customerUserErrors
    if (errors && errors.length) {
      const [error] = errors
      throw new ValidationError({
        message: error.message,
      })
    }
  } catch (error) {}
}

export default handleAccountActivation
