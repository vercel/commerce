import useAddItem, { UseAddItem } from '@commerce/customer/address/use-add-item'
import { MutationHook } from '@commerce/utils/types'
import epClient from '../../utils/ep-client';
import { getCookies, setCookie, deleteCookie, getCookie } from 'cookies-next';
import useAddresses from './use-addresses';
import { useCallback } from 'react'
import { gateway  as MoltinGateway} from '@moltin/sdk';
import { MoltinClient } from '@moltin/request';
import axios from "axios";
import useCart from '@framework/cart/use-cart';
import cart from 'pages/api/cart';



const Moltin = MoltinGateway({
    client_id: process.env.NEXT_PUBLIC_ELASTICPATH_CLIENTID,
})


export default useAddItem as UseAddItem<typeof handler>

const customerCookies = getCookie('user_token') ;
const customer_token = customerCookies &&  JSON.parse(customerCookies.toString());
console.log("customer token in add address", customer_token);
const cartId = getCookie('cartId');




export const handler: MutationHook<any> = {
  
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {
    console.log(cartId , " for shipping and tax") ;
    console.log("inside add address code " , input);
//   console.log(address , "address for ep");
//   Moltin.Addresses.Create({
//     customer: customer_token.customer_id,
//     body: {type : 'address' , ...address},
//     token: customer_token.token
// }).then((address: any) => {
//     console.log("address added in ep" , address  );
// })

axios({
  url: 'http://localhost:3000/events/store/get-tax',
  method: 'POST',
  data: {
      payload:{
          data:{
              cartId:cartId?.toString(),
              shipping_address: {
                first_name: input.firstName,
                last_name: input.lastName,
                company_name: input.company,
                phone_number: "(555) 555-1234",
                line_1: input.apartments,
                city: input.city,
                postcode: input.zipCode,
                county : "NJ",
                country: "Us",
                instructions: "Leave in porch"
            }
          }
      }
  }
})
.then(function (response) {
  console.log(response);
  return response
})
.catch(function (error) {
  console.log(error);
})



///shipping rates 

axios({
  url: 'http://localhost:3000/events/store/shipping-added',
  method: 'POST',
  data: {
      payload:{
          data:{
              cartId:cartId?.toString(),
              shipping_address: {
                first_name: input.firstName,
                last_name: input.lastName,
                company_name: input.company,
                phone_number: "(555) 555-1234",
                line_1: input.apartments,
                city: input.city,
                postcode: input.zipCode,
                county : "NJ",
                country: "Us",
                instructions: "Leave in porch"
            }
          }
      }
  }
})
.then(function (response) {
  console.log(response);
  return response
})
.catch(function (error) {
  console.log(error);
})
 
  const data = input;
  return data ;

  },
  useHook: ({ fetch }) => () => {
    const { mutate } = useAddresses()
  
    return useCallback(
      async function addItem(input) {
        
        const data = await fetch({ input })
        const addressData = data ;
        await mutate(addressData, true)
        return addressData
      },
      [fetch, mutate]
    )
  },
}