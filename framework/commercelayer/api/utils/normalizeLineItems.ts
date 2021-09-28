export default function normalizeLineItems(lineItems: any[]) {
  return lineItems.map((lineItem) => {
    const id = lineItem.id
    const attributes = lineItem.attributes
    return {
      id,
      name: attributes.name,
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
          url: `/commercelayer_assets/${attributes.reference}_FLAT.png`,
          altText: 'Black Women Long Sleeve Shirt',
          width: 1000,
          height: 1000,
        },
      },
    }
  })
}
