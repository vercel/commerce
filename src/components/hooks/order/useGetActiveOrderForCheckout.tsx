import { ActiveOrderQuery } from '@framework/schema'
import { normalizeCartForCheckout } from '@framework/utils/normalize'
import { getActiveOrderForCheckoutQuery } from '@framework/utils/queries/active-order-for-checkout-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'


const useGetActiveOrderForCheckout = () => {
  const { data, ...rest } = useSWR<ActiveOrderQuery>([getActiveOrderForCheckoutQuery], gglFetcher)
  return { order: data?.activeOrder ? normalizeCartForCheckout(data!.activeOrder) : null, ...rest }
}

export default useGetActiveOrderForCheckout
