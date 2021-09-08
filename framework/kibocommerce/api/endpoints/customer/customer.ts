import type { CustomerEndpoint } from '.'
import { getCustomerAccountQuery } from '../../queries/get-customer-account-query'

const getLoggedInCustomer: CustomerEndpoint['handlers']['getLoggedInCustomer'] = async ({
  req,
  res,
  config,
}) => {

  const encodedToken = req.cookies[config.customerCookie];
  const token = encodedToken ? Buffer.from(encodedToken, 'base64').toString('ascii'): null;
  
  const accessToken = token ? JSON.parse(token).accessToken : null;

  if (accessToken) {
    const { data } = await config.fetch(
      getCustomerAccountQuery,
      undefined,
      {
        headers: {
          'x-vol-user-claims':  accessToken  
         },
      }
    )
   
    const customer  = data?.customerAccount;

    if (!customer) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'Customer not found', code: 'not_found' }],
      })
    }

    return res.status(200).json({ data: { customer } })
  }

  res.status(200).json({ data: null })
}

export default getLoggedInCustomer
