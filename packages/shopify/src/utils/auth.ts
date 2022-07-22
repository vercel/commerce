import Cookies from 'js-cookie'

import type { CookieAttributes } from 'js-cookie'
import type { FetcherOptions } from '@vercel/commerce/utils/types'

import type {
  Mutation,
  MutationCustomerActivateArgs,
  MutationCustomerActivateByUrlArgs,
  CustomerAccessTokenCreateInput,
} from '../../schema'

import { throwUserErrors } from './throw-user-errors'

import {
  customerActivateByUrlMutation,
  customerAccessTokenCreateMutation,
} from './mutations'

import { SHOPIFY_COOKIE_EXPIRE, SHOPIFY_CUSTOMER_TOKEN_COOKIE } from '../const'

export const getCustomerToken = () => Cookies.get(SHOPIFY_CUSTOMER_TOKEN_COOKIE)

export const setCustomerToken = (
  token: string | null,
  options?: CookieAttributes
) => {
  if (!token) {
    Cookies.remove(SHOPIFY_CUSTOMER_TOKEN_COOKIE)
  } else {
    Cookies.set(
      SHOPIFY_CUSTOMER_TOKEN_COOKIE,
      token,
      options ?? {
        expires: SHOPIFY_COOKIE_EXPIRE,
      }
    )
  }
}

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
