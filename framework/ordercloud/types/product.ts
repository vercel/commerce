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
  xp: {
    Price: number
    PriceCurrency: string
    Images: {
      url: string
    }[]
    Facets: Record<string, string[]>
  }
}
