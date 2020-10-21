export interface CommerceAPIConfig {
  commerceUrl: string
  apiToken: string
  cartCookie: string
  cartCookieMaxAge: number
  fetch<Q, V = any>(
    query: string,
    queryData?: CommerceAPIFetchOptions<V>
  ): Promise<Q>
}

export interface CommerceAPIFetchOptions<V> {
  variables?: V
  preview?: boolean
}

// TODO: define interfaces for all the available operations and API endpoints
