import { ShopifyConfig } from '../api'
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

const getVendors = async (config: ShopifyConfig): Promise<BrandEdge[]> => {
  const vendors = await fetchAllProducts({
    config,
    query: getAllProductVendors,
    variables: {
      first: 250,
    },
  })

  let vendorsStrings = vendors.map(({ node: { vendor } }) => vendor)

  return [...new Set(vendorsStrings)].map((v) => ({
    node: {
      entityId: v,
      name: v,
      path: `brands/${v}`,
    },
  }))
}

export default getVendors
