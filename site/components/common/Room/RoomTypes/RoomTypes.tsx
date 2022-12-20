import { Product } from "@commerce/types"

export type MarkerResourcePayload = {
    resourceType: string,
    resourceSource: string,
    resourceName: string,
    resourceCaption: string
  }
  
export type MarkerData = {
    markerType: string,
    markerPayload: Product.Product | MarkerResourcePayload
}

export type MarkerJson = {
  markerType: string,
  markerSource: string,
  resourceName?: string,
  resourceCaption?: string,
  longitude: number,
  latitude: number
}