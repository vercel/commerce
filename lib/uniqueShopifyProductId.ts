export function uniqueShopifyProductId(productId: string) {
  const pId = productId
    ? productId.startsWith('gid:')
      ? productId
      : `gid://shopify/Product/${productId}`
    : null;

  return pId;
}

export function uniqueShopifyVariantId(variantId: string) {
  const vId = variantId
    ? variantId.startsWith('gid:')
      ? variantId
      : `gid://shopify/ProductVariant/${variantId}`
    : null;

  return vId;
}
