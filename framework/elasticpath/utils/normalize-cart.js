const normalizeLineItem = ({
  id, 
  name, 
  quantity, 
  product_id:productId,
  sku,
  image,
  value,
  unit_price
}) => {
  const item = {
    id,
    variantId: productId,
    productId,
    name,
    quantity,
    variant: {
      id: productId,
      sku,
      name,
      image: {
        url: image.href || '/',
      },
      requiresShipping: false,
      price: (unit_price.amount/100),
      listPrice: (unit_price.amount/100),
    },
    path: '',
    discounts: [],
    options: [],
  }
  return item
}

const normalizeCart = async (cart, lineItems) => {
  const {with_tax, without_tax} = cart.meta?.display_price;

  return {
    id: cart.id,
    createdAt: cart.meta.timestamps.created_at,
    currency: { code: with_tax.currency },
    taxesIncluded: '',
    lineItems: lineItems?.map(normalizeLineItem) ?? [],
    lineItemsSubtotalPrice: cart.meta?.display_price.without_tax || 0,
    subtotalPrice: (without_tax.amount/100) || 0,
    totalPrice: (with_tax.amount/100) || 0,
  };
}

export default normalizeCart;