import { ActiveCustomerQuery } from '@framework/schema'
import { userInfoQuery } from '@framework/utils/queries/user-info-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useUserInfo = () => {
  const { data } = useSWR<ActiveCustomerQuery>([userInfoQuery], gglFetcher)
  
  return { userInfo: data?.activeCustomer}
}

export default useUserInfo
