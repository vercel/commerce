import { ActiveCustomerQuery, Order } from '@framework/schema'
import { getUserOrderQuery } from '@framework/utils/queries/get-user-order-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useGetUserOrder = () => {
  const { data, ...rest } = useSWR<ActiveCustomerQuery>([getUserOrderQuery], gglFetcher)

  const addingItem = data?.activeCustomer?.orders.items.filter((val:Order) =>val.state == 'AddingItems');
  const paymentAuthorized = data?.activeCustomer?.orders.items.filter((val:Order) =>val.state == "PaymentAuthorized");
  const paymentSettled = data?.activeCustomer?.orders.items.filter((val:Order) =>val.state == 'PaymentSettled');
  const partiallyShipped = data?.activeCustomer?.orders.items.filter((val:Order) =>val.state == "PartiallyShipped");
  const shipped = data?.activeCustomer?.orders.items.filter((val:Order) =>val.state == 'Shipped');
  const cancelled = data?.activeCustomer?.orders.items.filter((val:Order) =>val.state == "Cancelled");

  return { 
    addingItem: addingItem,
    paymentAuthorized: paymentAuthorized,
    paymentSettled: paymentSettled,
    partiallyShipped:partiallyShipped,
    shipped:shipped,
    cancelled: cancelled,
    ...rest 
  }
}

export default useGetUserOrder
