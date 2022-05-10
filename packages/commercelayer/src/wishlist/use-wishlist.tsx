import { SWRHook } from '@vercel/commerce/utils/types'
import useWishlist, {
  UseWishlist,
} from '@vercel/commerce/wishlist/use-wishlist'
import useCustomer from '../customer/use-customer'
import getContentData from '../api/utils/getContentData'
export default useWishlist as UseWishlist<typeof handler>

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input }) {
    const { customerEmail } = input
    const getWishlist =
      typeof localStorage !== 'undefined' && localStorage.getItem('wishlist')
    const products = await getContentData()
    if (getWishlist && customerEmail && products.length > 0) {
      const wishlist = JSON.parse(getWishlist)
      const items = wishlist.map((wishlist: string, id: number) => {
        const [product] = products.filter((p) =>
          wishlist.startsWith(p.id)
        ) as any
        const [variant] = product?.variants
        return {
          variant_id: variant?.id,
          product_id: product?.id,
          id,
          product,
        }
      })
      return { items }
    }
    return { items: [] }
  },
  useHook:
    ({ useData }) =>
    (input = {}) => {
      const { data: customer } = useCustomer()
      return useData({
        input: [['customerEmail', customer?.email]],
        swrOptions: {
          revalidateOnFocus: true,
          ...input.swrOptions,
        },
      })
    },
}
