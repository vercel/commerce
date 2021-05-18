// TODO: define this type
export type Customer = any

export type CustomerTypes = {
  customer: Customer
}

export type CustomerSchema<T extends CustomerTypes = CustomerTypes> = {
  endpoint: {
    options: {}
    operations: {
      getLoggedInCustomer: {
        data: { customer: T['customer'] } | null
      }
    }
  }
}

// export type CustomerOperations<T extends CustomerTypes = CustomerTypes> = {
//   getLoggedInCustomer: GetCartOperation<T>
// }

// export type GetLoggedInCustomerOperation = {}
