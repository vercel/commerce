
import type { CommerceAPIConfig } from '@commerce/api'
import { CommerceAPI, getCommerceApi as commerceApi } from '@commerce/api'
import getAllBlogs from './operations/get-all-blogs'
import getAllCollections from './operations/get-all-collection'
import getAllFacets from './operations/get-all-facets'
import getAllPages from './operations/get-all-pages'
import getAllProductPaths from './operations/get-all-product-paths'
import getAllProducts from './operations/get-all-products'
import getBlogDetail from './operations/get-blog-detail'
import getCustomerWishlist from './operations/get-customer-wishlist'
import getFeaturedBlog from './operations/get-featured-blog'
import getPage from './operations/get-page'
import getProduct from './operations/get-product'
import getSiteInfo from './operations/get-site-info'
import getAllBlogPaths from './operations/get-all-blog-paths'
import getRelevantBlogs from './operations/get-relevant-blogs'
import getAllRecipes from './operations/get-all-recipes'
import getAllRecipePaths from './operations/get-all-recipe-paths'
import getRecipeDetail from './operations/get-recipe-detail'
import getAllRecipeCollections from './operations/get-all-recipe-collections'
import getBannersByPage from './operations/get-banners-by-page'
import getRecipeByProductSlug from './operations/get-recipe-by-product-slug'
import getHome from './operations/get-home'
import getHomeFeature from './operations/get-home-feature'

import login from './operations/login'
import fetchGraphqlApi from './utils/fetch-graphql-api'

export interface VendureConfig extends CommerceAPIConfig {}

const API_URL = process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL

if (!API_URL) {
  throw new Error(
    `The environment variable NEXT_PUBLIC_VENDURE_SHOP_API_URL is missing and it's required to access your store`
  )
}

const ONE_DAY = 60 * 60 * 24
const config: VendureConfig = {
  commerceUrl: API_URL,
  apiToken: '',
  cartCookie: '',
  customerCookie: '',
  cartCookieMaxAge: ONE_DAY * 30,
  fetch: fetchGraphqlApi,
}

const operations = {
  login,
  getAllPages,
  getPage,
  getSiteInfo,
  getCustomerWishlist,
  getAllProductPaths,
  getAllProducts,
  getProduct,
  getAllFacets,
  getAllCollections,
  getAllBlogs,
  getFeaturedBlog,
  getBlogDetail,
  getAllBlogPaths,
  getRelevantBlogs,
  getAllRecipes,
  getAllRecipePaths,
  getRecipeDetail,
  getAllRecipeCollections,
  getBannersByPage,
  getRecipeByProductSlug,
  getHomeFeature,
  getHome
}

export const provider = { config, operations }

export type Provider = typeof provider

export function getCommerceApi<P extends Provider>(
  customProvider: P = provider as any
): CommerceAPI<P> {
  return commerceApi(customProvider)
}
