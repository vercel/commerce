import { CommerceAPIConfig } from 'lib/commerce/api'
import { GetAllProductsQueryVariables } from '../schema'
import fetchGraphqlApi from './utils/fetch-graphql-api'
import fetchStoreApi from './utils/fetch-store-api'

export interface Images {
  small?: ImageOptions
  medium?: ImageOptions
  large?: ImageOptions
  xl?: ImageOptions
}

export interface ImageOptions {
  width: number
  height?: number
}

export type ProductImageVariables = Pick<
  GetAllProductsQueryVariables,
  | 'imgSmallWidth'
  | 'imgSmallHeight'
  | 'imgMediumWidth'
  | 'imgMediumHeight'
  | 'imgLargeWidth'
  | 'imgLargeHeight'
  | 'imgXLWidth'
  | 'imgXLHeight'
>

export interface BigcommerceConfigOptions extends CommerceAPIConfig {
  images?: Images
  storeApiUrl: string
  storeApiToken: string
  storeApiClientId: string
  storeApiFetch<T>(endpoint: string, options?: RequestInit): Promise<T>
}

export interface BigcommerceConfig extends BigcommerceConfigOptions {
  readonly imageVariables?: ProductImageVariables
}

const API_URL = process.env.BIGCOMMERCE_STOREFRONT_API_URL
const API_TOKEN = process.env.BIGCOMMERCE_STOREFRONT_API_TOKEN
const STORE_API_URL = process.env.BIGCOMMERCE_STORE_API_URL
const STORE_API_TOKEN = process.env.BIGCOMMERCE_STORE_API_TOKEN
const STORE_API_CLIENT_ID = process.env.BIGCOMMERCE_STORE_API_CLIENT_ID

if (!API_URL) {
  throw new Error(
    `The environment variable BIGCOMMERCE_STOREFRONT_API_URL is missing and it's required to access your store`
  )
}

if (!API_TOKEN) {
  throw new Error(
    `The environment variable BIGCOMMERCE_STOREFRONT_API_TOKEN is missing and it's required to access your store`
  )
}

if (!(STORE_API_URL && STORE_API_TOKEN && STORE_API_CLIENT_ID)) {
  throw new Error(
    `The environment variables BIGCOMMERCE_STORE_API_URL, BIGCOMMERCE_STORE_API_TOKEN, BIGCOMMERCE_STORE_API_CLIENT_ID have to be set in order to access the REST API of your store`
  )
}

export class Config {
  private config: BigcommerceConfig

  constructor(config: Omit<BigcommerceConfigOptions, 'customerCookie'>) {
    this.config = {
      ...config,
      // The customerCookie is not customizable for now, BC sets the cookie and it's
      // not important to rename it
      customerCookie: 'SHOP_TOKEN',
      imageVariables: this.getImageVariables(config.images),
    }
  }

  getImageVariables(images?: Images) {
    return images
      ? {
          imgSmallWidth: images.small?.width,
          imgSmallHeight: images.small?.height,
          imgMediumWidth: images.medium?.height,
          imgMediumHeight: images.medium?.height,
          imgLargeWidth: images.large?.height,
          imgLargeHeight: images.large?.height,
          imgXLWidth: images.xl?.height,
          imgXLHeight: images.xl?.height,
        }
      : undefined
  }

  getConfig(userConfig: Partial<BigcommerceConfig> = {}) {
    const { images: configImages, ...config } = this.config
    const images = { ...configImages, ...userConfig.images }

    return Object.assign(config, userConfig, {
      images,
      imageVariables: this.getImageVariables(images),
    })
  }

  setConfig(newConfig: Partial<BigcommerceConfig>) {
    Object.assign(this.config, newConfig)
  }
}

const ONE_DAY = 60 * 60 * 24
const config = new Config({
  commerceUrl: API_URL,
  apiToken: API_TOKEN,
  cartCookie: process.env.BIGCOMMERCE_CART_COOKIE ?? 'bc_cartId',
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: fetchGraphqlApi,
  // REST API only
  storeApiUrl: STORE_API_URL,
  storeApiToken: STORE_API_TOKEN,
  storeApiClientId: STORE_API_CLIENT_ID,
  storeApiFetch: fetchStoreApi,
})

export function getConfig(userConfig?: Partial<BigcommerceConfig>) {
  return config.getConfig(userConfig)
}

export function setConfig(newConfig: Partial<BigcommerceConfig>) {
  return config.setConfig(newConfig)
}
