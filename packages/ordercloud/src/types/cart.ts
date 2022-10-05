export interface OrdercloudCart {
  ID: string
  FromUser: {
    ID: string
    Username: string
    Password: null
    FirstName: string
    LastName: string
    Email: string
    Phone: null
    TermsAccepted: null
    Active: true
    xp: {
      something: string
      currency: string
    }
    AvailableRoles: null
    DateCreated: string
    PasswordLastSetDate: null
  }
  FromCompanyID: string
  ToCompanyID: string
  FromUserID: string
  BillingAddressID: null
  BillingAddress: null
  ShippingAddressID: null
  Comments: null
  LineItemCount: number
  Status: string
  DateCreated: string
  DateSubmitted: null
  DateApproved: null
  DateDeclined: null
  DateCanceled: null
  DateCompleted: null
  LastUpdated: string
  Subtotal: number
  ShippingCost: number
  TaxCost: number
  PromotionDiscount: number
  Total: number
  IsSubmitted: false
  xp: {
    productId: string
    variantId: string
    quantity: 1
  }
}

export interface OrdercloudLineItem {
  ID: string
  ProductID: string
  Quantity: 1
  DateAdded: string
  QuantityShipped: number
  UnitPrice: number
  PromotionDiscount: number
  LineTotal: number
  LineSubtotal: number
  CostCenter: null
  DateNeeded: null
  ShippingAccount: null
  ShippingAddressID: null
  ShipFromAddressID: null
  Product: {
    ID: string
    Name: string
    Description: string
    QuantityMultiplier: number
    ShipWeight: number
    ShipHeight: null
    ShipWidth: null
    ShipLength: null
    xp: {
      Images: {
        url: string
      }[]
    }
  }
  Variant: null | {
    ID: string
    Name: null
    Description: null
    ShipWeight: null
    ShipHeight: null
    ShipWidth: null
    ShipLength: null
    xp: null
  }
  ShippingAddress: null
  ShipFromAddress: null
  SupplierID: null
  Specs: []
  xp: null
}
