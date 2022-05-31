export type Category = {
  id: string
  name: string
  slug: string
  path: string
}

export type Brand = any

export type Navigation = any

export type SiteTypes = {
  category: Category
  brand: Brand
  navigation?: Navigation
}

export type GetSiteInfoOperation<T extends SiteTypes = SiteTypes> = {
  data: {
    categories: T['category'][]
    brands: T['brand'][]
    navigation?: T['navigation'][]
  }
}
