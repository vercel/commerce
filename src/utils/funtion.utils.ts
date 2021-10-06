import { Facet } from "@commerce/types/facet";
import { FacetValue } from './../../framework/vendure/schema.d';
import { CODE_FACET_DISCOUNT, CODE_FACET_FEATURED, CODE_FACET_FEATURED_VARIANT } from "./constanst.utils";
import { PromiseWithKey } from "./types.utils";

export function isMobile() {
  return window.innerWidth < 768
}

export function getPageFromQuery(pageQuery: string) {
  let page = 0
  try {
    page = +pageQuery
    if (isNaN(page)) {
      page = 0
    }
  } catch (err) {
    page = 0
  }
  return page
}

export function removeItem<T>(arr: Array<T>, value: T): Array<T> {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return [...arr];
}

function findFacetByCode(code: string, facets?: Facet) {
  return facets?.values.find((item: FacetValue) => item.code === code)
}

export function getFeaturedFacetId(facets: Facet[]) {
  const featuredFacet = facets.find((item: Facet) => item.code === CODE_FACET_FEATURED)
  return featuredFacet?.id
}

export function getFreshFacetId(facets: Facet[]) {
  const featuredFacet = facets.find((item: Facet) => item.code === CODE_FACET_FEATURED)
  const freshFacetValue = findFacetByCode(CODE_FACET_FEATURED_VARIANT.FRESH, featuredFacet)

  return freshFacetValue?.id
}

export function getAllFacetValueIdsByParentCode(facets: Facet[], code: string) {
  const featuredFacet = facets.find((item: Facet) => item.code === code)
  const rs = featuredFacet?.values.map((item: FacetValue) => item.id)

  return rs || []
}

export function getAllFacetValuesForFeatuedProducts(facets: Facet[]) {
  const facetsRs = facets.filter((item: Facet) => item.code === CODE_FACET_FEATURED || item.code === CODE_FACET_DISCOUNT)
  let rs = [] as FacetValue[]
  facetsRs.map((item: Facet) => {
    rs = rs.concat(item.values)
    return null
  })
  return rs
}

export function getFacetNamesFromIds(facets: FacetValue[], ids?: string[]): string {
  if (!ids || ids?.length === 0) {
    return ''
  }

  const facetItems = facets.filter((item: FacetValue) => ids.includes(item.id))
  const names = facetItems.map((item: FacetValue) => item.name)
  return names.join(", ")
}

export function getFacetIdsFromCodes(facets: FacetValue[], codes?: string[]): string[] {
  if (!codes || codes?.length === 0) {
    return []
  }

  const facetItems = facets.filter((item: FacetValue) => codes.includes(item.code))
  const ids = facetItems.map((item: FacetValue) => item.id)
  return ids
}

export function getAllPromies(promies: PromiseWithKey[]) {
  return promies.map(item => item.promise)
}
