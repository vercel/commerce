import { swellConfig } from '@framework'
import { getConfig, SwellConfig } from '../api'
import fetchAllProducts from '../api/utils/fetch-all-products'
import getAllProductVendors from './queries/get-all-product-vendors-query'

export type BrandNode = {
  name: string
  path: string
}

export type BrandEdge = {
  node: BrandNode
}

export type Brands = BrandEdge[]

const getVendors = async (config: SwellConfig) => {
  const vendors =
    (await config.fetchSwell('attributes', 'get', ['brand']).values) ?? []

  return [...new Set(vendors)].map((v) => ({
    node: {
      entityId: v,
      name: v,
      path: `brands/${v}`,
    },
  }))
}

export default getVendors
