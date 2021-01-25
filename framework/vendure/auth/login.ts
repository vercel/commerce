import type { ServerResponse } from 'http'
import type { LoginMutation, LoginMutationVariables } from '../schema'
import concatHeader from '../api/utils/concat-cookie'
import { getConfig, VendureConfig } from '../api'
import { CommerceError } from '@commerce/utils/errors'
import { ErrorResult } from '../schema'

export const loginMutation = /* GraphQL */ `
  mutation loginServer($email: String!, $password: String!) {
    login(username: $email, password: $password) {
      __typename
      ... on CurrentUser {
        id
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`

export type LoginResult<T extends { result?: any } = { result?: string }> = T

export type LoginVariables = LoginMutationVariables

async function login(opts: {
  variables: LoginVariables
  config?: VendureConfig
  res: ServerResponse
}): Promise<LoginResult>

async function login<T extends { result?: any }, V = any>(opts: {
  query: string
  variables: V
  res: ServerResponse
  config?: VendureConfig
}): Promise<LoginResult<T>>

async function login({
  query = loginMutation,
  variables,
  res: response,
  config,
}: {
  query?: string
  variables: LoginVariables
  res: ServerResponse
  config?: VendureConfig
}): Promise<LoginResult> {
  config = getConfig(config)

  const { data, res } = await config.fetch<LoginMutation>(query, { variables })

  if (data.login.__typename !== 'CurrentUser') {
    throw new CommerceError({ message: (data.login as ErrorResult).message })
  }
  // Bigcommerce returns a Set-Cookie header with the auth cookie
  let cookie = res.headers.get('Set-Cookie')

  if (cookie && typeof cookie === 'string') {
    // In development, don't set a secure cookie or the browser will ignore it
    if (process.env.NODE_ENV !== 'production') {
      cookie = cookie.replace('; Secure', '')
      // SameSite=none can't be set unless the cookie is Secure
      // bc seems to sometimes send back SameSite=None rather than none so make
      // this case insensitive
      cookie = cookie.replace(/; SameSite=none/gi, '; SameSite=lax')
    }

    response.setHeader(
      'Set-Cookie',
      concatHeader(response.getHeader('Set-Cookie'), cookie)!
    )
  }

  return {
    result: data.login.id.toString(),
  }
}

export default login
