import type { SignupEndpoint } from '.'

const MoltinGateway = require('@moltin/sdk').gateway
const Moltin = MoltinGateway({
  client_id: process.env.NEXT_PUBLIC_ELASTICPATH_CLIENTID,
  client_secret: process.env.ELASTICPATH_SECRET
})

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
  // TODO: validate the firstname, lastname, password and email
  // Passwords must be at least 7 characters and contain both alphabetic
  // and numeric characters.
  const customer = {
    type: 'customer',
    name: firstName + lastName,
    email: email,
    password: password
  }
  try {
    let customerAPI = await Moltin.Customers.Create(customer)
    return res.status(200).json(customerAPI);
  } catch (error) {
    let errorData = error.errors[0];
    // Check if the email and password didn't match an existing account
    if (errorData.status == 409) {
      return res.status(401).json({
        data: null,
        errors: [
          {
            message:
              'Account not created. Please try again',
            code: 'invalid_credentials',
          },
        ],
      })
    }

    throw error
  }
}

export default signup
