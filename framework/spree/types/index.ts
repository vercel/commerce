import type {
  JsonApiDocument,
  JsonApiListResponse,
  JsonApiSingleResponse,
} from '@spree/storefront-api-v2-sdk/types/interfaces/JsonApi'
import type { ResultResponse } from '@spree/storefront-api-v2-sdk/types/interfaces/ResultResponse'

export type UnknownObjectValues = Record<string, unknown>

export type NonUndefined<T> = T extends undefined ? never : T

export type ValueOf<T> = T[keyof T]

export type SpreeSdkMethodReturnType = Promise<
  ResultResponse<JsonApiSingleResponse | JsonApiListResponse>
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
}

export interface SpreeProductImage extends JsonApiDocument {
  attributes: {
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
