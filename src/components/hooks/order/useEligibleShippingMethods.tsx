import { GetEligibleMethodsQuery, ShippingMethodQuote } from '@framework/schema'
import { getEligibleShippingMethods } from '@framework/utils/queries/eligible-shipping-methods-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useEligibleShippingMethods = () => {
  const { data, isValidating } = useSWR<GetEligibleMethodsQuery>([getEligibleShippingMethods], gglFetcher)
  return {
    eligibleShippingMethods: data?.eligibleShippingMethods as ShippingMethodQuote[],
    loading: isValidating,
  }
}

export default useEligibleShippingMethods
