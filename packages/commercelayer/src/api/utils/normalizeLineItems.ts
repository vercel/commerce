import { LineItem } from '@commercelayer/sdk'
import data from '../../data.json'

export default function normalizeLineItems(lineItems: LineItem[]) {
  return lineItems
    .filter((l) => {
      return (
        l.item_type && !['shipment', 'payment_method'].includes(l.item_type)
      )
    })
    .map((lineItem) => {
      const id = lineItem.id
      const products = data.products
      return {
        id,
        name: lineItem.name,
        path: products.find((p) => p.id === lineItem.reference)?.slug,
        productId: lineItem.reference,
        variantId: lineItem.reference,
        quantity: lineItem.quantity,
        price: lineItem.unit_amount_float,
        variant: {
          id,
          name: lineItem.name,
          sku: lineItem.sku_code,
          price: lineItem.unit_amount_float,
          image: {
            url: `https://data.commercelayer.app/vercel-provider/${lineItem.reference}_FLAT.png`,
            altText: lineItem.name,
            width: 1000,
            height: 1000,
          },
        },
      }
    })
}
