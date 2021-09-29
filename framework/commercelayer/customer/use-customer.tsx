import { SWRHook } from '@commerce/utils/types'
import { CustomerHook } from '@commerce/types/customer'
import useCustomer, { UseCustomer } from '@commerce/customer/use-customer'
import Cookies from 'js-cookie'
import { ENDPOINT } from '../const'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    url: `${ENDPOINT}/api/customers/`,
    method: 'GET',
  },
  async fetcher({ options, fetch }) {
    let data: any = null
    const customerId = Cookies.get('CL_CUSTOMER_ID')
    if (customerId) {
      options.url = `${options.url}/${customerId}`
      data = await fetch({ ...options })
    }

    return data
      ? ({
          firstName: '',
          lastName: '',
          email: data.attributes.email ?? '',
        } as any)
      : null
  },

  useHook:
    ({ useData }) =>
    (input) => {
      return useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })
    },
}
