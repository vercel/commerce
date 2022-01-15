import { FetcherOptions } from '@vercel/commerce/utils/types'
import { CreateToken, Mutation, MutationTokenCreateArgs } from '../../schema'
import { setToken, setCSRFToken } from './customer-token'
import * as mutation from './mutations'
import throwUserErrors from './throw-user-errors'

const handleLogin = (data: CreateToken) => {
  throwUserErrors(data?.errors)

  const token = data?.token

  if (token) {
    setToken(token)
    setCSRFToken(token)
  }

  return token
}

export const handleAutomaticLogin = async (
  fetch: <T = any, B = Body>(options: FetcherOptions<B>) => Promise<T>,
  input: MutationTokenCreateArgs
) => {
  try {
    const { tokenCreate } = await fetch<Mutation, MutationTokenCreateArgs>({
      query: mutation.SessionCreate,
      variables: { ...input },
    })
    handleLogin(tokenCreate!)
  } catch (error) {
    //
  }
}

export default handleLogin
