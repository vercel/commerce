import type { WishlistEndpoint } from '.'
import { customerUpdateMutation, getCustomerId } from '../../../utils'
import type {
  MutationCustomerUpdateArgs,
  Mutation,
  MetafieldInput,
} from '../../../../admin-schema'
import { WishlistItem } from './../../../types/wishlist'

const addWishlistItem: WishlistEndpoint['handlers']['addItem'] = async ({
  res,
  body: { variables: item, customerToken },
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

    let wishlistItems: WishlistItem[] = []
    let metafieldInput: MetafieldInput = {}

    const { wishlist } = await commerce.getCustomerWishlist({
      variables: { customerId },
      config,
    })

    if (wishlist) {
      wishlistItems = wishlist?.items?.map(({ product, ...rest }) => {
        return rest
      })!
      metafieldInput = { id: wishlist?.id! }
    } else {
      metafieldInput = { namespace: 'my_fields', key: 'wishlist' }
    }

    wishlistItems?.push(item)
    const jsonString = JSON.stringify(wishlistItems)

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
                  ...metafieldInput,
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

export default addWishlistItem
