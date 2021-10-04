import { Facet } from "@commerce/types/facet";
import { FacetValue } from './../../framework/vendure/schema.d';
import { CODE_FACET_FEATURED, CODE_FACET_FEATURED_VARIANT } from "./constanst.utils";

export function isMobile() {
  return window.innerWidth < 768
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

export function getAllFeaturedFacetId(facets: Facet[]) {
  const featuredFacet = facets.find((item: Facet) => item.code === CODE_FACET_FEATURED)
  const rs = featuredFacet?.values.map((item: FacetValue) => item.id)

  return rs
}

export function getAllFeaturedFacetValue(facets: Facet[]) {
  const featuredFacet = facets.find((item: Facet) => item.code === CODE_FACET_FEATURED)
  return featuredFacet?.values
}

export function getFacetNamesFromIds(facets: FacetValue[], ids?: string[]): string {
  if (!ids || ids?.length === 0) {
    return ''
  }

  const facetItems = facets.filter((item: FacetValue) => ids.includes(item.id))
  const names = facetItems.map((item: FacetValue) => item.name)
  return names.join(", ")
}