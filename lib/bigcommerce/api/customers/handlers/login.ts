import login from '../../operations/login'
import type { LoginHandlers } from '../login'

const loginHandler: LoginHandlers['login'] = async ({
  res,
  body: { email, password },
  config,
}) => {
  // TODO: Add proper validations with something like Ajv
  if (!(email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }
  // TODO: validate the password and email
  // Passwords must be at least 7 characters and contain both alphabetic
  // and numeric characters.

  // TODO: Currently not working, fix this asap.
  const loginData = await login({ variables: { email, password }, config })

  res.status(200).json({ data: null })
}

export default loginHandler
