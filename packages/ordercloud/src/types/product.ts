export interface RawVariantSpec {
  SpecID: string
  Name: string
  OptionID: string
  Value: string
  PriceMarkupType: string
  PriceMarkup: string | null
}

export interface RawSpec {
  ID: string
  Name: string
  Options: {
    ID: string
    Value: string
    xp: {
      hexColor?: string
    }
  }[]
}

export interface RawVariant {
  ID: string
  Specs: RawVariantSpec[]
}

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
    Variants?: RawVariant[]
    Specs?: RawSpec[]
  }
}
