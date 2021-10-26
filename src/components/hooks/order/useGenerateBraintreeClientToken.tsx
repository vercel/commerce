import { GenerateBraintreeClientTokenQuery } from '@framework/schema'
import { generateBraintreeClientTokenQuery } from '@framework/utils/queries/generate-braintree-client-token-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'


const useGenerateBraintreeClientToken = (options: { orderId: string }) => {
  const { data, ...rest } = useSWR<GenerateBraintreeClientTokenQuery>([generateBraintreeClientTokenQuery, options], gglFetcher)
  return { clientToken: data?.generateBraintreeClientToken, ...rest }
}

export default useGenerateBraintreeClientToken
