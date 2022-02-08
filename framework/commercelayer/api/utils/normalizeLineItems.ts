import data from '../../data.json'

export default function normalizeLineItems(lineItems: any[]) {
  return lineItems
    .filter((l) => {
      return !['shipment', 'paymentMethod'].includes(l.itemType)
    })
    .map((lineItem) => {
      const id = lineItem.id
      const attributes = lineItem.attributes
      const products = data.products
      return {
        id,
        name: attributes.name,
        path: products.find((p) => p.id === attributes.reference)?.slug,
        productId: attributes.reference,
        variantId: attributes.reference,
        quantity: attributes.quantity,
        price: attributes.unit_amount_float,
        variant: {
          id,
          name: attributes.name,
          sku: attributes.sku_code,
          price: attributes.unit_amount_float,
          image: {
            url: `https://data.commercelayer.app/vercel-provider/${attributes.reference}_FLAT.png`,
            altText: attributes.name,
            width: 1000,
            height: 1000,
          },
        },
      }
    })
}
