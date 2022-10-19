import type { SWRHook } from '@vercel/commerce/utils/types'
import type { CustomerHook } from '@vercel/commerce/types/customer'

import Cookies from 'js-cookie'
import { decode, type JwtPayload } from 'jsonwebtoken'
import useCustomer, {
  type UseCustomer,
} from '@vercel/commerce/customer/use-customer'
import { CUSTOMER_COOKIE, API_URL } from '../constants'

type JwtData = JwtPayload & {
  cid: string
}

export default useCustomer as UseCustomer<typeof handler>
export const handler: SWRHook<CustomerHook> = {
  fetchOptions: {
    query: 'customer',
    method: '_request',
  },
  async fetcher({ options, fetch }) {
    const token = Cookies.get(CUSTOMER_COOKIE)

    if (!token) {
      return null
    }

    const decodedToken = decode(token) as JwtData

    const customer = await fetch<any>({
      query: options.query,
      method: options.method,
      variables: [
        `${API_URL}/customers/${decodedToken.cid}`,
        'get',
        null,
        {},
        token,
      ],
    })

    return customer
      ? {
          id: customer.id,
          firstName: customer.firstname,
          lastName: customer.lastname,
          email: customer.email,
          phone: customer.phone,
        }
      : null
  },
  useHook:
    ({ useData }) =>
    (input) => {
      return useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })
    },
}
