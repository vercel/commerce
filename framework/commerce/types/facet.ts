import { FacetValue } from './../../vendure/schema.d';

export type Facet = {
  id: string
  name: string
  code: string
  values: FacetValue[]
}

export type SearchFacetsBody = {
  search?: string
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


export type GetAllFacetsOperation<T extends FacetTypes = FacetTypes> = {
  data: { facets: T['facet'][] }
  variables: {
    ids?: string[]
    first?: number
  }
}

export type GetFacetOperation<T extends FacetTypes = FacetTypes> = {
  data: { facet?: T['facet'] }
  variables: { code: string; } | { code?: never; }
}
