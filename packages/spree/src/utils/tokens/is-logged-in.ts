import { ensureUserTokenResponse } from './user-token-response'

const isLoggedIn = (): boolean => {
  const userTokenResponse = ensureUserTokenResponse()

  return !!userTokenResponse
}

export default isLoggedIn
