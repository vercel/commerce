import { ActiveCustomerQuery, Order } from '@framework/schema'
import { getUserOrderQuery } from '@framework/utils/queries/get-user-order-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useGetUserOrder = () => {
  const { data, ...rest } = useSWR<ActiveCustomerQuery>([getUserOrderQuery], gglFetcher)
  console.log(data);
  const addingItem = data?.activeCustomer?.orders.items.filter((val:Order) =>val.state == 'AddingItems');
  const arrangingPayment = data?.activeCustomer?.orders.items.filter((val:Order) =>val.state == 'ArrangingPayment');
  const cancelled = data?.activeCustomer?.orders.items.filter((val:Order) =>val.state == "Cancelled");
  return { 
    addingItem: addingItem,
    arrangingPayment: arrangingPayment,
    cancelled: cancelled,
    ...rest 
  }
}

export default useGetUserOrder
