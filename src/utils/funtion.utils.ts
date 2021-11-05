import { Collection } from '@commerce/types/collection';
import { Facet } from "@commerce/types/facet";
import { Product, ProductCard, ProductOptionValues } from "@commerce/types/product";
import moment, { now } from 'moment';
import { QUERY_KEY, ROUTE } from 'src/utils/constanst.utils';
import { BlogList, FacetValue, Notification, SearchResultSortParameter, RecipesSort } from './../../framework/vendure/schema.d';
import { CODE_FACET_DISCOUNT, CODE_FACET_FEATURED, CODE_FACET_FEATURED_VARIANT, FACET, PRODUCT_SORT_OPTION_VALUE,RECIPE_SORT_OPTION_VALUE } from "./constanst.utils";
import { PromiseWithKey, SelectedOptions, SortOrder } from "./types.utils";
import { CollectionItems} from '@framework/schema'
import { APIResponse } from '@commerce/api/utils/types';
import { CommonError } from 'src/domains/interfaces/CommonError';
import { LANGUAGE } from './language.utils';
import { RecipeCollection } from '@commerce/types/recipe-collection';

export function isMobile() {
  return window.innerWidth < 768
}

export function formatTimeAgo(time: string) {
  return moment(time).fromNow()
}
export function unique<T>(data: Array<T>): Array<T> {
  return [...new Set(data)];
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


export function getProductSortParamFromQuery(query: string) {
  let rs = {} as SearchResultSortParameter
  switch (query) {
    case PRODUCT_SORT_OPTION_VALUE.NAME_ASC:
      rs = {
        name: SortOrder.Asc
      }
      break;

    case PRODUCT_SORT_OPTION_VALUE.NAME_DESC:
      rs = {
        name: SortOrder.Desc
      }
      break;

    case PRODUCT_SORT_OPTION_VALUE.PRICE_ASC:
      rs = {
        price: SortOrder.Asc
      }
      break;

    case PRODUCT_SORT_OPTION_VALUE.PRICE_DESC:
      rs = {
        price: SortOrder.Desc
      }
      break;

    default:
      break;
  }

  return rs
}



export function getRecipeSortParamFromQuery(query: string) {
  let rs = {} as RecipesSort
  switch (query) {
    case RECIPE_SORT_OPTION_VALUE.MOST_VIEWD:
      rs = {
        createdAt: SortOrder.Asc
      }
      break;

    case RECIPE_SORT_OPTION_VALUE.LASTED_BLOGS:
      rs = {
        createdAt: SortOrder.Desc
      }
      break;

    case RECIPE_SORT_OPTION_VALUE.RECENT_BLOGS:
      rs = {
        createdAt: SortOrder.Asc
      }
      break;

    default:
      break;
  }

  return rs
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

export function getFacetIdByName(facets: Facet[], facetName: string, valueName: string) {
  const featuredFacet = facets.find((item: Facet) => item.name === facetName)
  const freshFacetValue = featuredFacet?.values.find((item: FacetValue) => item.name === valueName)
  return freshFacetValue?.id
}


export function getFacetIdByCode(facets: Facet[], parentCode: string, valueCode: string) {
  const featuredFacet = facets.find((item: Facet) => item.code === parentCode)
  const freshFacetValue = featuredFacet?.values.find((item: FacetValue) => item.code === valueCode)
  return freshFacetValue?.id
}


export function getAllFeaturedFacetId(facets: Facet[]) {
  const featuredFacet = facets.find((item: Facet) => item.name === FACET.FEATURE.PARENT_NAME)
  const rs = featuredFacet?.values.map((item: FacetValue) => item.id)
  return rs || []
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

export const getCategoryNameFromCollectionId = (colelctions: Collection[], collectionId?: string) => {
  if (!collectionId) {
    return ''
  }

  const collection = colelctions.find(item => item.id === collectionId)
  return collection?.name || ''
}

export function getAllPromies(promies: PromiseWithKey[]) {
  return promies.map(item => item.promise)
}

export function getIdFeaturedBlog(blog: BlogList) {
  return blog?.id
}

export const FilterOneVatiant = (products: ProductCard[]) => {
  let idList: string[] = []
  let filtedProduct: ProductCard[] = []
  products.map((product: ProductCard) => {
    if (!idList.includes(product.id)) {
      filtedProduct.push(product)
      idList.push(product.id)
    }
  })
  return filtedProduct
}

export const convertOption = (values: ProductOptionValues[]) => {
  return values.map((value) => { return { name: value.label, value: value.label } })
}

export function getProductVariant(product: Product, opts: SelectedOptions) {
  const variant = product.variants?.find((variant) => {
    return Object.entries(opts).every(([key, value]) =>
      variant.options.find((option) => {
        if (
          option.__typename === 'MultipleChoiceOption' &&
          option.displayName.toLowerCase() === key.toLowerCase()
        ) {
          return option.values.find((v) => {
            return v.label.toLowerCase() === value?.toLowerCase()})
        }
      })
    )
  })
  return variant
}

export const getOrderIdsFromNewNotification = (noti: Notification[]) => {
  const orderIds = noti.map(item => item.order?.id || "")
  return unique(orderIds)
}

export function formatDate(dateTime: string) {
  let date = new Date(dateTime);
  return date.toLocaleString('en-us', { month: 'long' }) + " " + date.getDate() + "," + date.getFullYear();
}

export function convertLinkCollections(collections:CollectionItems[]){

  return collections.map(val=>(
    {
      name:val.name,
      link: `${ROUTE.PRODUCTS}?${QUERY_KEY.FEATURED}=${val.slug}`
    }
    ));
}
export function convertErrorFromApiResponse(response: APIResponse): CommonError {
  if (response.errors && response.errors?.length > 0) {
    return {
      message: response.errors[0].message,
    } as CommonError
  }
  return {
    message: LANGUAGE.MESSAGE.ERROR
  } as CommonError
}

export function checkIsRecipeInCollectionsEmpty(collections: RecipeCollection[]) {
  let total = 0
  collections.map(item => {
    total += item.recipes.totalItems
    return null
  })
  return total === 0
}
