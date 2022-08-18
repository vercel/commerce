import type { SWRHook } from '@vercel/commerce/utils/types'
import useVendors from '@vercel/commerce/vendors/use-vendors'
import type { Vendor, VendorHook } from '@vercel/commerce/types/vendors'
import type { UseVendors } from '@vercel/commerce/vendors/use-vendors'
import type { GraphQLFetcherResult } from '@vercel/commerce/api'
import { Vendor as IVendor } from '@spree/storefront-api-v2-sdk/types/interfaces/Vendor'

export default useVendors as UseVendors<typeof handler>

export const handler: SWRHook<VendorHook> = {
  // Provide fetchOptions for SWR cache key
  fetchOptions: {
    url: 'vendors',
    query: 'list',
  },
  async fetcher({ input, options, fetch }) {
    console.info(
      'useVendors fetcher called. Configuration: ',
      'input: ',
      input,
      'options: ',
      options
    )

    const { data: spreeSuccessResponse } = await fetch<
      GraphQLFetcherResult<IVendor>
    >({
      variables: {
        methodPath: 'vendors.list',
        arguments: [
          {},
          {
            include: 'products',
          },
        ],
      },
    })
    // const normalizedProducts: Vendor[] = spreeSuccessResponse.data.map(
    //   (spreeVendors) => normalizeProduct(spreeSuccessResponse, spreeVendors)
    // )

    return { data: spreeSuccessResponse.data, isLoading: !spreeSuccessResponse }
  },
  useHook: ({ useData }) => {
    const useWrappedHook: ReturnType<SWRHook<VendorHook>['useHook']> = (
      input
    ) => {
      return useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })
    }

    return useWrappedHook
  },
}
