import { ActiveCustomerQuery } from '@framework/schema'
import { activeCustomerQuery } from '@framework/utils/queries/active-customer-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useActiveCustomer = () => {
  const { data, ...rest } = useSWR<ActiveCustomerQuery>([activeCustomerQuery], gglFetcher)
  return { customer: data?.activeCustomer, ...rest }
}

export default useActiveCustomer
