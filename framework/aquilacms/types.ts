import * as Core from '@commerce/types'

export type AquilacmsTranslation = {
  [index: string]: any
}

export enum AquilacmsCartStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  EXPIRING = 'EXPIRING',
  EXPIRED = 'EXPIRED',
}

export enum AquilacmsCartOrderReceiptMethod {
  DELIVERY = 'delivery',
  WITHDRAWAL = 'withdrawal',
}

export enum AquilacmsCartDiscountType {
  PERCENT = 'PERCENT',
  PRICE = 'PRICE',
  FREE_DELIVERY = 'FREE_DELIVERY',
}

export enum supplierCode {
  simple = 'simple',
  bundle = 'bundle',
  virtual = 'virtual',
}

export enum AquilacmsUserCivility {
  MAN = 0,
  WOMAN = 1,
}

export enum AquilacmsItemStatus {
  PROCESSING = 'PROCESSING',
  DELIVERY_PROGRESS = 'DELIVERY_PROGRESS',
  DELIVERY_PARTIAL_PROGRESS = 'DELIVERY_PARTIAL_PROGRESS',
  RETURNED = 'RETURNED',
  RETURNED_PARTIAL = 'RETURNED_PARTIAL',
}

export type AquilacmsItem = {
  _id: string
  id: AquilacmsProduct
  status: AquilacmsItemStatus
  name: string
  code: string
  image: string
  parent: string
  children: string[]
  quantity: number
  weight: number
  noRecalculatePrice: boolean
  price: {
    vat: {
      rate: number
    }
    total?: {
      ati: number
    }
    unit: {
      et: number
      ati: number
      vat?: number
    }
    special: {
      et: number
      ati: number
      vat?: number
    }
  }
  atts: any[]
  typeDisplay?: string
}

export type AquilacmsAddress = {
  firstname: string
  lastname: string
  companyName: string
  phone: string
  phone_mobile: string
  line1: string
  line2: string
  zipcode: string
  city: string
  isoCountryCode: string
  country: string
  complementaryInfo: string
  civility: AquilacmsUserCivility
}

export type AquilacmsCartPromo = {
  promoId: string
  promoCodeId: string
  discountATI: number
  discountET: number
  name: string
  description: string
  code: string
  gifts: AquilacmsItem[]
  productsId: {
    productId: string
    discountATI: number
    discountET: number
    basePriceET: number
    basePriceATI: number
  }[]
}

export type AquilacmsCartCustomer = {
  id: string
  email: string
  phone: string
}

export type AquilacmsCartDiscount = {
  code?: string
  type?: AquilacmsCartDiscountType
  value?: number
  description?: string
  minimumATI?: number
  onAllSite?: boolean
  openDate?: string
  closeDate?: string
  priceATI: number
}

export type AquilacmsCart = {
  _id: string
  updated: string
  paidTax: boolean
  status: AquilacmsCartStatus
  promos?: AquilacmsCartPromo[]
  customer?: AquilacmsCartCustomer
  addresses?: {
    delivery: AquilacmsAddress
    billing: AquilacmsAddress
  }
  comment?: string
  items: AquilacmsItem[]
  discount?: AquilacmsCartDiscount[]
  delivery?: {
    method?: string
    value: {
      ati: number
      et: number
      vat: number
    }
    freePriceLimit?: number
    code?: string
    name?: string
    url?: string
    date?: string
    dateDelivery?: {
      delayDelivery?: number
      unitDelivery?: string
      delayPreparation?: number
      unitPreparation?: string
    }
  }
  priceSubTotal: {
    et: number
    ati: number
  }
  priceTotal: {
    et: number
    ati: number
  }
  orderReceipt?: {
    method: AquilacmsCartOrderReceiptMethod
    date?: string
  }
  createdAt: string
  updatedAt: string
}

export type AquilacmsProductAttribute = {
  id: string
  code: string
  values: string[]
  value: string
  param: string
  type: string
  position: number
  visible: boolean
  name: string
}

export type AquilacmsProductImage = {
  url: string
  name: string
  title: string
  alt: string
  position: number
  modificationDate: string
  default: boolean
  extension: string
}

export type AquilacmsProductPicto = {
  code: string
  image: string
  title: string
  location: string
  pictoId: string
}

export type AquilacmsProductReviewsQuestion = {
  translation: AquilacmsTranslation
  idQuestion: string
  average: number
}

export type AquilacmsProductReviewsDataQuestion = {
  question: string
  idQuestion: string
  rate: number
}

