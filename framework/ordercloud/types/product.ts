export interface RawProduct {
  OwnerID: string
  DefaultPriceScheduleID: string | null
  AutoForward: boolean
  ID: string
  Name: string
  Description: string
  QuantityMultiplier: number
  ShipWeight: null
  ShipHeight: null
  ShipWidth: null
  ShipLength: null
  Active: boolean
  SpecCount: number
  VariantCount: number
  ShipFromAddressID: null
  Inventory: null
  DefaultSupplierID: null
  AllSuppliersCanSell: boolean
  xp: null
}

export interface RawProductWithPrice extends RawProduct {
  priceSchedule: PriceSchedule
}

export interface PriceSchedule {
  OwnerID: string
  ID: string
  Name: string
  ApplyTax: boolean
  ApplyShipping: boolean
  MinQuantity: number
  MaxQuantity: number
  UseCumulativeQuantity: boolean
  RestrictedQuantity: boolean
  PriceBreaks: [
    {
      Quantity: number
      Price: number
    }
  ]
  xp: null
}
