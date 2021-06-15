import { BigcommerceApiError } from '../../utils/errors'
import type { SignupEndpoint } from '.'

const signup: SignupEndpoint['handlers']['signup'] = async ({
  res,
  body: { firstName, lastName, email, password },
  config,
  commerce,
}) => {
  // TODO: Add proper validations with something like Ajv
  if (!(firstName && lastName && email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }
  // TODO: validate the password and email
  // Passwords must be at least 7 characters and contain both alphabetic
  // and numeric characters.

  try {
    await config.storeApiFetch('/v3/customers', {
      method: 'POST',
      body: JSON.stringify([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          authentication: {
            new_password: password,
          },
        },
      ]),
    })
  } catch (error) {
    if (error instanceof BigcommerceApiError && error.status === 422) {
      const hasEmailError = '0.email' in error.data?.errors

      // If there's an error with the email, it most likely means it's duplicated
      if (hasEmailError) {
        return res.status(400).json({
          data: null,
          errors: [
            {
              message: 'The email is already in use',
              code: 'duplicated_email',
            },
          ],
        })
      }
    }

    throw error
  }

  // Login the customer right after creating it
  await commerce.login({ variables: { email, password }, res, config })

  res.status(200).json({ data: null })
}

export default signup
