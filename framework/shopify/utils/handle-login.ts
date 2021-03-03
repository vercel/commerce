import { ValidationError } from '@commerce/utils/errors'
import { FetcherOptions } from '@commerce/utils/types'
import { CustomerAccessTokenCreateInput } from '../schema'
import { setCustomerToken } from './customer-token'
import { customerAccessTokenCreateMutation } from './mutations'

const getErrorMessage = ({
  code,
  message,
}: {
  code: string
  message: string
}) => {
  switch (code) {
    case 'UNIDENTIFIED_CUSTOMER':
      message = 'Cannot find an account that matches the provided credentials'
      break
  }
  return message
}

const handleLogin = (data: any) => {
  const response = data.customerAccessTokenCreate
  const errors = response?.customerUserErrors

  if (errors && errors.length) {
    throw new ValidationError({
      message: getErrorMessage(errors[0]),
    })
  }

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
