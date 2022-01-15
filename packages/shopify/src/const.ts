export const SHOPIFY_CHECKOUT_ID_COOKIE = 'shopify_checkoutId'

export const SHOPIFY_CHECKOUT_URL_COOKIE = 'shopify_checkoutUrl'

export const SHOPIFY_CUSTOMER_TOKEN_COOKIE = 'shopify_customerToken'

export const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

export const SHOPIFY_COOKIE_EXPIRE = 30

export const API_URL = `https://${STORE_DOMAIN}/api/2021-07/graphql.json`

export const API_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
