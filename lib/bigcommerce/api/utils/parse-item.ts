import type { ItemBody } from '../cart'

const parseItem = (item: ItemBody) => ({
  quantity: item.quantity,
  product_id: item.productId,
  variant_id: item.variantId,
})

export default parseItem
