import { FacetValue } from './../../framework/vendure/schema.d';
import { Facet } from "@commerce/types/facet";
import { FACET } from "./constanst.utils";

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

export function getFreshProductFacetId(facets: Facet[]) {
  const featuredFacet = facets.find((item: Facet) => item.name === FACET.FEATURE.PARENT_NAME)
  const freshFacetValue = featuredFacet?.values.find((item: FacetValue) => item.name === FACET.FEATURE.FRESH)

  return freshFacetValue?.id
}

export function getAllFeaturedFacetId(facets: Facet[]) {
  const featuredFacet = facets.find((item: Facet) => item.name === FACET.FEATURE.PARENT_NAME)
  const rs = featuredFacet?.values.map((item: FacetValue) => item.id)

  return rs
}