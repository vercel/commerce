import type { FetcherOptions } from '@vercel/commerce/utils/types'

import type {
  Mutation,
  MutationCustomerActivateArgs,
  MutationCustomerActivateByUrlArgs,
  CustomerAccessTokenCreateInput,
} from '../../schema'

import { setCustomerToken } from './helpers'
import { throwUserErrors } from './throw-user-errors'

import {
  customerActivateByUrlMutation,
  customerAccessTokenCreateMutation,
} from './mutations'

export const handleLogin = (data: any) => {
  const response = data.customerAccessTokenCreate
  throwUserErrors(response?.customerUserErrors)

  const customerAccessToken = response?.customerAccessToken
  const accessToken = customerAccessToken?.accessToken

  if (accessToken) {
    setCustomerToken(accessToken)
  }

  return customerAccessToken
}

export const handleAutomaticLogin = async (
  fetch: <T = any, B = Body>(options: FetcherOptions<B>) => Promise<T>,
  input: CustomerAccessTokenCreateInput
) => {
  try {
    const loginData = await fetch({
      query: customerAccessTokenCreateMutation,
      variables: {
        input,
      },
    })
    handleLogin(loginData)
  } catch (error) {}
}

export const handleAccountActivation = async (
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
