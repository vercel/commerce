import { SWRHook } from '@commerce/utils/types'
import useCustomer, { UseCustomer } from '@commerce/customer/use-customer'
import { gateway as MoltinGateway } from '@moltin/sdk'
import getCustomerCookie from '../utils/get-customer-creds'

const Moltin = MoltinGateway({
  client_id: process.env.NEXT_PUBLIC_ELASTICPATH_CLIENTID
})

export default useCustomer as UseCustomer<typeof handler>
export const handler: SWRHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher() {
    const creds = getCustomerCookie();

    // if user is not logged-in return null
    if(!creds) {
      return null;
    }
    const data = await Moltin.Customers.Get(creds.customer_id, creds.token);
    return data || null;
  },
  useHook: ({ useData }) => (input) => {
    return useData({
      swrOptions: {
        revalidateOnFocus: false,
        ...input?.swrOptions,
      },
    })
  },
}
