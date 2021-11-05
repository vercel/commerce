import { GetEligibleShippingMethodsQuery, ShippingMethodQuote } from '@framework/schema'
import { normalizeShippingMethodQuote } from '@framework/utils/normalize'
import { getEligibleShippingMethods } from '@framework/utils/queries/eligible-shipping-methods-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useEligibleShippingMethods = () => {
  const { data, isValidating } = useSWR<GetEligibleShippingMethodsQuery>([getEligibleShippingMethods], gglFetcher)
  return {
    eligibleShippingMethods: (data?.eligibleShippingMethods as ShippingMethodQuote[])?.map(item => normalizeShippingMethodQuote(item)),
    loading: isValidating,
  }
}

export default useEligibleShippingMethods
