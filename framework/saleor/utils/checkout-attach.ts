import * as mutation from './mutations'
import { CheckoutCustomerAttach } from '../schema'

export const checkoutAttach = async (
  fetch: any,
  { variables, headers }: any,
): Promise<CheckoutCustomerAttach> => {
  const data = await fetch({ 
    query: mutation.AttachCheckout,
    variables, 
    headers
  })

  return data;
}

