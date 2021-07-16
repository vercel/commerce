import { SWRHook } from '@commerce/utils/types'
import useCustomer, { UseCustomer } from '@commerce/customer/use-customer'

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
