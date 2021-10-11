import { ActiveCustomerQuery,Favorite } from '@framework/schema'
import { activeCustomerQuery } from '@framework/utils/queries/active-customer-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useActiveCustomer = () => {
  const { data, ...rest } = useSWR<ActiveCustomerQuery>([activeCustomerQuery], gglFetcher)
  console.log(data);
  return {
      customer: data?.activeCustomer,
      userInfo:{
        firstName: data?.activeCustomer?.firstName, 
        lastName:data?.activeCustomer?.lastName,
        email:data?.activeCustomer?.emailAddress,
        phoneNumber: data?.activeCustomer?.phoneNumber,
        address: data?.activeCustomer?.addresses?.[0]
      },
      wishlist: data?.activeCustomer?.favorites?.items.map((val:Favorite)=>val.product.id),
      ...rest 
  }
}

export default useActiveCustomer
