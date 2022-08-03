export * from '@vercel/commerce/types/customer'

export type RawCustomerResponse = {
  id: number
  first_name: string
  last_name: string
  email: string
  gender: string
  phone_area: string
  phone: string
  cpf: string
  cnpj: string
  ie: string
  tags: string
  lists: string[]
  facebook_uid: string
  liked_facebook_page: boolean
  updated_at: string
  birthdate: string
  recent_address: [
    {
      id: string
      first_name: string
      last_name: string
      company_name: string
      street_name: string
      street_number: string
      neighborhood: string
      complement: string
      reference: string
      city: string
      state: string
      zip: string
      first_phone_area: string
      first_phone: string
      second_phone_area: string
      second_phone: string
      email: string
      documents: {
        cpf: string
        cnpj: string
      }
    }
  ]
  auth_token: string
  last_confirmed_order_at: string
  received_orders_count: number
  confirmed_orders_count: number
  canceled_orders_count: number
  renew_password: boolean
}
