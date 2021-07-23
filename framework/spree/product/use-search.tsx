import type { SWRHook, Fetcher } from '@commerce/utils/types'
import useSearch from '@commerce/product/use-search'
import type { UseSearch } from '@commerce/product/use-search'

export const handler: SWRHook<any> = {
  fetchOptions: {
    url: 'client.products.list', // Add custom option for method name later
    query: '',
  },
  async fetcher({ input, options, fetch }) {
    // This method is only needed if the options need to be modified before calling the generic fetcher (created in createFetcher).
    // TODO: Actually filter by input and query.

    console.log(
      `Calling useSearch fetcher with input: ${JSON.stringify(
        input
      )} and options: ${JSON.stringify(options)}.`
    )

    // FIXME: IMPLEMENT

    return fetch({
      url: options.url,
      variables: { args: [] }, // TODO: Actually provide args later.
    })
  },
  // useHook is used for both, SWR and mutation requests to the store.
  // useHook is called in React components. For example, after clicking `Add to cart`.
  useHook:
    ({ useData }) =>
    (input = {}) => {
      console.log('useHook called')

      // useData calls the fetcher method (above).
      // The difference between useHook and calling fetcher directly is
      // useHook accepts swrOptions.
      return useData({
        input: [
          ['search', input.search],
          ['categoryId', input.categoryId],
          ['brandId', input.brandId],
          ['sort', input.sort],
        ],
        swrOptions: {
          revalidateOnFocus: false,
          // revalidateOnFocus: false means do not fetch products again when website is refocused in the web browser.
          ...input.swrOptions,
        },
      })
    },
  // (input = {}) => {

  //   return {
  //     data: {
  //       // FIXME: Use actual fetcher
  //       products: [],
  //     },
  //   }
  // },
}

export default useSearch as UseSearch<typeof handler>
