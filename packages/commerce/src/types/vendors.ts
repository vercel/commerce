// TODO: define this type
export type Vendor = any

export type VendorTypes = {
  vendor: Vendor
}

export type VendorHook<T extends VendorTypes = VendorTypes> = {
  data: T['vendor'] | null
  fetchData: { customer: T['vendor'] } | null
}

export type VendorSchema<T extends VendorTypes = VendorTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getLoggedInCustomer: {
        data: { customer: T['vendor'] } | null
      }
    }
  }
}
