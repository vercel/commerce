
export type FacetOption = {
  __typename?: 'MultipleChoiceOption'
  id: string
  displayName: string
  values: FacetOptionValues[]
}

export type FacetOptionValues = {
  label: string
  hexColors?: string[]
}

export type FacetVariant = {
  id: string | number
  options: FacetOption[]
  availableForSale?: boolean
}

export type Facet = {
  id: string
  name: string
  description: string
  descriptionHtml?: string
  sku?: string
  slug?: string
  path?: string
  images: FacetImage[]
  variants: FacetVariant[]
  price: FacetPrice
  options: FacetOption[]
}

export type SearchFacetsBody = {
  search?: string
  categoryId?: string | number
  brandId?: string | number
  sort?: string
  locale?: string
}

export type FacetTypes = {
  facet: Facet
  searchBody: SearchFacetsBody
}

export type SearchFacetsHook<T extends FacetTypes = FacetTypes> = {
  data: {
    facets: T['facet'][]
    found: boolean
  }
  body: T['searchBody']
  input: T['searchBody']
  fetcherInput: T['searchBody']
}

export type FacetsSchema<T extends FacetTypes = FacetTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getFacets: SearchFacetsHook<T>
    }
  }
}

export type GetAllFacetPathsOperation<
  T extends FacetTypes = FacetTypes
> = {
  data: { facets: Pick<T['facet'], 'path'>[] }
  variables: { first?: number }
}

export type GetAllFacetsOperation<T extends FacetTypes = FacetTypes> = {
  data: { facets: T['facet'][] }
  variables: {
    relevance?: 'featured' | 'best_selling' | 'newest'
    ids?: string[]
    first?: number
  }
}

export type GetFacetOperation<T extends FacetTypes = FacetTypes> = {
  data: { facet?: T['facet'] }
  variables: { path: string; slug?: never } | { path?: never; slug: string }
}