export type AquilacmsProductReviewsData = {
  id_review: string
  name: string
  id_client: string
  ip_client: string
  review_date: string
  review: string
  lang: string
  rate: number
  order_ref: string
  title: string
  visible: boolean
  verify: boolean
  questions: AquilacmsProductReviewsDataQuestion[]
  stats: {
    views: number
  }
}

export type AquilacmsProduct = {
  _id: string
  code: string
  trademark: number
  supplier_ref: string
  supplier_code: supplierCode
  active: boolean
  _visible: boolean
  universe: string
  family: string
  subfamily: string
  component_template: string
  weight: number
  price: {
    purchase: number
    tax: number
    et: { normal: number; special: number }
    ati: { normal: number; special: number }
    priceSort: {
      et: number
      ati: number
    }
  }
  presentInLastImport: boolean
  specific: {
    custom_text1: string
    custom_text2: string
    custom_text3: string
    custom_supplier_code: string
    custom_traitement: string
    custom_code_fabrication: string
  }
  associated_prds: string[]
  set_attributes: string
  attributes: AquilacmsProductAttribute[]
  images: AquilacmsProductImage[]
  code_ean: string
  is_new: boolean
  translation: AquilacmsTranslation
  pictos: AquilacmsProductPicto[]
  reviews: {
    average: number
    reviews_nb: number
    questions: AquilacmsProductReviewsQuestion[]
    datas: AquilacmsProductReviewsData[]
  }
  createdAt: string
  updatedAt: string
  slug: {
    [index: string]: string
  }
  name: string
  description1?: {
    title: string
    text: string
  }
  description2?: {
    title: string
    text: string
  }
  canonical: string
}

export type AquilacmsUserAttribute = {
  id: string
  code: string
  values: string
  visible: boolean
  param: string
  type: string
  translation: AquilacmsTranslation
  position: number
}

export type AquilacmsUser = {
  _id: string
  email: string
  password: string
  code: string
  civility: AquilacmsUserCivility
  firstname: string
  lastname: string
  fullname: string
  phone: string
  phone_mobile: string
  company: {
    name: string
    siret: string
    intracom: string
    address: string
    postal_code: string
    town: string
    country: string
    contact: {
      first_name: string
      last_name: string
      email: string
      phone: string
    }
  }
  status: string
  delivery_address: number
  billing_address: number
  addresses: AquilacmsAddress[]
  isAdmin: boolean
  price: string
  taxDisplay: boolean
  isActive: boolean
  isActiveAccount: boolean
  activateAccountToken: string
  resetPassToken: string
  birthDate: string
  accessList: string[]
  type: string
  preferredLanguage: string
  set_attributes: string
  attributes: AquilacmsUserAttribute[]
  createdAt: string
  updatedAt: string
}

export type Cart = Core.Cart & {
  lineItems: LineItem[]
}

export type LineItem = Core.LineItem

/**
 * Cart mutations
 */

export type OptionSelections = {
  option_id: number
  option_value: number | string
}

export type CartItemBody = Core.CartItemBody & {
  productId: string // The product id is always required for BC
  optionSelections?: OptionSelections
}

export type GetCartHandlerBody = Core.GetCartHandlerBody

export type AddCartItemBody = Core.AddCartItemBody<CartItemBody>

export type AddCartItemHandlerBody = Core.AddCartItemHandlerBody<CartItemBody>

export type UpdateCartItemBody = Core.UpdateCartItemBody<CartItemBody>

export type UpdateCartItemHandlerBody = Core.UpdateCartItemHandlerBody<CartItemBody>

export type RemoveCartItemBody = Core.RemoveCartItemBody

export type RemoveCartItemHandlerBody = Core.RemoveCartItemHandlerBody

export type Order = Core.Order

export type User = {
  entityId: string
  firstName: string
  lastName: string
  email: string
  company?: string
  customerGroupId: string
  notes: string
  phone?: string
  addressCount?: number
  attributeCount: number
  storeCredit: {
    value: number
    currencyCode: string
  }
}

type AquilacmsPage = {
  action: string
  _id: string
  code: string
  slug: {
    [index: string]: string
  }
  name: string
  metaDescription: string
  pageSlug: string
}

export type AquilacmsStatic = {
  _id: string
  active: boolean
  group: string
  type: string
  code: string
  content: string
  metaDesc: string
  slug: {
    [index: string]: string
  }
  name: string
}

export type AquilacmsCartItem = {}

export type AquilacmsOrder = {
  _id: string
  items: AquilacmsCartItem[]
  number: string
  priceTotal: {
    ati: number
    et: number
    paidTax: number
  }
  status: string
  created_at: string
  updated_at: string
}
