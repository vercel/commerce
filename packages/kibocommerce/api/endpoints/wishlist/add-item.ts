import getCustomerWishlist from '../../operations/get-customer-wishlist'
import getCustomerId from '../../utils/get-customer-id'
import type { WishlistEndpoint } from '.'
import { normalizeWishlistItem } from '../../../lib/normalize'
import { getProductQuery } from '../../../api/queries/get-product-query'
import addItemToWishlistMutation from '../../mutations/addItemToWishlist-mutation'
import createWishlist from '../../mutations/create-wishlist-mutation'

// Return wishlist info
const buildAddToWishlistVariables = ({
  productId,
  variantId,
  productResponse,
  wishlist
}: {
  productId: string
  variantId: string
  productResponse: any
  wishlist: any
}) => {
  const { product } = productResponse.data

  const selectedOptions = product.variations?.find(
    (v: any) => v.productCode === variantId
  ).options
  const quantity=1
  let options: any[] = []
  selectedOptions?.forEach((each: any) => {
    product?.options
      .filter((option: any) => {
        return option.attributeFQN == each.attributeFQN
      })
      .forEach((po: any) => {
        options.push({
          attributeFQN: po.attributeFQN,
          name: po.attributeDetail.name,
          value: po.values?.find((v: any) => v.value == each.value).value,
        })
      })
  })

  return {
    wishlistId: wishlist?.id,
    wishlistItemInput: {
      quantity,
      product: {
        productCode: productId,
        variationProductCode: variantId ? variantId : null,
        options,
      }
      },
  }
}

const addItem: WishlistEndpoint['handlers']['addItem'] = async ({
  res,
  body: { customerToken, item },
  config,
  commerce,
}) => {
  const token = customerToken ? Buffer.from(customerToken, 'base64').toString('ascii'): null;
  const accessToken = token ? JSON.parse(token).accessToken : null;
  let result: { data?: any } = {}
  let wishlist: any

  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }

  const customerId = customerToken && (await getCustomerId({ customerToken, config }))
  const wishlistName= config.defaultWishlistName

  if (!customerId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const wishlistResponse = await commerce.getCustomerWishlist({
    variables: { customerId, wishlistName },
    config,
  })
  wishlist= wishlistResponse?.wishlist
  if(Object.keys(wishlist).length === 0) {
    const createWishlistResponse= await config.fetch(createWishlist, {variables: {
      wishlistInput: {
        customerAccountId: customerId,
        name: wishlistName
      }
    }
  }, {headers: { 'x-vol-user-claims': accessToken } })
  wishlist= createWishlistResponse?.data?.createWishlist
  }

  const productResponse = await config.fetch(getProductQuery, {
    variables: { productCode: item?.productId },
  })

  const addItemToWishlistResponse = await config.fetch(
    addItemToWishlistMutation,
    {
      variables: buildAddToWishlistVariables({ ...item, productResponse, wishlist }),
    },
    { headers: { 'x-vol-user-claims': accessToken } }
  )

  if(addItemToWishlistResponse?.data?.createWishlistItem){
    const wishlistResponse= await commerce.getCustomerWishlist({
      variables: { customerId, wishlistName },
      config,
    })
    wishlist= wishlistResponse?.wishlist
  }
  
  result = { data: {...wishlist, items: wishlist?.items?.map((item:any) => normalizeWishlistItem(item, config))} }

  res.status(200).json({ data: result?.data })
}

export default addItem
