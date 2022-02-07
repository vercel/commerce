import type { AddItemHook } from '@commerce/types/customer/address'
import type { MutationHook } from '@commerce/utils/types'
import useCart from '@framework/cart/use-cart'
import { useCallback } from 'react'
import useAddItem, { UseAddItem } from '@commerce/customer/address/use-add-item'
import useAddresses from './use-addresses'
import { useCheckoutContext } from '@components/checkout/context'
import epClient from '../../utils/ep-client'
import getCustomerCookie from '../../utils/get-customer-creds'
import adminRequest from '../../utils/request'
export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    url: '',
    method: '',
  },
  async fetcher ({input, options, fetch }){
    const customer_token = getCustomerCookie();
    input['name'] = "home";
    await epClient.Addresses.Create({
      customer: customer_token.customer_id,
      body: input,
      token:customer_token.token
    })
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { mutate } = useAddresses()
      const { setAddressFields } = useCheckoutContext()
      const { data:cart_data } = useCart()
      async function wait(s: number | undefined) {
        return new Promise(resolve => {
          setTimeout(resolve, s);
        });
      }
      return useCallback(
        async function addItem(input) {
          const customerAddress = {
            first_name: input.firstName,
            last_name: input.lastName,
            phone_number: "",
            company_name: input.company,
            line_1: input.streetNumber,
            city: input.city,
            postcode:input.zipCode,
            county: "",
            country: input.country,
            instructions: ""
          }
          const endpoint = {
            url: '/store-events/61fa794ba1e1b500303a695a/get-tax',
            method: 'POST'
          }
          const payload = {
            payload:{
              data:{
                cart_id:cart_data.id,
                shipping_address: customerAddress
              }
            }
          }
          const response = await adminRequest(endpoint, payload)
          if (response?.status == 200){
            await wait(4000);
            await epClient.Cart().Get();
            await fetch({ input:customerAddress })
            setAddressFields(input)
            return input
          }
        },
        [setAddressFields]
      )
    },
  }
