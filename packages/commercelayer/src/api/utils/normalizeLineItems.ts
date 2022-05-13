import { LineItem } from '@commercelayer/sdk'
import type { Products } from './getContentData'

type Params = {
  lineItems: LineItem[]
  products: Products
}

export default function normalizeLineItems({ lineItems, products }: Params) {
  return lineItems
    .filter((l) => {
      return (
        l.item_type && !['shipment', 'payment_method'].includes(l.item_type)
      )
    })
    .map((lineItem) => {
      const id = lineItem.id
      const [product] = products.filter((p) => p.id === lineItem.reference)
      const path = product?.slug
      const [image] = product?.images
      return {
        id,
        name: lineItem.name,
        path,
        productId: lineItem.reference,
        variantId: lineItem.reference,
        quantity: lineItem.quantity,
        price: lineItem.unit_amount_float,
        variant: {
          id,
          name: lineItem.name,
          sku: lineItem.sku_code,
          price: lineItem.unit_amount_float,
          image,
        },
      }
    })
}
