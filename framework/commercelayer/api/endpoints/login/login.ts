import { FetcherError } from '@commerce/utils/errors'
import { getAccessToken } from '../../index'
import type { LoginEndpoint } from '.'

const login: LoginEndpoint['handlers']['login'] = async ({
  res,
  body: { email, password },
  config,
  commerce,
}) => {
  if (!(email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  try {
    const user = { email, password };
    const getToken = await getAccessToken(user);
    await config.apiFetch(`/api/customers/${getToken.customerId}`, {
      method: 'GET'
    })
  } catch (error) {
    if (error instanceof FetcherError &&
      /invalid credentials/i.test(error.message)) {
        return res.status(401).json({
          data: null,
          errors: [
            {
              message:
                'Cannot find an account that matches the provided credentials',
              code: 'INVALID_CREDENTIALS',
            },
          ],
        })
      }

    throw error
  }

  await commerce.login({ variables: { email, password }, config, res })

  res.status(200).json({ data: null })
}

export default login