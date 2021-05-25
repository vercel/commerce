import type { ServerResponse } from 'http'
import concatHeader from '../api/utils/concat-cookie'
import { AquilacmsConfig, getConfig } from '../api'
import { serialize } from 'cookie'

export type LoginResult<T extends { result?: any } = { result?: string }> = T

export type LoginVariables = { email: string; password: string }

async function login(opts: {
  variables: LoginVariables
  config?: AquilacmsConfig
  res: ServerResponse
}): Promise<LoginResult>

async function login<T extends { result?: any }, V = any>(opts: {
  query: string
  variables: V
  res: ServerResponse
  config?: AquilacmsConfig
}): Promise<LoginResult<T>>

async function login({
  variables,
  res: response,
  config,
}: {
  query?: string
  variables: LoginVariables
  res: ServerResponse
  config?: AquilacmsConfig
}): Promise<LoginResult> {
  config = getConfig(config)

  const { data, code: result } = await config.storeApiFetch('/v2/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username: variables.email,
      password: variables.password,
    }),
  })

  response.setHeader(
    'Set-Cookie',
    concatHeader(
      response.getHeader('Set-Cookie'),
      serialize(config.customerCookie, data, { sameSite: 'lax', path: '/' })
    )!
  )

  return {
    result,
  }
}

export default login
