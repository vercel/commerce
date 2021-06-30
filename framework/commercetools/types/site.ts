import * as Core from '@commerce/types/site'
export type CommercetoolsCategory = {
  id: string
  name: string
  slug: string
  parent: { id: string }
}
export type CommercetoolsBrands = {
  key: string
  label?: string
}
export type Brand = Core.Brand
export type Category = Core.Category
