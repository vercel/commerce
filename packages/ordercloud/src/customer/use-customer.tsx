import { SWRHook } from '@vercel/commerce/utils/types'
import useCustomer, { UseCustomer } from '@vercel/commerce/customer/use-customer'

export default useCustomer as UseCustomer<typeof handler>
export const handler: SWRHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {},
  useHook: () => () => {
    return async function addItem() {
      return {}
    }
  },
}
