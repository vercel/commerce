import type { SubscriptionsEndpoint } from '.'

const subscriptions: SubscriptionsEndpoint['handlers']['subscriptions'] = async ({
  res,
  body: { email, firstName, lastName, source },
  config,
}) => {
  try {
    const { data } = await config.storeApiFetch('/v3/customers/subscribers', {
      method: 'POST',
      body: {
        email,
        first_name: firstName,
        last_name: lastName,
        source
      }
    })
    res.status(200).json({ data: data })
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      data: null,
      errors: [
        {
          message: 'Error',
          code: 'Error SubscriptionsEndpoint',
        },
      ],
    })
  }
}

export default subscriptions
