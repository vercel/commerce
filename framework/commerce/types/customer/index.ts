export * as Card from './card'
export * as Address from './address'

// TODO: define this type
export type Customer = any

export type CustomerTypes = {
  customer: Customer
}

export type CustomerHook<T extends CustomerTypes = CustomerTypes> = {
  data: T['customer'] | null
  fetchData: { customer: T['customer'] } | null
}

export type CustomerSchema<T extends CustomerTypes = CustomerTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getLoggedInCustomer: {
        data: { customer: T['customer'] } | null
      }
    }
  }
}
