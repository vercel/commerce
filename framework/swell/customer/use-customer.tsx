import useCustomer, { UseCustomer } from '@commerce/customer/use-customer'
import { Customer } from '@commerce/types'
import { SWRHook } from '@commerce/utils/types'
import { normalizeCustomer } from '../utils/normalize'
// import { getCustomerQuery, getCustomerToken } from '../utils'

export default useCustomer as UseCustomer<typeof handler>

export const handler: SWRHook<Customer | null> = {
  fetchOptions: {
    query: 'account',
    method: 'get',
  },
  async fetcher({ options, fetch }) {
    // console.log('STORE_ID', STORE_ID, 'PUBLIC_KEY', PUBLIC_KEY);
    // const data = await swell.account.get()
    const data = await fetch<any | null>({
      ...options,
      // variables: { customerAccessToken: getCustomerToken() },
    })
    console.log(`Customer data ${data}`)
    return data ? normalizeCustomer(data) : null
  },
  useHook: ({ useData }) => (input) => {
    return useData({
      swrOptions: {
        revalidateOnFocus: false,
        ...input?.swrOptions,
      },
    })
  },
}

// const handler = (): { data: Customer } => {
//   const swell = getContext();
//   const response = swell.account.get();
//   const { firstName, lastName, email, company, customerGroupId, notes, phone,
//     entityId, addressCount, attributeCount, storeCredit } = response;
//   return {
//       data: {
//         firstName,
//         lastName,
//         email,
//         company,
//         customerGroupId,
//         notes,
//         phone,
//         entityId,
//         addressCount,
//         attributeCount,
//         storeCredit
//       }
//   }
// }
// export default handler;
