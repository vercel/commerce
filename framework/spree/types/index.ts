import type { fetchResponseKey } from '@framework/utils/create-customized-fetch-fetcher'
import type {
  JsonApiDocument,
  JsonApiListResponse,
  JsonApiSingleResponse,
} from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi'
import type { ResultResponse } from '@spree/storefront-api-v2-sdk/types/interfaces/ResultResponse'
import type { Response } from '@vercel/fetch'

export type UnknownObjectValues = Record<string, unknown>

export type NonUndefined<T> = T extends undefined ? never : T

export type ValueOf<T> = T[keyof T]

export type SpreeSdkResponse = JsonApiSingleResponse | JsonApiListResponse

export type SpreeSdkResponseWithRawResponse = SpreeSdkResponse & {
  [fetchResponseKey]: Response
}

export type SpreeSdkMethodReturnType = Promise<
  ResultResponse<SpreeSdkResponseWithRawResponse>
>

export type SpreeSdkMethod = (...args: any[]) => SpreeSdkMethodReturnType

export type SpreeSdkVariables = {
  methodPath: string
  arguments: any[]
}

export interface ImageStyle {
  url: string
  width: string
  height: string
  size: string
}

export interface SpreeProductImage extends JsonApiDocument {
  attributes: {
    position: number
    alt: string
    original_url: string
    styles: ImageStyle[]
  }
}

export interface OptionTypeAttr extends JsonApiDocument {
  attributes: {
    name: string
    presentation: string
    position: number
    created_at: string
    updated_at: string
    filterable: boolean
  }
}

export interface LineItemAttr extends JsonApiDocument {
  attributes: {
    name: string
    quantity: number
    slug: string
    options_text: string
    price: string
    currency: string
    display_price: string
    total: string
    display_total: string
    adjustment_total: string
    display_adjustment_total: string
    additional_tax_total: string
    display_additional_tax_total: string
    discounted_amount: string
    display_discounted_amount: string
    pre_tax_amount: string
    display_pre_tax_amount: string
    promo_total: string
    display_promo_total: string
    included_tax_total: string
    display_inluded_tax_total: string
  }
}

export interface VariantAttr extends JsonApiDocument {
  attributes: {
    sku: string
    price: string
    currency: string
    display_price: string
    weight: string
    height: string
    width: string
    depth: string
    is_master: boolean
    options_text: string
    purchasable: boolean
    in_stock: boolean
    backorderable: boolean
  }
}

export interface ProductSlugAttr extends JsonApiDocument {
  attributes: {
    slug: string
  }
}
export interface IProductsSlugs extends JsonApiListResponse {
  data: ProductSlugAttr[]
}
