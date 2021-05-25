import { HookFetcherFn, SWRHook } from '@commerce/utils/types'
import type { Order, OrdersData } from '../api/orders'
import { useHook, useSWRHook } from '@commerce/utils/use-hook'
import SWRFetcher from '@commerce/utils/default-fetcher'
import { Provider } from '../../commerce'

type UseOrders<
  H extends SWRHook<any, any, any> = SWRHook<Order[] | null>
> = ReturnType<H['useHook']>

const fetcher: HookFetcherFn<Order[] | null, any> = SWRFetcher

const fn = (provider: Provider) => provider.orders?.useOrders!

const useOrders: UseOrders = (input) => {
  const hook = useHook(fn)
  return useSWRHook({ fetcher, ...hook } as any)(input)
}

export default useOrders as UseOrders<typeof handler>

export const handler: SWRHook<Order[] | null> = {
  fetchOptions: {
    url: '/api/bigcommerce/orders',
    method: 'POST',
  },
  async fetcher({ options, fetch }) {
    const data = await fetch<OrdersData | null>(options)
    return data?.orders ?? null
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
