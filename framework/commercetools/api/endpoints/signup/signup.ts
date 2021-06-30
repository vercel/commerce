import type { SignupEndpoint } from '.'
import type { CommercetoolsCustomer } from '../../../types/customer'
import { signupMutation } from '../../../utils/mutations/sign-up-mutation'
const jwt = require('jwt-simple')
import { serialize } from 'cookie'

const signup: SignupEndpoint['handlers']['signup'] = async ({
  res,
  body: { firstName, lastName, email, password },
  config,
}) => {
  if (!(firstName && lastName && email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  try {
    const newCustomer: CommercetoolsCustomer = (
      await config.fetch(signupMutation, {
        variables: { data: { firstName, lastName, email, password } },
      })
    ).data?.customerSignUp.customer

    const { customerCookie } = config
    const customerExpires = new Date(Date.now() + 30 * 30) // 1 month
    const customerToken = jwt.encode(newCustomer.id, customerCookie)

    res.setHeader(
      'Set-Cookie',
      serialize(customerCookie, customerToken, {
        maxAge: 30,
        path: '/',
        expires: customerExpires,
      })
    )

    res.status(200).json({ data: null })
  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Error on response' }],
    })
  }
}

export default signup
