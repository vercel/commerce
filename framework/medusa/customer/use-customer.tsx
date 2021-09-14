import { SWRHook } from '@commerce/utils/types'
import useCustomer, { UseCustomer } from '@commerce/customer/use-customer'
import { normalizeCustomer } from '@framework/utils/normalizers/normalize-customer'

export default useCustomer as UseCustomer<typeof handler>
export const handler: SWRHook<any> = {
  fetchOptions: {
    query: 'auth',
    method: 'getSession',
  },
  async fetcher({ options, fetch }) {
    const data = await fetch({
      ...options,
    })
    return normalizeCustomer(data?.customer) || null
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
