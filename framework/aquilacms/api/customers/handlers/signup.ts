import { AquilacmsApiError } from '../../utils/errors'
import login from '../../../auth/login'
import { SignupHandlers } from '../signup'
import Joi, { valid } from 'joi'

const signup: SignupHandlers['signup'] = async ({
  res,
  body: { firstName, lastName, email, password },
  config,
}) => {
  const schema = Joi.object({
    firstName: Joi.string().min(1),
    lastName: Joi.string().min(1),
    email: Joi.string().email({ tlds: false }),
    password: Joi.string().pattern(new RegExp(/^(.*[a-zA-Z0-9]){6,}/)),
  })

  const validation = schema.validate({ email, password })
  if (!(firstName && lastName && email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }
  if (validation?.error?.details) {
    let message = validation.error.details[0].message
    if (validation.error.details[0].path[0] === 'password')
      message =
        'password must  have a lowercase, a uppercase, a number and be at least 6 characters long'
    return res.status(400).json({
      data: null,
      errors: [{ message }],
    })
  }

  try {
    await config.storeApiFetch('/v2/user', {
      method: 'PUT',
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      }),
    })
  } catch (error) {
    if (error instanceof AquilacmsApiError && error.status === 422) {
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
  await login({ variables: { email, password }, res, config })

  res.status(200).json({ data: null })
}

export default signup
