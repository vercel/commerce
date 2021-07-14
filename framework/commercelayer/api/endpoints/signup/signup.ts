import { CommercelayerApiError } from '../../utils/errors'
import type { SignupEndpoint } from '.'

const signup: SignupEndpoint['handlers']['signup'] = async ({
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
    await config.apiFetch('/api/customers', {
      method: 'POST',
      body: {
          data: {
            type: 'customers',
            attributes: {
              email: email,
              password: password,
            },
          },
        },
    })
  } catch (error) {
    if (error instanceof CommercelayerApiError && error.status === 422) {
      const inputEmail = error.data?.errors.meta.value

      if ('code' in error.data?.errors) {
        return res.status(400).json({
          data: null,
          errors: [
            {
              message: `A user already exists with ${inputEmail}`,
              code: 'USER_EXISTS',
            },
          ],
        })
      }
    }

    throw error
  }

  await commerce.login({ variables: { email, password }, res, config })

  res.status(200).json({ data: null })
}

export default signup
