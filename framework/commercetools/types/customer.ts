import * as Core from '@commerce/types/customer'

export * from '@commerce/types/customer'

export type Customers = {
  id: string
  version: number
  createdAt: string
  lastModifiedAt: string
  email: string
  password: string
  isEmailVerified: boolean
}

// get Customer
export type GetCustomerById = {
  id: string
}

export type CustomerSchema = Core.CustomerSchema
