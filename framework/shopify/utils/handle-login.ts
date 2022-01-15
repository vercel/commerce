import { FetcherOptions } from '@vercel/commerce/utils/types'
import { CustomerAccessTokenCreateInput } from '../../schema'
import { setCustomerToken } from './customer-token'
import { customerAccessTokenCreateMutation } from './mutations'
import throwUserErrors from './throw-user-errors'

const handleLogin = (data: any) => {
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

export default handleLogin
