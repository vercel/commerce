import { CustomersHandlers } from '..'

const createCustomer: CustomersHandlers['createCustomer'] = async ({
  res,
  body: { firstName, lastName, email, password },
  config,
}) => {
  // TODO: Add proper validations with something like Ajv
  if (!(firstName && lastName && email && password)) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }
  // TODO: validate the password.
  // Passwords must be at least 7 characters and contain both alphabetic
  // and numeric characters.

  const { data } = await config.storeApiFetch('/v3/customers', {
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

  res.status(200).json({ data })
}

export default createCustomer
