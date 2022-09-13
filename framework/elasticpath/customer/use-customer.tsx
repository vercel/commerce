import { SWRHook } from '@commerce/utils/types'
import useCustomer, { UseCustomer } from '@commerce/customer/use-customer'
import getCustomerCookie from '../utils/get-customer-creds'

const creds = getCustomerCookie();
export default useCustomer as UseCustomer<typeof handler>
export const handler: SWRHook<any> = {
  fetchOptions: {
    url: 'Customers',
    method: 'Get',
  },
  async fetcher({fetch, options, input}) {
    const creds = getCustomerCookie();
    if(!creds.customer_id || !creds.token) {
      return null;
    }

    const {data} = await fetch({
      ...options,
      variables:{
        params: [creds.customer_id, creds.token]
      }
    });

    console.log(data);

    return {
      ...data,
      firstName: data.name.split(" ")[0],
      lastName: data.name.split(" ")[1]
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
