export const BIGCOMMERCE_API_URL = process.env.BIGCOMMERCE_API_URL ?? 'https://api.bigcommerce.com';
export const BIGCOMMERCE_CANONICAL_STORE_DOMAIN =
  process.env.BIGCOMMERCE_CANONICAL_STORE_DOMAIN ?? 'mybigcommerce.com';
export const BIGCOMMERCE_GRAPHQL_API_ENDPOINT = `${BIGCOMMERCE_CANONICAL_STORE_DOMAIN}/graphql`;
