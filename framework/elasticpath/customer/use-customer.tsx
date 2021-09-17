import { SWRHook } from '@commerce/utils/types'
import useCustomer, { UseCustomer } from '@commerce/customer/use-customer'
import getCustomerCookie from '../utils/get-customer-creds'
import epClient from '../utils/ep-client'

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
    console.log('moltin sdk', epClient);
    const {data:customer} = await epClient.Customers.Get(creds.customer_id, creds.token);

    return {
      ...customer,
      firstName: customer.name.split(" ")[0],
      lastName: customer.name.split(" ")[1]
    }
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
