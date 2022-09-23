export * as Card from './card'
export * as Address from './address'

export interface Customer {
  /**
   * The unique identifier for the customer.
   */
  id: string
  /**
   * The customer's first name.
   */
  firstName: string
  /**
   * The customer's last name.
   */
  lastName: string
  /**
   * The customer's email address.
   */
  email?: string
  /**
   * The customer's phone number.
   * @optional
   */
  phone?: string
  /**
   * The customer's company name.
   */
  company?: string
  /**
   * The customer's notes.
   */
  notes?: string
  /**
   * Indicates wathever the customer accepts marketing, such as email newsletters.
   */
  acceptsMarketing?: boolean
}

export type CustomerHook = {
  data: Customer | null | undefined
  fetchData: { customer: Customer } | null
}

export type CustomerSchema = {
  endpoint: {
    options: {}
    handlers: {
      getLoggedInCustomer: {
        data: { customer: Customer } | null
      }
    }
  }
}
