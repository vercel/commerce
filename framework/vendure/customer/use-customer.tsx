import { SWRHook } from '@commerce/utils/types'
import useCustomer, { UseCustomer } from '@commerce/customer/use-customer'
import { Customer } from '@commerce/types'
import { ActiveCustomerQuery } from '../schema'
import { activeCustomerQuery } from '../lib/queries/active-customer-query'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<Customer | null> = {
  fetchOptions: {
    query: activeCustomerQuery,
  },
  async fetcher({ options, fetch }) {
    const { activeCustomer } = await fetch<ActiveCustomerQuery>({
      ...options,
    })
    return activeCustomer
      ? ({
          firstName: activeCustomer.firstName ?? '',
          lastName: activeCustomer.lastName ?? '',
          email: activeCustomer.emailAddress ?? '',
        } as any)
      : null
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
