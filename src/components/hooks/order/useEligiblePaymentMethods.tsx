import { GetEligiblePaymentMethodsQuery, PaymentMethodQuote } from '@framework/schema'
import { eligiblePaymentMethodsQuery } from '@framework/utils/queries/eligible-payment-methods-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useEligiblePaymentMethods = () => {
  const { data, isValidating } = useSWR<GetEligiblePaymentMethodsQuery>([eligiblePaymentMethodsQuery], gglFetcher)
  return {
    eligiblePaymentMethods: data?.eligiblePaymentMethods as PaymentMethodQuote[],
    loading: isValidating,
  }
}

export default useEligiblePaymentMethods
