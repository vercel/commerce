export const SHOPIFY_CUSTOMER_TOKEN_COOKIE = 'shopify_customerToken'

export const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

export const SHOPIFY_COOKIE_EXPIRE = 30

export const API_URL = `https://${STORE_DOMAIN}/api/unstable/graphql.json`

export const API_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

export const SHOPIFY_CART_ID_COOKIE = 'shopify_cartId'

export const SHOPIFY_CART_URL_COOKIE = 'shopify_cartUrl'

export const SHOPIFY_WHISLIST_ID_COOKIE = 'shopify_wishlistId'
