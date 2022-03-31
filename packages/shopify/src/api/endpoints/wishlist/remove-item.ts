import { WishlistItemBody } from './../../../../../commerce/src/types/wishlist'
import type { WishlistEndpoint } from '.'
import { customerUpdateMutation, getCustomerId } from '../../../utils'
import type {
  MutationCustomerUpdateArgs,
  Mutation,
} from '../../../../admin-schema'

const removeWishlistItem: WishlistEndpoint['handlers']['removeItem'] = async ({
  res,
  body: { item, customerToken },
  config,
  commerce,
}) => {
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item!' }],
    })
  }

  if (customerToken) {
    const customerId =
      customerToken && (await getCustomerId({ customerToken, config }))

    if (!customerId) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'Invalid request' }],
      })
    }

    const { wishlist } = await commerce.getCustomerWishlist({
      variables: { customerId },
      config,
    })

    const WishlistItems: WishlistItemBody[] = wishlist?.items
      ?.filter((wishlistItem) => wishlistItem.productId !== item.productId)
      .map(({ product, ...rest }) => {
        return rest
      })!

    const jsonString = JSON.stringify(WishlistItems)

    try {
      const {
        data: { customerUpdate },
      } = await config.fetch<Mutation, MutationCustomerUpdateArgs>(
        customerUpdateMutation,
        {
          variables: {
            input: {
              id: customerId,
              metafields: [
                {
                  id: wishlist?.id,
                  value: jsonString,
                },
              ],
            },
          },
        },
        {},
        true
      )

      return res.status(200).json({ data: customerUpdate?.customer! })
    } catch (error: any) {
      console.log(error)
      res.status(500).json({ data: null, errors: [{ message: error }] })
    }
  }
}

export default removeWishlistItem
